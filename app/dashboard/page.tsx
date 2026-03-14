'use client';

import { useState, useEffect } from 'react';
import { Plus, Sparkles, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [inputText, setInputText] = useState('');
  const [mounted, setMounted] = useState(false);
  const { ideas, addIdea, deleteIdea } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addIdea(inputText.trim());
    setInputText('');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex font-sans selection:bg-neutral-700">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 flex flex-col max-w-4xl mx-auto w-full">
        <header className="mb-12 mt-4">
          <h1 className="text-4xl font-semibold mb-3 tracking-tight">Good morning, Harshit.</h1>
          <p className="text-lg text-neutral-500">What are we building today?</p>
        </header>

        <section className="mb-12">
          <form onSubmit={handleCapture} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Plus size={24} className="text-neutral-500 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Capture a new idea, task, or goal..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-5 pl-14 pr-6 text-lg focus:outline-none focus:ring-1 focus:ring-neutral-500 focus:border-neutral-500 transition-all placeholder:text-neutral-600 shadow-sm"
            />
          </form>
        </section>

        <section>
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Recent Activity</h2>
          {ideas.length === 0 ? (
            <div className="border border-neutral-800 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-neutral-900/30">
              <Sparkles size={32} className="text-neutral-700 mb-4" />
              <p className="text-neutral-400">Your mind is clear. Type above to start capturing.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <div key={idea.id} className="group flex items-start justify-between bg-neutral-900 border border-neutral-800 p-5 rounded-2xl hover:border-neutral-700 transition-colors">
                  <p className="text-neutral-200 text-lg">{idea.text}</p>
                  <button onClick={() => deleteIdea(idea.id)} className="text-neutral-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
