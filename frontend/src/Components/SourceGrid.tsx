
export const SourceGrid = ({ sources }: { sources: any[] }) => {
  if (sources.length === 0) return <div className="h-20 w-full bg-gray-50 dark:bg-[#2A2A2A] animate-pulse rounded-xl" />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {sources.map((source, i) => (
        <a 
          key={i} 
          href={source.url} 
          target="_blank" 
          rel="noreferrer"
          className="p-3 bg-white dark:bg-[#222222] border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition shadow-sm flex flex-col justify-between h-20"
        >
          <span className="text-xs font-medium line-clamp-2 text-gray-800 dark:text-gray-200">{source.title}</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-tighter truncate mt-1">
            {new URL(source.url).hostname.replace('www.', '')}
          </span>
        </a>
      ))}
    </div>
  );
};