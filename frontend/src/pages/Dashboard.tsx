import { useState } from 'react';
import { Sidebar } from '../Components/Sidebar';
import { SearchBar } from '../Components/SearchBar';
import { SourceGrid } from '../Components/SourceGrid';
import { AnswerSection } from '../Components/AnswerSection';
import { FollowUps } from '../Components/FollowUps';
import { parseStreamingContent } from '../utils/parser';
import { supabase } from '../utils/supabase';

const Dashboard = () => {
  // --- STATE ---
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [rawOutput, setRawOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- HANDLERS ---
  const startSearch = async (overrideQuery?: string) => {
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim()) return;

    
    setHasSearched(true);
    setIsStreaming(true);
    setRawOutput('');

    try {
      
      const { data: { session } } = await supabase.auth.getSession();
      
      
      const response = await fetch('http://localhost:3001/perplexity_ask', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': session?.access_token 
        },
        body: JSON.stringify({ query: finalQuery }),
      });

      if (!response.ok) {
        console.error("Backend Error:", await response.text());
        setRawOutput("An error occurred while fetching the response. Please check the console.");
        setIsStreaming(false);
        return;
      }

      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setRawOutput((prev) => prev + decoder.decode(value));
        }
      }
    } catch (err) {
      console.error("Search request failed:", err);
      setRawOutput("Network error. Make sure your backend is running on port 3001.");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSelectConversation = (id: string) => {
    console.log("Selected conversation:", id);
    setIsSidebarOpen(false);
  };

  const { answer, sources, followUps } = parseStreamingContent(rawOutput);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 flex transition-colors duration-300">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        onSelectConversation={handleSelectConversation} 
      />

      <main className={`flex-1 transition-all ml-0 md:ml-64 min-h-screen ${hasSearched ? 'pt-10' : 'pt-[20vh]'}`}>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>

        {/* --- Phase 1: Hero View --- */}
        {!hasSearched ? (
          <div className="flex flex-col items-center px-4">
            <h1 className="text-4xl font-medium mb-10 tracking-tight">Where knowledge begins.</h1>
            <SearchBar query={query} setQuery={setQuery} onSearch={() => startSearch()} />
          </div>
        ) : (
        /* --- Phase 2: Results View --- */
          <div className="max-w-3xl mx-auto pb-20 px-4 md:px-8">
            <h1 className="text-3xl font-medium mb-6">{query}</h1>
            <SourceGrid sources={sources} />
            <AnswerSection answer={answer} isStreaming={isStreaming} />
            {!isStreaming && <FollowUps questions={followUps} onSelect={(q) => { setQuery(q); startSearch(q); }} />}
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;