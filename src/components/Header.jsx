import { Menu, BookOpen, ChevronRight } from 'lucide-react';
import { STAGES } from '../data/lessonsData';

const VIEW_TITLES = {
  dashboard:      { label: 'Jornada de Aprendizado', sub: 'Visão geral das suas etapas' },
  playground:     { label: 'Playground Frontend', sub: 'Teste HTML, CSS e JS em tempo real' },
  'php-simulator':{ label: 'Simulador PHP', sub: 'Execute código PHP no navegador' },
  'db-simulator': { label: 'Simulador SQL', sub: 'Pratique consultas ao banco de dados' },
  cheatsheet:     { label: 'Guia de Consulta Rápida', sub: 'Referências e cheatsheets' },
};

export default function Header({ activeView, currentStage, setSidebarOpen }) {
  const stage = activeView === 'stage' ? STAGES.find(s => s.id === currentStage) : null;

  const title = stage
    ? stage.title
    : VIEW_TITLES[activeView]?.label || 'Web Dev Lab';

  const sub = stage
    ? `Etapa ${stage.stageNumber} · ${stage.tech} · ${stage.level}`
    : VIEW_TITLES[activeView]?.sub || '';

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-5 lg:px-8 shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-slate-400 hover:text-slate-200 p-1.5 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb-style header */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-0.5">
            <BookOpen className="w-3 h-3 shrink-0" />
            <span className="truncate">Web Dev Lab</span>
            {activeView !== 'dashboard' && (
              <>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="truncate text-slate-400">{title}</span>
              </>
            )}
          </div>
          {sub && (
            <p className="text-[11px] text-slate-600 font-medium truncate">{sub}</p>
          )}
        </div>
      </div>

      {/* Right side badge */}
      <div className="shrink-0">
        {stage && (
          <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-extrabold uppercase tracking-wider">
            {stage.optional ? '★ Opcional' : `Etapa ${stage.stageNumber}`}
          </span>
        )}
      </div>
    </header>
  );
}
