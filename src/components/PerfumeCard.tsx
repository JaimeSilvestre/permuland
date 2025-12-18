import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { type InferSelectModel } from 'drizzle-orm';
import { perfumes } from '@/db/schema';

type Perfume = InferSelectModel<typeof perfumes>;

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
    return (
        <Link href={`/perfume/${perfume.id}`} className="group relative block overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="aspect-[3/4] relative w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                {perfume.imageUrl ? (
                    <Image
                        src={perfume.imageUrl}
                        alt={perfume.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300 dark:text-zinc-700">
                        <span className="text-sm font-medium">No Image</span>
                    </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-sm px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-transform group-hover:scale-105">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{perfume.rating}</span>
                    </div>
                </div>

                {perfume.sotd && (
                    <div className="absolute bottom-3 left-3 bg-purple-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                        <span className="text-xs">✨</span> SOTD
                    </div>
                )}
            </div>
            <div className="p-5">
                <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 mb-1.5 uppercase tracking-widest">{perfume.brand}</p>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{perfume.name}</h3>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-medium text-gray-900 dark:text-white">${perfume.price}</span>
                </div>
            </div>
        </Link>
    );
}
