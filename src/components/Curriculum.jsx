import { useState } from 'react';
import { getStageById } from '../data/lessonsData';
import { 
  Award, ArrowLeft, ArrowRight, CheckCircle2, Play,
  BookOpen, X, Video, FileText, ExternalLink, Star
} from 'lucide-react';
import Cheatsheet from './Cheatsheet';

// ── Quiz Panel ────────────────────────────────────────────────────────────────
function QuizPanel({ activeLesson, isLessonCompleted, onCompleteLesson, activeIdx, setActiveIdx, lessonsLength }) {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizStatus, setQuizStatus] = useState(null);

  const handleSelectOption = (idx) => {
    if (isLessonCompleted) return;
    setSelectedOpt(idx);
    setQuizStatus(null);
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === null) { alert("Selecione uma resposta!"); return; }
    const opt = activeLesson.quiz.options[selectedOpt];
    if (opt.correct) {
      setQuizStatus('correct');
      onCompleteLesson(activeLesson.id);
    } else {
      setQuizStatus('incorrect');
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mt-8 space-y-4">
      <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800/60 pb-3">
        <Award className="w-5 h-5 text-indigo-400" />
        <h5 className="font-extrabold text-sm tracking-tight">Verifique seu Aprendizado</h5>
      </div>

      <p className="text-slate-300 text-sm font-medium leading-relaxed">
        {activeLesson.quiz.question}
      </p>

      <div className="grid grid-cols-1 gap-3 mt-3">
        {activeLesson.quiz.options.map((opt, idx) => {
          const selected = selectedOpt === idx;
          const isCorrectOpt = quizStatus === 'correct' && opt.correct;
          const isIncorrectOpt = quizStatus === 'incorrect' && selected && !opt.correct;

          let styleClasses = 'bg-slate-950/40 border-slate-800 hover:border-slate-700/60 text-slate-300';
          if (selected) styleClasses = 'bg-blue-600/10 border-blue-500 text-blue-300';
          if (isCorrectOpt || (isLessonCompleted && opt.correct)) {
            styleClasses = 'bg-emerald-500/10 border-emerald-500 text-emerald-300';
          } else if (isIncorrectOpt) {
            styleClasses = 'bg-red-500/10 border-red-500 text-red-300';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${styleClasses}`}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selected ? 'border-blue-500' : 'border-slate-800'}`}>
                {selected && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {quizStatus === 'correct' && (
        <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl p-4 text-xs font-semibold text-emerald-400 animate-fade-in leading-relaxed">
          <strong>Parabéns!</strong> {activeLesson.quiz.explanation}
        </div>
      )}
      {quizStatus === 'incorrect' && (
        <div className="bg-red-500/10 border-l-4 border-red-500 rounded-r-xl p-4 text-xs font-semibold text-red-400 animate-fade-in leading-relaxed">
          <strong>Incorreto!</strong> Releia o conteúdo e tente novamente.
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-800/80 pt-4 mt-6">
        <button
          onClick={() => setActiveIdx(prev => Math.max(0, prev - 1))}
          disabled={activeIdx === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-30 hover:bg-slate-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Anterior
        </button>

        {!isLessonCompleted && (
          <button
            onClick={handleCheckAnswer}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Validar Resposta
          </button>
        )}

        {isLessonCompleted && activeIdx < lessonsLength - 1 && (
          <button
            onClick={() => setActiveIdx(prev => Math.min(lessonsLength - 1, prev + 1))}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Próxima Lição <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Materials Panel ───────────────────────────────────────────────────────────
function MaterialsPanel({ resources }) {
  if (!resources) return null;
  const { videos = [], docs = [] } = resources;
  if (videos.length === 0 && docs.length === 0) return null;

  return (
    <div className="mt-8 border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-3">
        <BookOpen className="w-5 h-5 text-indigo-400" />
        <h5 className="font-extrabold text-sm text-slate-200 tracking-tight">Materiais de Apoio</h5>
        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider ml-auto">Para aprofundar</span>
      </div>

      {videos.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-red-500" /> Vídeos Recomendados
          </p>
          <div className="space-y-2">
            {videos.map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-red-500/30 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors truncate">{v.title}</p>
                    {v.duration && <p className="text-[10px] text-slate-600">{v.duration}</p>}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-red-400 shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}

      {docs.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" /> Documentação Oficial
          </p>
          <div className="space-y-2">
            {docs.map((d, i) => (
              <a
                key={i}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/30 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors truncate">{d.title}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Curriculum Component ─────────────────────────────────────────────────
export default function Curriculum({ stageKey, completedLessons, onCompleteLesson, onSwitchView }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const stage = getStageById(stageKey);

  if (!stage) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400">Etapa não encontrada.</p>
        <button onClick={() => onSwitchView('dashboard')} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">
          Voltar ao Início
        </button>
      </div>
    );
  }

  const lessons = stage.lessons;
  const activeLesson = lessons[activeIdx];
  const isLessonCompleted = completedLessons.includes(activeLesson?.id);

  if (!activeLesson) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Nenhuma lição encontrada nesta etapa.</p>
        <button onClick={() => onSwitchView('dashboard')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">Voltar</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 animate-fade-in">
      
      {/* ── Left Sidebar ── */}
      <aside className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 h-fit lg:max-h-[calc(100vh-180px)] overflow-y-auto lg:sticky lg:top-24 space-y-5">
        
        {/* Stage header */}
        <div className="space-y-1 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Etapa {stage.stageNumber}</span>
            {stage.optional && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase">
                <Star className="w-2.5 h-2.5" /> Opcional
              </span>
            )}
          </div>
          <h4 className="text-sm font-extrabold text-slate-200">{stage.title}</h4>
          <p className="text-[10px] text-slate-500">{lessons.filter(l => completedLessons.includes(l.id)).length}/{lessons.length} lições concluídas</p>
        </div>

        {/* Lessons list */}
        <ul className="space-y-1.5">
          {lessons.map((lesson, idx) => {
            const completed = completedLessons.includes(lesson.id);
            const active = idx === activeIdx;
            return (
              <li key={lesson.id}>
                <button
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full flex items-center justify-between text-left p-3 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-slate-800/80 border-slate-700/80 text-slate-200'
                      : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/30 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {completed ? '✓' : idx + 1}
                    </span>
                    <span className="truncate">{lesson.title.split('.').slice(1).join('.').trim() || lesson.title}</span>
                  </div>
                  {completed && (
                    <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">OK</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Cheatsheet button */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setShowCheatsheet(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-bold rounded-xl border border-indigo-500/30 transition-all text-xs tracking-wide uppercase"
          >
            <BookOpen className="w-4 h-4" />
            Material de Consulta
          </button>
        </div>

        {/* Back button */}
        <button
          onClick={() => onSwitchView('dashboard')}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-slate-500 hover:text-slate-300 font-semibold rounded-xl text-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Jornada
        </button>
      </aside>

      {/* ── Main Content ── */}
      <article className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col shadow-xl shadow-black/10">
        <div className="space-y-6">
          
          {/* Lesson Header */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <span
              className="inline-block text-[9px] font-extrabold border uppercase px-2 py-0.5 rounded-full tracking-wider"
              style={{ color: stage.accent, borderColor: stage.accent + '80' }}
            >
              {activeLesson.level} — {activeLesson.badge}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-200">{activeLesson.title}</h3>
            {activeLesson.description && (
              <p className="text-sm text-slate-400 leading-relaxed">{activeLesson.description}</p>
            )}
          </div>

          {/* Content Body */}
          <div
            className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: activeLesson.content }}
          />

          {/* Code Example */}
          {activeLesson.demoCode && (
            <div className="border border-slate-800 rounded-xl overflow-hidden shadow-lg bg-slate-950 font-mono text-xs md:text-sm my-6">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-slate-400 select-none">
                <span className="font-bold flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                  Código de Exemplo
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">{stage.tech}</span>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed">
                <code>{activeLesson.demoCode}</code>
              </pre>
            </div>
          )}

          {/* Materials Panel */}
          <MaterialsPanel resources={activeLesson.resources} />
        </div>

        {/* Quiz */}
        <QuizPanel
          key={activeLesson.id}
          activeLesson={activeLesson}
          isLessonCompleted={isLessonCompleted}
          onCompleteLesson={onCompleteLesson}
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
          lessonsLength={lessons.length}
        />
      </article>

      {/* ── Cheatsheet Modal ── */}
      {showCheatsheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-950 w-full max-w-7xl h-[90vh] rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black text-slate-200">Guia de Consulta Rápida</h2>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Cheatsheet Web Dev Lab</span>
                </div>
              </div>
              <button
                onClick={() => setShowCheatsheet(false)}
                className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-rose-500 px-4 py-2 rounded-xl transition-all font-bold text-sm flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Fechar
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 bg-slate-950">
              <Cheatsheet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
