import { getPerfumes } from './actions';
import { PerfumeCard } from '@/components/PerfumeCard';

export default async function Home() {
  const allPerfumes = await getPerfumes();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Collection</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">{allPerfumes.length} {allPerfumes.length === 1 ? 'perfume' : 'perfumes'} collected</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {allPerfumes.map((perfume) => (
          <PerfumeCard key={perfume.id} perfume={perfume} />
        ))}
      </div>

      {allPerfumes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-900 rounded-[2rem] border border-dashed border-gray-200 dark:border-zinc-800 text-center px-4">
          <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No perfumes yet</h3>
          <p className="text-gray-500 text-sm">Tap the + button to add your first perfume.</p>
        </div>
      )}
    </div>
  );
}
