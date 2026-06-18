import { useState, useEffect, useRef } from 'react';
import { Menu, BookOpen, ChevronRight, Search, Bell, Moon, Sun, LogOut, CheckCircle2 } from 'lucide-react';
import { STAGES } from '../data/lessonsData';
import { supabase } from '../lib/supabase';

const VIEW_TITLES = {
  dashboard:      { label: 'Jornada de Aprendizado', sub: 'Visão geral das suas etapas' },
  playground:     { label: 'Playground Frontend', sub: 'Teste HTML, CSS e JS em tempo real' },
  'php-simulator':{ label: 'Simulador PHP', sub: 'Execute código PHP no navegador' },
  'db-simulator': { label: 'Simulador SQL', sub: 'Pratique consultas ao banco de dados' },
  cheatsheet:     { label: 'Guia de Consulta Rápida', sub: 'Referências e cheatsheets' },
  'admin-dashboard':{ label: 'Painel Admin', sub: 'Gerenciamento da plataforma' }
};

export default function Header({ activeView, currentStage, setSidebarOpen, isLightMode, setIsLightMode, user, onLogout, onOpenStage, onSwitchView }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const searchRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [showNotifDrop, setShowNotifDrop] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const notifRef = useRef(null);

  const stage = activeView === 'stage' ? STAGES.find(s => s.id === currentStage) : null;
  const title = stage ? stage.title : VIEW_TITLES[activeView]?.label || 'WebDev Pro';
  const sub = stage ? `Etapa ${stage.stageNumber} · ${stage.tech} · ${stage.level}` : VIEW_TITLES[activeView]?.sub || '';

  // Handle Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = [];
    
    STAGES.forEach(st => {
      st.lessons.forEach(l => {
        if (l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)) {
          results.push({ stageId: st.id, stageTitle: st.title, lesson: l });
        }
      });
    });
    setSearchResults(results.slice(0, 5));
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchDrop(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifDrop(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (stageId) => {
    setShowSearchDrop(false);
    setSearchQuery('');
    onOpenStage(stageId);
  };

  // Fetch Notifications
  useEffect(() => {
    if (!user) return;
    
    const fetchNotifs = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .or(`user_id.is.null,user_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        setNotifications(data || []);
      } catch (err) {
        console.error('Erro ao buscar notificações', err);
      }
    };
    
    fetchNotifs();
    
    // Configura polling simples para notificações (opcional, pode ser substituído por realtime)
    const interval = setInterval(fetchNotifs, 30000); // 30s
    return () => clearInterval(interval);
  }, [user]);

  const getUnreadCount = () => {
    const readList = JSON.parse(localStorage.getItem(`read_notifs_${user?.id}`) || '[]');
    return notifications.filter(n => !readList.includes(n.id)).length;
  };
  const unreadCount = getUnreadCount();

  const handleOpenNotifDrop = () => {
    setShowNotifDrop(!showNotifDrop);
    setShowSearchDrop(false);
  };

  const handleReadNotif = (notif) => {
    setSelectedNotif(notif);
    setShowNotifDrop(false);
    const readList = JSON.parse(localStorage.getItem(`read_notifs_${user?.id}`) || '[]');
    if (!readList.includes(notif.id)) {
      readList.push(notif.id);
      localStorage.setItem(`read_notifs_${user?.id}`, JSON.stringify(readList));
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-5 lg:px-8 shrink-0">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-slate-200 p-1.5 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0 hidden sm:block">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-0.5">
              <BookOpen className="w-3 h-3 shrink-0" />
              <span className="truncate">WebDev Pro</span>
              {activeView !== 'dashboard' && (
                <>
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  <span className="truncate text-slate-400">{title}</span>
                </>
              )}
            </div>
            {sub && <p className="text-[11px] text-slate-600 font-medium truncate">{sub}</p>}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="hidden lg:flex items-center max-w-sm w-full ml-auto mr-8 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDrop(true); }}
              onFocus={() => setShowSearchDrop(true)}
              placeholder="Buscar lições, ferramentas..." 
              className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all placeholder:text-slate-600"
            />
            {showSearchDrop && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <ul className="max-h-64 overflow-y-auto py-2">
                    {searchResults.map((res, i) => (
                      <li key={i}>
                        <button 
                          onClick={() => handleSelectResult(res.stageId)}
                          className="w-full text-left px-4 py-3 hover:bg-slate-800/80 border-b border-slate-800/40 last:border-0 transition-colors"
                        >
                          <p className="text-sm font-bold text-slate-200">{res.lesson.title}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{res.stageTitle}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">Nenhum resultado encontrado.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 shrink-0">
          
          <button 
            onClick={() => setIsLightMode(!isLightMode)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors preserve-color"
            title="Alternar Tema"
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button 
              onClick={handleOpenNotifDrop}
              className="relative w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border border-slate-950 flex items-center justify-center">
                  {/* Ponto vermelho apenas */}
                </span>
              )}
            </button>

            {showNotifDrop && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <span className="text-sm font-bold text-slate-200">Notificações</span>
                  {unreadCount > 0 && <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">{unreadCount} novas</span>}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <ul className="divide-y divide-slate-800/50">
                      {notifications.map(n => {
                        const isRead = JSON.parse(localStorage.getItem(`read_notifs_${user?.id}`) || '[]').includes(n.id);
                        return (
                          <li key={n.id}>
                            <button onClick={() => handleReadNotif(n)} className={`w-full text-left px-4 py-3 hover:bg-slate-800/50 transition-colors ${!isRead ? 'bg-slate-800/20' : ''}`}>
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-xs font-bold ${!isRead ? 'text-slate-200' : 'text-slate-400'}`}>{n.title}</p>
                                {!isRead && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />}
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{n.message}</p>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-500">
                      Você não tem novas notificações.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-slate-800 mx-1"></div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3 ml-2">
            <div className="flex items-center gap-2">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-200 truncate max-w-[120px]">
                  {user?.email?.split('@')[0] || 'Aluno IF'}
                </p>
                <p className="text-[10px] text-slate-500">{user?.role === 'admin' ? 'Administrador' : 'Estudante PRO'}</p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 preserve-color shadow-inner text-white font-bold text-xs uppercase ${user?.role === 'admin' ? 'bg-gradient-to-br from-rose-500 to-orange-500 border-rose-500/30' : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-slate-800'}`}>
                {user?.email?.[0] || 'A'}
              </div>
            </div>

            <button 
              onClick={onLogout}
              title="Sair da Conta"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Modal */}
      {selectedNotif && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="bg-slate-800/50 border-b border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-slate-200 text-sm">Aviso do Sistema</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-black text-white">{selectedNotif.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedNotif.message}</p>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
              <button 
                onClick={() => setSelectedNotif(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
