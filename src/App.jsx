import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Curriculum from './components/Curriculum';
import Playground from './components/Playground';
import PHPSimulator from './components/PHPSimulator';
import DatabaseSimulator from './components/DatabaseSimulator';
import Cheatsheet from './components/Cheatsheet';
import LoginPanel from './components/LoginPanel';
import { supabase } from './lib/supabase';
import { fireConfetti } from './utils/confetti';
import { STAGES, REQUIRED_LESSON_IDS } from './data/lessonsData';
import { Award, Printer, X, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentStage, setCurrentStage] = useState('stage-html');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Auth State
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Certificate
  const [studentName, setStudentName] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);

  // Theme & Onboarding
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('webdev_pro_theme') === 'light';
  });
  
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('webdev_pro_welcomed');
  });

  // Progress — stored as array of completed lesson IDs
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      // Migrate from old key if exists
      const oldSaved = localStorage.getItem('web_dev_lab_v2_progress');
      const newSaved = localStorage.getItem('webdev_pro_progress');
      
      let savedToUse = newSaved;
      if (!newSaved && oldSaved) {
        savedToUse = oldSaved;
        localStorage.setItem('webdev_pro_progress', oldSaved);
      }

      if (savedToUse) {
        const parsed = JSON.parse(savedToUse);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Persist local progress and theme
  useEffect(() => {
    localStorage.setItem('webdev_pro_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('webdev_pro_theme', isLightMode ? 'light' : 'dark');
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  useEffect(() => {
    document.body.className = 'bg-slate-950 text-slate-100 min-h-screen selection:bg-rose-500/30';
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ── Auth & Cloud Sync ──
  useEffect(() => {
    // Busca a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        handleUserLogin(session.user);
      } else {
        setLoadingAuth(false);
      }
    });

    // Escuta mudanças (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        handleUserLogin(session.user);
      } else {
        setLoadingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserLogin = async (currentUser) => {
    try {
      // Busca progresso da nuvem
      const { data, error } = await supabase
        .from('user_progress')
        .select('completed_lessons')
        .eq('user_id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar progresso:', error);
      }

      let cloudLessons = data?.completed_lessons || [];
      
      // Auto-Migration: Mescla o local (localStorage) com o da nuvem
      // Set remove duplicatas
      const merged = Array.from(new Set([...completedLessons, ...cloudLessons]));

      // Se o local tiver algo a mais que a nuvem, já faz um UPSERT
      if (merged.length > cloudLessons.length || !data) {
        await supabase
          .from('user_progress')
          .upsert({ 
            user_id: currentUser.id, 
            completed_lessons: merged 
          });
      }

      setCompletedLessons(merged);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAuth(false);
    }
  };

  const syncProgressToCloud = async (lessonId) => {
    if (!user) return;
    const next = Array.from(new Set([...completedLessons, lessonId]));
    try {
      await supabase
        .from('user_progress')
        .upsert({ user_id: user.id, completed_lessons: next });
    } catch (e) {
      console.error('Erro ao sincronizar', e);
    }
  };

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
      syncProgressToCloud(lessonId); // Sincroniza em background

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

  const handleLogout = async () => {
    setCompletedLessons([]);
    setUser(null);
    await supabase.auth.signOut();
  };

  const handleResetProgress = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      setCompletedLessons([]);
      if (user) {
        supabase.from('user_progress').upsert({ user_id: user.id, completed_lessons: [] }).then();
      }
      setToast({ message: 'Progresso resetado com sucesso.', type: 'info' });
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Conectando ao WebDev Pro...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPanel />;
  }

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
        user={user}
      />

      {/* Main */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header
          activeView={activeView}
          currentStage={currentStage}
          setSidebarOpen={setSidebarOpen}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          user={user}
          onLogout={handleLogout}
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
              user={user}
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
            <div className="border border-slate-800/50 rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex justify-center p-4 md:p-8 overflow-x-auto">
              <div
                id="printable-certificate"
                className="relative bg-[#fdfbf7] w-[800px] h-[565px] min-w-[800px] shadow-2xl p-2"
                style={{
                  backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
                }}
              >
                {/* Inner Border */}
                <div className="w-full h-full border-[10px] border-double border-[#b8860b] p-8 relative flex flex-col items-center justify-between z-10 before:absolute before:inset-2 before:border before:border-[#d4af37] before:pointer-events-none">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#b8860b] opacity-50"></div>
                  <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#b8860b] opacity-50"></div>
                  <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#b8860b] opacity-50"></div>
                  <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#b8860b] opacity-50"></div>

                  {/* Header */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <Award className="w-16 h-16 text-[#d4af37]" />
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] uppercase tracking-widest">
                      Certificado
                    </h1>
                    <h2 className="text-sm font-semibold tracking-[0.3em] text-[#8b6508] uppercase">
                      de Conclusão de Curso
                    </h2>
                  </div>

                  {/* Body Text */}
                  <div className="text-center max-w-2xl mt-4 z-10">
                    <p className="text-[#4a4a4a] text-lg font-serif italic mb-4">
                      Certificamos com honra e distinção técnica que
                    </p>
                    <h3 className="text-4xl font-black text-[#1a1a1a] mb-6 font-serif border-b border-[#b8860b] pb-2 px-8 inline-block">
                      {studentName || 'Nome do Aluno'}
                    </h3>
                    <p className="text-[#333333] leading-relaxed text-sm">
                      concluiu com êxito a <strong>Jornada Completa de Desenvolvimento Web</strong> promovida pelo <strong>Web Dev Lab</strong>, adquirindo proficiência e domínio técnico em <strong>HTML5, CSS3, JavaScript, PHP e Framework Laravel (MVC & MySQL)</strong>.
                    </p>
                  </div>

                  {/* Footer / Signatures */}
                  <div className="w-full grid grid-cols-3 gap-8 mt-8 text-center text-[#1a1a1a] items-end z-10 relative">
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{new Date().toLocaleDateString('pt-BR')}</p>
                      <div className="w-40 border-t border-[#1a1a1a] mx-auto opacity-30 mt-1"></div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-[#666]">Data</p>
                    </div>

                    <div className="space-y-1 flex flex-col items-center">
                      {/* Seal / Emblem */}
                      <div className="w-20 h-20 rounded-full border-4 border-dashed border-[#d4af37] flex items-center justify-center bg-[#fdfbf7] relative shadow-lg">
                        <div className="absolute inset-1 rounded-full border border-[#b8860b]"></div>
                        <span className="font-serif font-bold text-xs text-[#b8860b] text-center leading-none transform -rotate-12">
                          120h<br/>Autenticado
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {/* Signature simulation */}
                      <p className="text-3xl text-[#0f172a] transform -rotate-2 -translate-y-2 opacity-90" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Felipe Louzeiro
                      </p>
                      <div className="w-48 border-t border-[#1a1a1a] mx-auto opacity-30 mt-1"></div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-[#666]">Diretor de Ensino</p>
                    </div>
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
      {/* Welcome Onboarding Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl animate-slide-in relative overflow-hidden preserve-color">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-amber-500" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-black text-white mb-3">Bem-vindo à WebDev Pro!</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Esta é uma plataforma didática completa para você dominar o Desenvolvimento Web do zero ao FullStack.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <p className="text-sm text-slate-400"><strong className="text-slate-200">Vídeos Obrigatórios:</strong> Para avançar, você precisará dar play e assistir a pelo menos 80% do tempo dos vídeos indicados.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <span className="text-amber-400 font-bold">2</span>
                </div>
                <p className="text-sm text-slate-400"><strong className="text-slate-200">Prática em Tempo Real:</strong> Use os simuladores de HTML, PHP e Banco de Dados disponíveis no menu lateral.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-bold">3</span>
                </div>
                <p className="text-sm text-slate-400"><strong className="text-slate-200">Certificado Premium:</strong> Conclua 100% das etapas obrigatórias para emitir seu certificado.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowWelcome(false);
                localStorage.setItem('webdev_pro_welcomed', 'true');
              }}
              className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-900 font-bold text-sm hover:bg-white transition-colors"
            >
              Começar minha jornada
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
