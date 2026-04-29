import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AnswerSection = ({ answer, isStreaming }: { answer: string; isStreaming: boolean }) => {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-medium prose-a:text-blue-600">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {answer}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-1.5 h-5 ml-1 bg-blue-600 animate-pulse align-middle" />
      )}
    </div>
  );
};