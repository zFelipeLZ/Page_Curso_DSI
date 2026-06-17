import { STAGES, getStageStatus, isStageUnlocked } from '../data/lessonsData';
import { 
  CheckCircle2, Lock, PlayCircle, ChevronRight, 
  Sparkles, Star, BookOpen, Code2
} from 'lucide-react';

const TECH_COLORS = {
  HTML:    { text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30',  dot: 'bg-red-400' },
  CSS:     { text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30', dot: 'bg-blue-400' },
  JS:      { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',dot: 'bg-amber-400' },
  PHP:     { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30',dot:'bg-purple-400' },
  MySQL:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30', dot: 'bg-cyan-400' },
  Laravel: { text: 'text-rose-400',   bg: 'bg-rose-500/10',   border: 'border-rose-500/30', dot: 'bg-rose-400' },
};

export default function Dashboard({ onOpenStage, completedLessons, onSwitchView, user }) {
  const totalRequired = STAGES.filter(s => !s.optional).flatMap(s => s.lessons).length;
  const completedRequired = STAGES
    .filter(s => !s.optional)
    .flatMap(s => s.lessons)
    .filter(l => completedLessons.includes(l.id)).length;
  const overallPct = Math.round((completedRequired / totalRequired) * 100);

  // Encontra a primeira etapa não concluída e desbloqueada
  const currentStageIdx = STAGES.findIndex((s, i) => {
    const unlocked = isStageUnlocked(i, STAGES, completedLessons);
    const status = getStageStatus(s, completedLessons);
    return unlocked && status !== 'done';
  });

  // Extrai o primeiro nome do e-mail (ex: felipe.louzeiro@... -> Felipe)
  let firstName = 'Estudante';
  if (user?.email) {
    const rawName = user.email.split('@')[0].split('.')[0];
    firstName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  }

  return (
    <div className="space-y-10 animate-fade-in">

      {/* ── Hero Banner: WebDev Pro ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center">
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider preserve-color">
              <Sparkles className="w-3.5 h-3.5" />
              Plataforma Premium
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Bem-vindo de volta, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">{firstName}!</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Você completou <strong className="text-white">{overallPct}%</strong> da sua formação FullStack. 
              {currentStageIdx >= 0 && STAGES[currentStageIdx] && (
                <span> Sua próxima parada é <strong className="text-rose-400">{STAGES[currentStageIdx].title}</strong>.</span>
              )}
            </p>

            {currentStageIdx >= 0 && STAGES[currentStageIdx] ? (
              <button 
                onClick={() => onOpenStage(STAGES[currentStageIdx].id)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-bold hover:bg-white transition-colors shadow-lg shadow-white/5"
              >
                <PlayCircle className="w-5 h-5" />
                Continuar Jornada
              </button>
            ) : (
              <button 
                onClick={() => onSwitchView('playground')}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/20"
              >
                <Code2 className="w-5 h-5" />
                Praticar no Playground
              </button>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-1 items-start w-36">
              <BookOpen className="w-5 h-5 text-blue-400 mb-1" />
              <span className="text-2xl font-black text-slate-100">{completedRequired}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lições Feitas</span>
            </div>
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-1 items-start w-36">
              <Star className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-2xl font-black text-slate-100">{overallPct}%</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Progresso</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Timeline de Etapas ── */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-200 tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-rose-400" />
          Trilha de Aprendizado
        </h3>

        <div className="relative">
          {/* Linha vertical conectora */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-rose-500/40 via-purple-500/20 to-slate-800/50 hidden md:block" />

          <div className="space-y-4">
            {STAGES.map((stage, idx) => {
              const status = getStageStatus(stage, completedLessons);
              const unlocked = isStageUnlocked(idx, STAGES, completedLessons);
              const colors = TECH_COLORS[stage.tech] || TECH_COLORS['HTML'];
              const completedCount = stage.lessons.filter(l => completedLessons.includes(l.id)).length;
              const isCurrent = idx === currentStageIdx;

              return (
                <div
                  key={stage.id}
                  className={`
                    relative md:pl-16 transition-all duration-300
                    ${!unlocked ? 'opacity-50' : ''}
                  `}
                >
                  {/* Step Number Circle */}
                  <div className={`
                    absolute left-0 top-6 w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-base z-10 hidden md:flex
                    ${status === 'done'
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : isCurrent
                      ? 'bg-slate-900 border-rose-500 text-rose-400 shadow-lg shadow-rose-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                    }
                  `}>
                    {status === 'done' ? <CheckCircle2 className="w-6 h-6" /> : stage.stageNumber}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => unlocked && onOpenStage(stage.id)}
                    className={`
                      group bg-slate-900/60 border rounded-2xl p-5 md:p-6 transition-all duration-300
                      ${unlocked ? 'cursor-pointer hover:bg-slate-900 hover:-translate-y-0.5' : 'cursor-not-allowed'}
                      ${isCurrent ? 'border-rose-500/40 shadow-lg shadow-rose-500/5' : 'border-slate-800'}
                      ${status === 'done' ? 'border-emerald-500/20' : ''}
                    `}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Top badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${colors.text} ${colors.bg} ${colors.border}`}>
                            {stage.tech}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Etapa {stage.stageNumber}
                          </span>
                          {stage.optional && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase tracking-wider">
                              <Star className="w-2.5 h-2.5" /> Opcional
                            </span>
                          )}
                          {status === 'done' && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase tracking-wider">
                              ✓ Concluída
                            </span>
                          )}
                          {isCurrent && status !== 'done' && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 uppercase tracking-wider animate-pulse">
                              ► Em andamento
                            </span>
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h4 className="font-extrabold text-slate-200 text-base md:text-lg group-hover:text-white transition-colors">
                            {stage.title}
                          </h4>
                          <p className="text-slate-500 text-xs mt-0.5">{stage.subtitle}</p>
                        </div>

                        {/* Lessons & Progress */}
                        <div className="flex items-center gap-4 pt-1">
                          <span className="text-xs text-slate-500 font-medium">
                            {completedCount}/{stage.lessons.length} lições
                          </span>
                          {/* Mini progress bar */}
                          <div className="flex-1 max-w-[160px] h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                status === 'done' ? 'bg-emerald-500' : `bg-gradient-to-r from-rose-500 to-amber-500`
                              }`}
                              style={{ width: `${(completedCount / stage.lessons.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right action icon */}
                      <div className="shrink-0 mt-1">
                        {!unlocked ? (
                          <Lock className="w-5 h-5 text-slate-600" />
                        ) : status === 'done' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : isCurrent ? (
                          <PlayCircle className="w-7 h-7 text-rose-400 group-hover:scale-110 transition-transform" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
