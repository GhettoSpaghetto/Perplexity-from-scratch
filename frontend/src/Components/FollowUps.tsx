
interface Props {
  questions: string[];
  onSelect: (question: string) => void;
}

export const FollowUps = ({ questions, onSelect }: Props) => {
  if (questions.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 10h8"/><path d="M8 14h5"/>
        </svg>
        <span className="text-sm font-semibold tracking-wide uppercase">Related</span>
      </div>

      <div className="flex flex-col gap-1">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="group flex items-center justify-between w-full text-left p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200"
          >
            <span className="text-gray-700 group-hover:text-blue-600 dark:text-gray-200 transition-colors">
              {q}
            </span>
            <span className="text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2.5 group-hover:translate-x-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};