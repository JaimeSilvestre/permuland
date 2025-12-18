import { getPerfumeById, toggleSotd } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default async function PerfumeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const perfume = await getPerfumeById(parseInt(id));

    if (!perfume) {
        notFound();
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to collection
            </Link>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-xl shadow-purple-500/5 dark:shadow-none border border-gray-100 dark:border-zinc-800">
                <div className="aspect-square relative bg-gray-100 dark:bg-zinc-800">
                    {perfume.imageUrl ? (
                        <Image src={perfume.imageUrl} alt={perfume.name} fill className="object-cover" priority />
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-300">
                            <span className="text-xl font-medium">No Image</span>
                        </div>
                    )}

                    {perfume.sotd && (
                        <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 animate-bounce">
                            <span className="text-lg">✨</span> Scent of the Day
                        </div>
                    )}
                </div>

                <div className="p-8">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">{perfume.brand}</h2>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">{perfume.name}</h1>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2.5 py-1 rounded-full font-bold">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{perfume.rating}</span>
                        </div>
                    </div>

                    <p className="text-2xl font-medium text-gray-900 dark:text-white mt-4 mb-6">${perfume.price}</p>

                    <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {perfume.description || "No description provided."}
                        </p>
                    </div>

                    <form action={toggleSotd.bind(null, perfume.id)}>
                        <Button
                            type="submit"
                            size="lg"
                            variant={perfume.sotd ? "outline" : "default"}
                            className="w-full text-lg font-bold rounded-2xl"
                        >
                            {perfume.sotd ? (
                                <>
                                    <XComp className="w-5 h-5 mr-2" />
                                    Remove from SOTD
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5 mr-2" />
                                    Make Scent of the Day
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Quick fix for X icon not imported
function XComp({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
    )
}
