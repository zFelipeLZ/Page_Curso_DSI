import { STAGES } from '../data/lessonsData';
import {
  LayoutDashboard, BookOpen, Award, Sparkles, GraduationCap,
  Code2, Terminal, Database, ChevronRight, CheckCircle2
} from 'lucide-react';

const TECH_COLORS = {
  HTML:    { text: 'text-red-400',    dot: 'bg-red-400' },
  CSS:     { text: 'text-blue-400',   dot: 'bg-blue-400' },
  JS:      { text: 'text-amber-400',  dot: 'bg-amber-400' },
  PHP:     { text: 'text-purple-400', dot: 'bg-purple-400' },
  MySQL:   { text: 'text-cyan-400',   dot: 'bg-cyan-400' },
  Laravel: { text: 'text-rose-400',   dot: 'bg-rose-400' },
};

export default function Sidebar({
  activeView, currentStage, onSwitchView, onOpenStage,
  globalProgress, sidebarOpen, setSidebarOpen,
  completedLessons = []
}) {
  const close = () => setSidebarOpen(false);

  const getStageProgress = (stage) => {
    const done = stage.lessons.filter(l => completedLessons.includes(l.id)).length;
    return { done, total: stage.lessons.length, pct: Math.round((done / stage.lessons.length) * 100) };
  };

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={close} />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-800/80 flex flex-col z-50
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* ── Logo ── */}
        <div className="px-5 py-5 border-b border-slate-800/80 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-black text-base text-slate-100 leading-tight flex items-center gap-1">
              Web Dev Lab <Sparkles className="w-3 h-3 text-rose-400 shrink-0" />
            </h2>
            <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Do HTML ao Laravel</span>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-6 px-3">

          {/* Início */}
          <div className="space-y-1">
            <button
              onClick={() => { onSwitchView('dashboard'); close(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              Início da Jornada
            </button>
          </div>

          {/* Etapas do Curso */}
          <div>
            <span className="px-3 text-[10px] font-extrabold text-slate-600 uppercase tracking-widest block mb-2">
              Etapas do Curso
            </span>
            <ul className="space-y-0.5">
              {STAGES.map((stage) => {
                const { done, total, pct } = getStageProgress(stage);
                const isActive = activeView === 'stage' && currentStage === stage.id;
                const isDone = done === total;
                const colors = TECH_COLORS[stage.tech] || TECH_COLORS['HTML'];

                return (
                  <li key={stage.id}>
                    <button
                      onClick={() => { onOpenStage(stage.id); close(); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'bg-slate-800 text-slate-200 border border-slate-700/60'
                          : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                      }`}
                    >
                      {/* Status dot */}
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isDone ? 'bg-emerald-400' : isActive ? colors.dot : 'bg-slate-700'}`} />

                      {/* Label */}
                      <span className="flex-1 text-left leading-snug truncate">
                        <span className="text-[9px] font-bold text-slate-600 uppercase block">{stage.stageNumber}. {stage.tech}</span>
                        <span className={isDone ? 'text-emerald-400' : isActive ? 'text-slate-200' : ''}>{stage.title}</span>
                      </span>

                      {/* Progress or check */}
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <span className={`text-[9px] font-bold shrink-0 ${isActive ? colors.text : 'text-slate-600'}`}>
                          {done}/{total}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ferramentas */}
          <div>
            <span className="px-3 text-[10px] font-extrabold text-slate-600 uppercase tracking-widest block mb-2">
              Ferramentas Práticas
            </span>
            <ul className="space-y-0.5">
              {[
                { view: 'playground',   icon: Code2,     label: 'Playground Frontend', color: 'text-emerald-400' },
                { view: 'php-simulator',icon: Terminal,   label: 'Simulador PHP',       color: 'text-violet-400' },
                { view: 'db-simulator', icon: Database,   label: 'Simulador SQL',       color: 'text-cyan-400' },
                { view: 'cheatsheet',   icon: BookOpen,   label: 'Guia de Consulta',    color: 'text-indigo-400' },
              ].map(({ view, icon: Icon, label, color }) => (
                <li key={view}>
                  <button
                    onClick={() => { onSwitchView(view); close(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeView === view
                        ? `bg-slate-800 ${color} border border-slate-700/60`
                        : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${activeView === view ? color : 'text-slate-600'}`} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Progress Footer ── */}
        <div className="px-4 py-4 border-t border-slate-800/80 shrink-0">
          <div className="bg-slate-800/40 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Progresso Geral
              </span>
              <span className="text-xs font-black text-slate-200">{globalProgress}%</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 transition-all duration-700"
                style={{ width: `${globalProgress}%` }}
              />
            </div>
            {globalProgress === 100 && (
              <p className="text-[10px] text-emerald-400 font-bold text-center">🎉 Jornada Concluída!</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
