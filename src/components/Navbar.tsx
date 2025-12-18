import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 dark:bg-zinc-950/80 dark:border-zinc-800 supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transition-transform group-hover:rotate-12">
                        <span className="text-lg font-bold italic">P</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
                        Permuland
                    </span>
                </Link>
                <Link href="/add">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Plus className="w-6 h-6" />
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
