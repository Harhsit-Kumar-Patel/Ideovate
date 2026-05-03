import { BarChart3, ClipboardList, Compass, Rocket, Sparkles } from 'lucide-react';

export type RoadmapView = 'generator' | 'strategy' | 'roadmap' | 'metrics';

interface SidebarProps {
  activeView: RoadmapView;
  onViewChange: (view: RoadmapView) => void;
}

const navItems = [
  { id: 'generator', label: 'Generator', icon: Sparkles },
  { id: 'strategy', label: 'Strategy', icon: Compass },
  { id: 'roadmap', label: 'Roadmap', icon: ClipboardList },
  { id: 'metrics', label: 'Metrics', icon: BarChart3 },
] as const;

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="hidden w-20 flex-col border-r border-neutral-900 bg-neutral-950 p-4 sm:flex md:w-64">
      <div className="mb-12 mt-4 flex items-center gap-3 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
          <Rocket size={18} />
        </div>
        <span className="hidden text-lg font-semibold tracking-wide md:block">Ideovate</span>
      </div>

      <nav className="flex flex-col gap-2 text-neutral-400">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-white'
                  : 'hover:bg-neutral-900 hover:text-white'
              }`}
              aria-pressed={isActive}
              title={item.label}
            >
              <Icon size={20} />
              <span className="hidden font-medium md:block">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
