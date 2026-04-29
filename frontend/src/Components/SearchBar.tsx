
interface Props {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  isFloating?: boolean;
}

export const SearchBar = ({ query, setQuery, onSearch, isFloating }: Props) => {
  return (
    <div className={`w-full transition-all duration-500 ${isFloating ? 'max-w-4xl' : 'max-w-2xl'}`}>
      <div className="relative group">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          rows={isFloating ? 1 : 3}
          className="w-full p-4 pr-16 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-[#2A2A2A] text-black dark:text-white transition-all"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSearch();
            }
          }}
        />
        <button 
          onClick={(e) => {
            e.preventDefault(); // Prevents default button behavior
            onSearch();         // Calls the function WITHOUT the event object
            }}
          className="absolute right-3 bottom-3 bg-black text-white p-2 rounded-xl hover:bg-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
        </button>
      </div>
    </div>
  );
};