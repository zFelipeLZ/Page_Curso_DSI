import { Menu, BookOpen, ChevronRight, Search, Bell, Moon, Sun, User, LogOut } from 'lucide-react';
import { STAGES } from '../data/lessonsData';

const VIEW_TITLES = {
  dashboard:      { label: 'Jornada de Aprendizado', sub: 'Visão geral das suas etapas' },
  playground:     { label: 'Playground Frontend', sub: 'Teste HTML, CSS e JS em tempo real' },
  'php-simulator':{ label: 'Simulador PHP', sub: 'Execute código PHP no navegador' },
  'db-simulator': { label: 'Simulador SQL', sub: 'Pratique consultas ao banco de dados' },
  cheatsheet:     { label: 'Guia de Consulta Rápida', sub: 'Referências e cheatsheets' },
};

export default function Header({ activeView, currentStage, setSidebarOpen, isLightMode, setIsLightMode, user, onLogout }) {
  const stage = activeView === 'stage' ? STAGES.find(s => s.id === currentStage) : null;

  const title = stage
    ? stage.title
    : VIEW_TITLES[activeView]?.label || 'WebDev Pro';

  const sub = stage
    ? `Etapa ${stage.stageNumber} · ${stage.tech} · ${stage.level}`
    : VIEW_TITLES[activeView]?.sub || '';

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-5 lg:px-8 shrink-0">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-slate-400 hover:text-slate-200 p-1.5 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb-style header */}
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
          {sub && (
            <p className="text-[11px] text-slate-600 font-medium truncate">{sub}</p>
          )}
        </div>

        {/* Search Bar (Placeholder) */}
        <div className="hidden lg:flex items-center max-w-sm w-full ml-auto mr-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3" />
          <input 
            type="text" 
            placeholder="Buscar lições, ferramentas..." 
            className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all placeholder:text-slate-600"
          />
          <div className="absolute right-2 px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-bold text-slate-400 uppercase">
            Ctrl K
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsLightMode(!isLightMode)}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors preserve-color"
          title="Alternar Tema"
        >
          {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <button className="relative w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-slate-950"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-800 mx-1"></div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-3 ml-2">
          <div className="flex items-center gap-2">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-slate-200 truncate max-w-[120px]">
                {user?.email?.split('@')[0] || 'Aluno IF'}
              </p>
              <p className="text-[10px] text-slate-500">Estudante PRO</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-slate-800 preserve-color shadow-inner text-white font-bold text-xs uppercase">
              {user?.email?.[0] || 'A'}
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            title="Sair da Conta"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
