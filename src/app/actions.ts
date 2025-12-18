'use server'

import { db } from '@/db';
import { perfumes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function addPerfume(formData: FormData) {
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const price = parseFloat(formData.get('price') as string);
    const rating = parseInt(formData.get('rating') as string);
    const image = formData.get('image') as File;
    const description = formData.get('description') as string;

    let imageUrl = '';

    if (image && image.size > 0 && image.name !== 'undefined') {
        const filename = `${Date.now()}-${image.name.replace(/\s/g, '-')}`;

        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const { put } = await import('@vercel/blob');
            const blob = await put(filename, image, {
                access: 'public',
            });
            imageUrl = blob.url;
        } else {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = join(process.cwd(), 'public', 'uploads');

            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {
                // ignore
            }

            const path = join(uploadDir, filename);
            await writeFile(path, buffer);
            imageUrl = `/uploads/${filename}`;
        }
    }

    await db.insert(perfumes).values({
        name,
        brand,
        price: isNaN(price) ? 0 : price,
        rating: isNaN(rating) ? 0 : rating,
        imageUrl,
        description,
    });

    revalidatePath('/');
    redirect('/');
}

export async function getPerfumes() {
    return await db.select().from(perfumes).orderBy(perfumes.createdAt);
}

export async function getPerfumeById(id: number) {
    const result = await db.select().from(perfumes).where(eq(perfumes.id, id));
    return result[0];
}

export async function toggleSotd(id: number) {
    const perfume = await getPerfumeById(id);
    if (!perfume) return;

    if (!perfume.sotd) {
        await db.update(perfumes).set({ sotd: false });
    }

    await db.update(perfumes).set({ sotd: !perfume.sotd }).where(eq(perfumes.id, id));
    revalidatePath('/');
    revalidatePath(`/perfume/${id}`);
}
