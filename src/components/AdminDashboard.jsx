import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldCheck, Users, Bell, Search, Send, Loader2, CheckCircle2, User as UserIcon } from 'lucide-react';
import { STAGES } from '../data/lessonsData';

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('students'); // 'students' or 'notifications'
  
  // Tab 1: Students
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  
  // Tab 2: Notifications
  const [notifType, setNotifType] = useState('global'); // 'global' or 'private'
  const [selectedUser, setSelectedUser] = useState('');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [sendingNotif, setSendingNotif] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState(false);

  const totalRequiredLessons = STAGES.filter(s => !s.optional).flatMap(s => s.lessons).length;

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const fetchStudents = async () => {
      setLoadingStudents(true);
      try {
        // Fetch profiles
        const { data: profiles, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'student');

        if (profileErr) throw profileErr;

        // Fetch progress for these profiles
        const { data: progresses, error: progErr } = await supabase
          .from('user_progress')
          .select('user_id, completed_lessons');

        if (progErr) throw progErr;

        const combined = (profiles || []).map(p => {
          const prog = progresses?.find(pr => pr.user_id === p.id);
          const completedCount = prog?.completed_lessons?.length || 0;
          const pct = Math.round((completedCount / totalRequiredLessons) * 100);
          return {
            ...p,
            completedCount,
            pct: Math.min(pct, 100)
          };
        });

        // Ordenar por progresso desc
        combined.sort((a, b) => b.pct - a.pct);
        setStudents(combined);
      } catch (err) {
        console.error('Erro ao buscar alunos:', err);
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [user, totalRequiredLessons]);

  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (!notifTitle || !notifMessage) return;
    if (notifType === 'private' && !selectedUser) return;

    setSendingNotif(true);
    setNotifSuccess(false);

    try {
      const { error } = await supabase.from('notifications').insert({
        type: notifType,
        user_id: notifType === 'private' ? selectedUser : null,
        title: notifTitle,
        message: notifMessage
      });

      if (error) throw error;

      setNotifSuccess(true);
      setNotifTitle('');
      setNotifMessage('');
      setTimeout(() => setNotifSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao enviar notificação:', err);
      alert('Erro ao enviar notificação. Verifique o console.');
    } finally {
      setSendingNotif(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <ShieldCheck className="w-16 h-16 mb-4 opacity-50 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-200">Acesso Restrito</h2>
        <p className="text-sm mt-2">Você não tem permissão para visualizar esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Painel do Administrador</h1>
            <p className="text-slate-400 text-sm">Gerencie o progresso dos alunos e envie notificações gerais.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 mb-6">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'students' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Users className="w-4 h-4" /> Visão Geral dos Alunos
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'notifications' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Bell className="w-4 h-4" /> Central de Notificações
          </button>
        </div>

        {/* Tab Content: Students */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            {loadingStudents ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500 mb-2" />
                <p className="text-sm font-bold">Carregando dados dos alunos...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
                Nenhum aluno registrado no momento.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/60 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Aluno (E-mail)</th>
                      <th className="py-3 px-4 text-center">Progresso (%)</th>
                      <th className="py-3 px-4 text-center">Lições Feitas</th>
                      <th className="py-3 px-4 text-right">Data de Inscrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {students.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                              <UserIcon className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="text-sm font-semibold text-slate-200">{st.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${st.pct}%` }} />
                            </div>
                            <span className="text-xs font-bold text-slate-300">{st.pct}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center text-sm text-slate-400">
                          {st.completedCount} / {totalRequiredLessons}
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-slate-500">
                          {new Date(st.created_at).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Notifications */}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl bg-slate-950/50 border border-slate-800/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Enviar Novo Aviso</h3>
            
            {notifSuccess && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Notificação enviada com sucesso!
              </div>
            )}

            <form onSubmit={handleSendNotification} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Envio</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={notifType === 'global'} onChange={() => setNotifType('global')} className="accent-rose-500" />
                    <span className="text-sm text-slate-300 font-semibold">Global (Todos os Alunos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={notifType === 'private'} onChange={() => setNotifType('private')} className="accent-rose-500" />
                    <span className="text-sm text-slate-300 font-semibold">Mensagem Privada</span>
                  </label>
                </div>
              </div>

              {notifType === 'private' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selecionar Aluno</label>
                  <select 
                    value={selectedUser} 
                    onChange={e => setSelectedUser(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
                  >
                    <option value="">Selecione um aluno...</option>
                    {students.map(st => (
                      <option key={st.id} value={st.id}>{st.email}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Título do Aviso</label>
                <input 
                  type="text" 
                  value={notifTitle}
                  onChange={e => setNotifTitle(e.target.value)}
                  placeholder="Ex: Nova Aula Liberada"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mensagem</label>
                <textarea 
                  rows="4"
                  value={notifMessage}
                  onChange={e => setNotifMessage(e.target.value)}
                  placeholder="Digite o conteúdo do aviso..."
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sendingNotif}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all disabled:opacity-50"
                >
                  {sendingNotif ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {sendingNotif ? 'Enviando...' : 'Disparar Notificação'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
