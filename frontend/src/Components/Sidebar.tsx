import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router';

interface Conversation {
  id: string;
  title: string | null;
  slug: string;
}

interface SidebarProps {
  onSelectConversation: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ onSelectConversation, isOpen, setIsOpen }: SidebarProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const res = await fetch('http://localhost:3001/conversations', {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        });
        const data = await res.json();
        setConversations(data.conversations || []);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      html.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-[#F9F9F9] dark:bg-[#111111] border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        
        {/* TOP: Logo */}
        <div className="p-4 flex items-center justify-between mt-2">
          <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Perplexity</span>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-black dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* TOP: New Thread Button */}
        <div className="px-3 mt-4">
          <button 
            onClick={() => { window.location.reload(); }}
            className="w-full flex items-center gap-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 shadow-sm rounded-full py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Thread
          </button>
        </div>

        {/* MIDDLE: History List */}
        <div className="flex-1 overflow-y-auto mt-6 px-3">
          <h3 className="text-xs font-semibold text-gray-400 mb-3 px-2">History</h3>
          {loading ? (
            <div className="px-2 text-sm text-gray-400 animate-pulse">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="px-2 text-sm text-gray-500">No recent searches</div>
          ) : (
            <div className="flex flex-col gap-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className="text-left w-full truncate text-sm px-2 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
                >
                  {conv.title || 'New Conversation'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM: Settings & Auth */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-between w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </span>
          </button>

          <button 
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
          >
            <span className="flex items-center gap-2">
              🚪 Sign Out
            </span>
          </button>
        </div>
        
      </div>
    </>
  );
};