import { useState, useEffect, useRef, useCallback } from 'react';
import { getStageById } from '../data/lessonsData';
import { 
  Award, ArrowLeft, ArrowRight, CheckCircle2, Play,
  BookOpen, X, Video, FileText, ExternalLink, Star,
  Clock, Eye, Lock, AlertTriangle, Info, Zap
} from 'lucide-react';
import Cheatsheet from './Cheatsheet';

// ── Material Card (Novo formato premium sem iframe problemático) ──────────────
function MaterialCard({ videoUrl, videoTitle }) {
  return (
    <a href={videoUrl} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-red-500/40 hover:bg-slate-800/80 transition-all group shadow-xl">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
        <Play className="w-5 h-5 text-red-500 fill-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{videoTitle}</p>
        <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
          <ExternalLink className="w-3 h-3" /> Abre em nova aba garantida
        </p>
      </div>
    </a>
  );
}

// ── Quiz Panel ────────────────────────────────────────────────────────────────
function QuizPanel({ activeLesson, isLessonCompleted, onCompleteLesson, activeIdx, setActiveIdx, lessonsLength }) {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizStatus, setQuizStatus] = useState(null);

  const handleSelectOption = (idx) => {
    if (isLessonCompleted) return; // Se já concluiu, não altera resposta
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
    <div className="border rounded-2xl p-6 mt-8 space-y-4 transition-all bg-slate-900/60 border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Award className="w-5 h-5 text-indigo-400" />
          <h5 className="font-extrabold text-sm tracking-tight">Verificação de Aprendizado</h5>
        </div>
        {isLessonCompleted && (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
            <CheckCircle2 className="w-3 h-3" /> Lição Concluída!
          </span>
        )}
      </div>

      {/* Question */}
      <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4">
        <p className="text-slate-200 text-sm font-semibold leading-relaxed">
          <span className="text-indigo-400 font-black mr-2">❓</span>
          {activeLesson.quiz.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2.5 mt-3">
        {activeLesson.quiz.options.map((opt, idx) => {
          const selected = selectedOpt === idx;
          const isCorrectOpt = quizStatus === 'correct' && opt.correct;
          const isIncorrectOpt = quizStatus === 'incorrect' && selected && !opt.correct;

          let styleClasses = 'bg-slate-950/40 border-slate-800 hover:border-indigo-500/40 text-slate-300';
          if (selected) styleClasses = 'bg-indigo-600/10 border-indigo-500 text-indigo-200';
          if (isCorrectOpt || (isLessonCompleted && opt.correct)) {
            styleClasses = 'bg-emerald-500/10 border-emerald-500 text-emerald-300';
          } else if (isIncorrectOpt) {
            styleClasses = 'bg-red-500/10 border-red-500 text-red-300';
          }

          const letters = ['A', 'B', 'C', 'D'];

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isLessonCompleted}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all duration-200 ${
                isLessonCompleted ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:border-indigo-500/40'
              } ${styleClasses}`}
            >
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 font-bold text-[10px] ${selected ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300' : 'border-slate-700 text-slate-500'}`}>
                {letters[idx]}
              </div>
              <span>{opt.text}</span>
              {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>

      {quizStatus === 'correct' && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 border-l-4 border-l-emerald-500 rounded-xl p-4 space-y-1 animate-pulse-once">
          <p className="text-xs font-black text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Resposta Correta!</p>
          <p className="text-xs text-emerald-300/80 leading-relaxed">{activeLesson.quiz.explanation}</p>
        </div>
      )}
      {quizStatus === 'incorrect' && (
        <div className="bg-red-500/10 border border-red-500/30 border-l-4 border-l-red-500 rounded-xl p-4 space-y-1">
          <p className="text-xs font-black text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Resposta Incorreta!</p>
          <p className="text-xs text-red-300/80 leading-relaxed">Não desanime! Releia o conteúdo acima com atenção e tente novamente.</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex flex-wrap gap-3 items-center justify-between border-t border-slate-800/80 pt-4 mt-4">
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
            disabled={selectedOpt === null}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all ${
              selectedOpt !== null
                ? 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-lg shadow-indigo-500/20'
                : 'bg-slate-700 opacity-50 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmar Resposta
          </button>
        )}

        {isLessonCompleted && activeIdx < lessonsLength - 1 && (
          <button
            onClick={() => setActiveIdx(prev => Math.min(lessonsLength - 1, prev + 1))}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
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
    <div className="mt-8 border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-3">
        <BookOpen className="w-5 h-5 text-indigo-400" />
        <h5 className="font-extrabold text-sm text-slate-200 tracking-tight">Materiais de Estudo</h5>
        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 ml-auto flex items-center gap-1">
          <Info className="w-3 h-3" /> Consulte antes do Quiz
        </span>
      </div>

      {videos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Video className="w-3.5 h-3.5 text-red-500" />
            <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
              Vídeo-Aulas Recomendadas
            </p>
          </div>
          <div className="space-y-4">
            {videos.map((v, i) => (
              <MaterialCard
                key={i}
                videoUrl={v.url}
                videoTitle={v.title}
              />
            ))}
          </div>
        </div>
      )}

      {docs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Documentação Oficial</p>
          </div>
          <div className="space-y-2">
            {docs.map((d, i) => (
              <a
                key={i}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/30 rounded-xl transition-all group"
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

// ── Progress Bar Header ───────────────────────────────────────────────────────
function LessonProgressBar({ current, total, accent }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
        <span>Lição {current + 1} de {total}</span>
        <span>{pct}% desta etapa</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: accent }}
        />
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: accent }} />
      </div>
    </div>
  );
}

export default function Curriculum({ 
  stageKey, 
  onSwitchView, 
  completedLessons,
  onCompleteLesson
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const stage = getStageById(stageKey || 'stage-html');
  
  // Safely reset activeIdx when stageKey changes to avoid out-of-bounds array access
  useEffect(() => {
    setActiveIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stageKey]);

  if (!stage) return null;

  const lessons = stage.lessons;
  const safeIdx = activeIdx >= lessons.length ? 0 : activeIdx;
  const activeLesson = lessons[safeIdx];
  const isLessonCompleted = activeLesson ? completedLessons.includes(activeLesson.id) : false;
  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;

  if (!activeLesson) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 animate-fade-in">
      <aside className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 h-fit lg:sticky lg:top-24 space-y-5">
        <div className="space-y-3 border-b border-slate-800/80 pb-4">
          <h4 className="text-sm font-extrabold text-slate-200">{stage.title}</h4>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(completedCount / lessons.length) * 100}%`, backgroundColor: stage.accent }} />
          </div>
        </div>
        <ul className="space-y-1.5">
          {lessons.map((lesson, idx) => (
            <li key={lesson.id}>
              <button onClick={() => setActiveIdx(idx)} className={`w-full text-left p-3 rounded-xl text-xs font-semibold ${idx === activeIdx ? 'bg-slate-800/80' : ''}`}>
                {lesson.title}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowCheatsheet(true)} className="w-full py-3 bg-indigo-600/10 text-indigo-400 font-bold rounded-xl border border-indigo-500/30 text-xs">
          Material de Consulta
        </button>
      </aside>

      <article className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="space-y-6">
          <LessonProgressBar current={activeIdx} total={lessons.length} accent={stage.accent} />
          <h3 className="text-xl font-black text-slate-200">{activeLesson.title}</h3>
          <div className="prose prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
          
          {activeLesson.challenge && (
            <div className="border border-violet-500/30 bg-violet-500/5 rounded-xl p-5" dangerouslySetInnerHTML={{ __html: activeLesson.challenge }} />
          )}

          <MaterialsPanel resources={activeLesson.resources} />
        </div>

        <QuizPanel 
          activeLesson={activeLesson}
          isLessonCompleted={isLessonCompleted}
          onCompleteLesson={() => onCompleteLesson(activeLesson.id)}
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
