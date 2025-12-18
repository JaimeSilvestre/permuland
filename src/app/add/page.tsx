'use client';

import { addPerfume } from '../actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="w-full text-lg font-bold shadow-xl shadow-purple-500/20 hover:scale-[1.02] hover:shadow-purple-500/30 disabled:opacity-70 disabled:scale-100"
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Adding...</span>
                </div>
            ) : (
                'Add to Collection'
            )}
        </Button>
    );
}

export default function AddPerfumePage() {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <div className="max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Perfume</h1>

            <form action={addPerfume} className="space-y-6" encType="multipart/form-data">
                {/* Image Upload */}
                <div className="relative aspect-[3/4] w-full bg-gray-50 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border-2 border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all group" onClick={() => fileInputRef.current?.click()}>
                    {preview ? (
                        <>
                            <Image src={preview} alt="Preview" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full backdrop-blur-md z-10 hover:bg-black/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <div className="text-center p-6 transition-transform group-hover:scale-105">
                            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                                <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <p className="font-bold text-lg text-gray-900 dark:text-white mb-1">Upload Photo</p>
                            <p className="text-sm text-gray-500">Tap to select from gallery</p>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5 block">Name</label>
                        <Input name="name" placeholder="e.g. Sauvage" required />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5 block">Brand</label>
                        <Input name="brand" placeholder="e.g. Dior" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5 block">Price ($)</label>
                            <Input name="price" type="number" step="0.01" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5 block">Rating (1-5)</label>
                            <Input name="rating" type="number" min="1" max="5" placeholder="5" required />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5 block">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="flex w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-500 transition-all shadow-sm resize-none"
                            placeholder="Describe the scent..."
                        />
                    </div>
                </div>

                <div className="pt-4 pb-8">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}
