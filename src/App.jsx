import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Curriculum from './components/Curriculum';
import Playground from './components/Playground';
import PHPSimulator from './components/PHPSimulator';
import DatabaseSimulator from './components/DatabaseSimulator';
import Cheatsheet from './components/Cheatsheet';
import { fireConfetti } from './utils/confetti';
import { STAGES, REQUIRED_LESSON_IDS } from './data/lessonsData';
import { Award, Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentStage, setCurrentStage] = useState('stage-html');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Certificate
  const [studentName, setStudentName] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);

  // Progress — stored as array of completed lesson IDs
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('web_dev_lab_v2_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Persist progress
  useEffect(() => {
    localStorage.setItem('web_dev_lab_v2_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    document.body.className = 'bg-slate-950 text-slate-100 min-h-screen selection:bg-blue-600/30';
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ── Progress calculations ──
  const totalRequired = REQUIRED_LESSON_IDS.length;
  const completedRequired = REQUIRED_LESSON_IDS.filter(id => completedLessons.includes(id)).length;
  const globalProgress = Math.round((completedRequired / totalRequired) * 100);

  // Legacy prop — used by Sidebar
  const pathwayProgress = {};
  STAGES.forEach(s => {
    const count = s.lessons.filter(l => completedLessons.includes(l.id)).length;
    pathwayProgress[s.id] = Math.round((count / s.lessons.length) * 100);
  });

  // ── Handlers ──
  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const next = [...completedLessons, lessonId];
      setCompletedLessons(next);

      setTimeout(() => fireConfetti(), 300);
      setToast({ message: '✅ Lição concluída! Continue avançando na jornada.', type: 'success' });

      const nextRequired = REQUIRED_LESSON_IDS.filter(id => next.includes(id)).length;
      if (nextRequired === totalRequired) {
        setTimeout(() => {
          setToast({
            message: '🎉 Incrível! Você concluiu toda a jornada. Seu certificado está liberado!',
            type: 'gold',
          });
        }, 3600);
      }
    }
  };

  const handleOpenStage = (stageId) => {
    setCurrentStage(stageId);
    setActiveView('stage');
  };

  const handleSwitchView = (view) => setActiveView(view);

  const handleResetProgress = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      setCompletedLessons([]);
      setToast({ message: 'Progresso resetado com sucesso.', type: 'info' });
    }
  };

  return (
    <div className="min-h-screen flex">
      <canvas id="confetti-canvas" />

      {/* Toast */}
      {toast && (
        <div className={`
          fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-slide-in max-w-sm
          ${toast.type === 'success' ? 'bg-slate-900 border-emerald-500 text-emerald-400' :
            toast.type === 'gold' ? 'bg-slate-900 border-amber-500 text-amber-400' :
            'bg-slate-900 border-slate-700 text-blue-400'}
        `}>
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold leading-relaxed">{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        currentStage={currentStage}
        onSwitchView={handleSwitchView}
        onOpenStage={handleOpenStage}
        globalProgress={globalProgress}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        completedLessons={completedLessons}
      />

      {/* Main */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header
          activeView={activeView}
          currentStage={currentStage}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto space-y-8">

          {/* Certificate ready banner */}
          {globalProgress === 100 && (
            <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg shadow-amber-500/5 animate-pulse">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm md:text-base text-amber-200">Parabéns! Jornada 100% Concluída</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Seu certificado premium está pronto para ser emitido.</p>
                </div>
              </div>
              <button
                onClick={() => setShowCertModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 text-xs font-black rounded-xl shadow-lg cursor-pointer transition-all hover:scale-105 shrink-0"
              >
                Emitir Meu Certificado
              </button>
            </div>
          )}

          {/* Views */}
          {activeView === 'dashboard' && (
            <Dashboard
              onOpenStage={handleOpenStage}
              completedLessons={completedLessons}
              onSwitchView={handleSwitchView}
            />
          )}

          {activeView === 'stage' && (
            <Curriculum
              key={currentStage}
              stageKey={currentStage}
              completedLessons={completedLessons}
              onCompleteLesson={handleCompleteLesson}
              onSwitchView={handleSwitchView}
            />
          )}

          {activeView === 'playground' && <Playground />}
          {activeView === 'php-simulator' && <PHPSimulator />}
          {activeView === 'db-simulator' && <DatabaseSimulator />}
          {activeView === 'cheatsheet' && <Cheatsheet />}

          {/* Footer */}
          <div className="border-t border-slate-900 pt-8 mt-12 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-600 font-semibold select-none">
            <span>© 2026 Web Dev Lab — Do HTML ao Laravel.</span>
            <button
              onClick={handleResetProgress}
              className="text-slate-600 hover:text-red-400 uppercase tracking-wider transition-colors cursor-pointer"
            >
              Resetar Progresso
            </button>
          </div>
        </main>
      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Name input */}
            <div className="space-y-2 max-w-md mx-auto text-center">
              <h4 className="font-extrabold text-sm text-slate-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Personalize seu Nome
              </h4>
              <p className="text-xs text-slate-500">Escreva seu nome completo como deseja no certificado:</p>
              <input
                type="text"
                placeholder="Seu Nome Completo"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 font-bold text-center text-sm rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Certificate */}
            <div className="border border-slate-800/50 rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              <div
                id="printable-certificate"
                className="bg-slate-950 border-8 border-double border-amber-500/20 p-8 md:p-12 text-center text-slate-100 flex flex-col items-center justify-between gap-8 min-h-[440px] relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="space-y-2">
                  <div className="flex justify-center mb-1">
                    <Award className="w-14 h-14 text-amber-500" />
                  </div>
                  <h2 className="font-black text-2xl md:text-3xl text-amber-400 uppercase tracking-widest leading-none">
                    Certificado de Conclusão
                  </h2>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                    Web Dev Lab — Jornada Completa
                  </span>
                </div>

                <div className="space-y-4 max-w-xl">
                  <p className="text-xs md:text-sm text-slate-400 italic font-medium leading-relaxed">
                    Certificamos com honra e distinção técnica que o estudante
                  </p>
                  <h3 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-tight py-1 underline decoration-amber-500/30">
                    {studentName || 'Seu Nome Aqui'}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                    concluiu com êxito a <strong>Jornada Completa de Desenvolvimento Web</strong>, dominando
                    <strong> HTML5</strong>, <strong>CSS3 & Responsividade</strong>, <strong>PHP Server-Side</strong> e a construção de
                    <strong> Projetos Reais com o Framework Laravel</strong>, incluindo arquitetura MVC, banco de dados MySQL e autenticação de usuários.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-900/60 pt-6 w-full max-w-2xl text-xs font-semibold text-slate-500">
                  <div className="space-y-1">
                    <span className="font-serif italic text-slate-300 block border-b border-slate-900 pb-1 max-w-[150px] mx-auto select-none">Web Dev Lab Staff</span>
                    <span className="text-[9px] uppercase tracking-wider block">Assinatura do Instrutor</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-amber-500 block border-b border-slate-900 pb-1 max-w-[150px] mx-auto">120 Horas</span>
                    <span className="text-[9px] uppercase tracking-wider block">Carga Horária</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-300 block border-b border-slate-900 pb-1 max-w-[150px] mx-auto">
                      {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider block">Data de Emissão</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 items-center justify-end">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg cursor-pointer transition-all"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir Certificado
              </button>
              <button
                onClick={() => setShowCertModal(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700/50 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
