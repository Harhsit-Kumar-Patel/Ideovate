import { Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-20 md:w-64 border-r border-neutral-900 hidden sm:flex flex-col p-4 bg-neutral-950">
      <div className="flex items-center gap-3 px-2 mb-12 mt-4">
        <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold">
          I
        </div>
        <span className="font-semibold text-lg tracking-wide hidden md:block">Ideovate</span>
      </div>
      
      <nav className="flex flex-col gap-2 text-neutral-400">
        <button className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors w-full text-left">
          <Sparkles size={20} />
          <span className="hidden md:block font-medium">Capture</span>
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors w-full text-left">
          <CheckCircle2 size={20} />
          <span className="hidden md:block font-medium">Tasks</span>
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors w-full text-left">
          <Clock size={20} />
          <span className="hidden md:block font-medium">Focus Timer</span>
        </button>
      </nav>
    </aside>
  );
}
