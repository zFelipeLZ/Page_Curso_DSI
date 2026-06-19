import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldCheck, Users, Bell, Search, Send, Loader2, CheckCircle2, User as UserIcon, FileArchive, Download, MessageSquare, RefreshCw, Trash2, Key, Sparkles } from 'lucide-react';
import { STAGES } from '../data/lessonsData';

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('students'); // 'students' or 'notifications'
  
  // Tab 1: Students
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Tab 3: Submissions
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submittingGrade, setSubmittingGrade] = useState(false);
  
  // Tab 2: Notifications
  const [notifType, setNotifType] = useState('global'); // 'global' or 'private'
  const [selectedUser, setSelectedUser] = useState('');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [sendingNotif, setSendingNotif] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Tab 4: Invite Keys
  const [inviteKeys, setInviteKeys] = useState([]);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [generatingKey, setGeneratingKey] = useState(false);

  const totalRequiredLessons = STAGES.filter(s => !s.optional).flatMap(s => s.lessons).length;

  const fetchStudents = useCallback(async () => {
    setLoadingStudents(true);
    try {
      const { data: profiles, error: profileErr } = await supabase.from('profiles').select('*').eq('role', 'student');
      if (profileErr) throw profileErr;

      const { data: progresses, error: progErr } = await supabase.from('user_progress').select('user_id, completed_lessons');
      if (progErr) throw progErr;

      const combined = (profiles || []).map(p => {
        const prog = progresses?.find(pr => pr.user_id === p.id);
        const completedCount = prog?.completed_lessons?.length || 0;
        const pct = Math.round((completedCount / totalRequiredLessons) * 100);
        return { ...p, completedCount, pct: Math.min(pct, 100) };
      });

      combined.sort((a, b) => b.pct - a.pct);
      setStudents(combined);
    } catch (err) {
      console.error('Erro ao buscar alunos:', err);
    } finally {
      setLoadingStudents(false);
    }
  }, [totalRequiredLessons]);

  const fetchSubmissions = useCallback(async () => {
    setLoadingSubs(true);
    try {
      const { data: subsData, error: subsErr } = await supabase
        .from('project_submissions')
        .select('*');
      if (subsErr) throw subsErr;

      // Busca perfis para pegar o e-mail
      const { data: profilesData } = await supabase.from('profiles').select('id, email');
      
      const combinedSubs = (subsData || []).map(sub => {
        const profile = (profilesData || []).find(p => p.id === sub.user_id);
        return { ...sub, profiles: { email: profile?.email || 'Usuário Desconhecido' } };
      });

      const sorted = combinedSubs.sort((a, b) => {
        if (a.status === 'pendente' && b.status !== 'pendente') return -1;
        if (a.status !== 'pendente' && b.status === 'pendente') return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setSubmissions(sorted);
    } catch (err) {
      console.error('Erro ao buscar submissões:', err);
    } finally {
      setLoadingSubs(false);
    }
  }, []);

  const handleRefresh = () => {
    if (activeTab === 'students') fetchStudents();
    if (activeTab === 'submissions') fetchSubmissions();
    if (activeTab === 'invites') fetchKeys();
  };

  const handleResetStudent = async (studentId, studentEmail) => {
    if (!window.confirm(`Tem certeza que deseja RESETAR todo o progresso do aluno ${studentEmail}? Isso apagará as aulas concluídas e os projetos enviados dele.`)) {
      return;
    }
    try {
      const { data: d1, error: err1 } = await supabase.from('user_progress').update({ completed_lessons: [] }).eq('user_id', studentId).select();
      if (err1 || !d1 || d1.length === 0) {
        console.warn('Update failed or RLS blocked. Attempting delete...');
        const { data: dDelete, error: errDelete } = await supabase.from('user_progress').delete().eq('user_id', studentId).select();
        if (errDelete || !dDelete || dDelete.length === 0) {
           console.error("Falha total ao resetar user_progress. Provavelmente falta a política de DELETE/UPDATE para administradores no banco de dados.");
           alert("ATENÇÃO: O banco de dados (Supabase) bloqueou a ação. Você precisa ir no painel do Supabase > Authentication > Policies e habilitar o UPDATE e DELETE na tabela 'user_progress' para administradores.");
        }
      }
      
      const { data: d2, error: err2 } = await supabase.from('project_submissions').delete().eq('user_id', studentId).select();
      if (err2 || !d2 || d2.length === 0) {
        console.warn('Delete submissions failed or RLS blocked. Attempting update...');
        await supabase.from('project_submissions').update({ status: 'pendente', file_url: null, feedback: null, grade: null }).eq('user_id', studentId);
      }

      alert('Progresso resetado com sucesso!');
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Erro ao resetar progresso.');
    }
  };

  const fetchKeys = useCallback(async () => {
    setLoadingKeys(true);
    try {
      const { data, error } = await supabase.from('invite_keys').select('*').order('created_at', { ascending: false });
      if (error) {
        if (error.code === '42P01') {
          // Tabela não existe, apenas ignora
          setInviteKeys([]);
          return;
        }
        throw error;
      }
      setInviteKeys(data || []);
    } catch (err) {
      console.error('Erro ao buscar chaves:', err);
    } finally {
      setLoadingKeys(false);
    }
  }, []);

  const handleGenerateKey = async () => {
    setGeneratingKey(true);
    try {
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newKey = `INVITE-${randomPart}`;
      
      const { error } = await supabase.from('invite_keys').insert({
        key_code: newKey,
        is_used: false
      });
      
      if (error) throw error;
      
      await fetchKeys();
      alert(`Chave gerada com sucesso: ${newKey}`);
    } catch (err) {
      console.error('Erro ao gerar chave:', err);
      alert('Erro ao gerar chave. Verifique se a tabela "invite_keys" foi criada no Supabase e se o RLS permite INSERT.');
    } finally {
      setGeneratingKey(false);
    }
  };

  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchStudents();
    fetchSubmissions();
    fetchKeys();
  }, [user, fetchStudents, fetchSubmissions, fetchKeys]);

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

  const handleEvaluate = async (status) => {
    if (!selectedSub) return;
    if (status === 'reprovado' && !feedback.trim()) {
      alert('Para reprovar, é necessário enviar um feedback orientando o aluno.');
      return;
    }

    setSubmittingGrade(true);
    try {
      const { error } = await supabase
        .from('project_submissions')
        .update({ status, grade: grade || null, feedback })
        .eq('id', selectedSub.id);

      if (error) throw error;

      // Atualiza estado local
      setSubmissions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status, grade, feedback } : s));
      setSelectedSub(null);
      setGrade('');
      setFeedback('');
    } catch (err) {
      console.error('Erro ao avaliar:', err);
      alert('Erro ao salvar avaliação.');
    } finally {
      setSubmittingGrade(false);
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
            <p className="text-slate-400 text-sm">Gerencie o progresso dos alunos e avalie projetos.</p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('switch-view', { detail: 'dashboard' }))}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl text-sm font-bold transition-colors"
          >
            <Search className="w-4 h-4" /> Visualizar Aulas
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 mb-6">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'students' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Users className="w-4 h-4" /> Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'submissions' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <FileArchive className="w-4 h-4" /> Avaliações Pendentes
            {submissions.filter(s => s.status === 'pendente').length > 0 && (
              <span className="ml-1 bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{submissions.filter(s => s.status === 'pendente').length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'notifications' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Bell className="w-4 h-4" /> Central de Notificações
          </button>
          <button
            onClick={() => setActiveTab('invites')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'invites' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Key className="w-4 h-4" /> Chaves de Acesso
          </button>
          
          <button
            onClick={handleRefresh}
            className="ml-auto px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Atualizar Dados
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
                      <th className="py-3 px-4 text-center">Data de Inscrição</th>
                      <th className="py-3 px-4 text-right">Ações</th>
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
                        <td className="py-3 px-4 text-center text-xs text-slate-500">
                          {new Date(st.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleResetStudent(st.id, st.email)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded transition-colors border border-red-500/20"
                            title="Resetar progresso e avaliações deste aluno"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Resetar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Submissions */}
        {activeTab === 'submissions' && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-6 items-start">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">Projetos Recebidos</h3>
              {loadingSubs ? (
                <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" /></div>
              ) : submissions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm border border-slate-800 rounded-xl">Nenhuma submissão recebida.</div>
              ) : (
                <div className="space-y-1">
                  {Object.entries(
                    submissions.reduce((acc, sub) => {
                      const email = sub.profiles?.email || 'Aluno Desconhecido';
                      if (!acc[email]) acc[email] = [];
                      acc[email].push(sub);
                      return acc;
                    }, {})
                  ).map(([email, userSubs]) => (
                    <div key={email} className="mb-6 last:mb-0">
                      <h4 className="text-sm font-bold text-slate-300 mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-emerald-400" /> {email}
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{userSubs.length} envio(s)</span>
                      </h4>
                      <div className="space-y-3 pl-2 border-l-2 border-slate-800/60">
                        {userSubs.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSub(sub)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSub?.id === sub.id ? 'bg-slate-800 border-emerald-500/50 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{sub.stage_id}</span>
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${sub.status === 'pendente' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : sub.status === 'aprovado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                                {sub.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1"><FileArchive className="w-3 h-3" /> {sub.file_name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Painel de Avaliação do Projeto Selecionado */}
            {selectedSub ? (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sticky top-24">
                <h4 className="text-sm font-black text-slate-200 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" /> Avaliar Projeto
                </h4>
                
                <a href={selectedSub.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-sm border border-emerald-500/30 rounded-xl mb-6 transition-colors">
                  <Download className="w-4 h-4" /> Baixar Arquivo .zip
                </a>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nota (Opcional)</label>
                    <input type="number" min="0" max="100" placeholder="Ex: 100" value={grade} onChange={e => setGrade(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Feedback para o Aluno</label>
                    <textarea rows="4" placeholder="Escreva o feedback aqui..." value={feedback} onChange={e => setFeedback(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 resize-none" />
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => handleEvaluate('reprovado')} disabled={submittingGrade} className="flex-1 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold rounded-xl border border-rose-500/30 text-xs transition-colors">
                      Reprovar
                    </button>
                    <button onClick={() => handleEvaluate('aprovado')} disabled={submittingGrade} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20">
                      Aprovar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-col items-center justify-center p-8 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl text-slate-500 text-center sticky top-24">
                <FileArchive className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm font-semibold">Selecione um projeto ao lado para avaliá-lo.</p>
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

        {/* Tab Content: Invites */}
        {activeTab === 'invites' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/30 p-5 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Chaves de Acesso (Visitantes)</h3>
                <p className="text-slate-400 text-sm">Gere chaves para permitir o cadastro de usuários com e-mails não institucionais.</p>
              </div>
              <button
                onClick={handleGenerateKey}
                disabled={generatingKey}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50"
              >
                {generatingKey ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                Gerar Nova Chave
              </button>
            </div>

            {loadingKeys ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-sm font-medium">Carregando chaves...</p>
              </div>
            ) : inviteKeys.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                <Key className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <h3 className="text-slate-300 font-bold">Nenhuma chave gerada</h3>
                <p className="text-slate-500 text-sm mt-1">Gere uma chave para convidar visitantes para a plataforma.</p>
              </div>
            ) : (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/50 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Código da Chave</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Utilizado por</th>
                      <th className="px-6 py-4 font-semibold">Data de Criação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {inviteKeys.map(k => (
                      <tr key={k.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-200">{k.key_code}</td>
                        <td className="px-6 py-4">
                          {k.is_used ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Utilizada
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Sparkles className="w-3.5 h-3.5" /> Pendente
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-400">{k.used_by_email || '-'}</td>
                        <td className="px-6 py-4 text-slate-500">{new Date(k.created_at).toLocaleDateString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
