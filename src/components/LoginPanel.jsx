import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, GraduationCap, Mail, Lock, ArrowRight, Loader2, ShieldCheck, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginPanel() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isVisitor, setIsVisitor] = useState(false);
  const [inviteKey, setInviteKey] = useState('');
  
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();

    // Regra de Ouro: Restrição do domínio institucional (a menos que seja visitante no momento do cadastro)
    if (isSignUp && !isVisitor && !cleanEmail.endsWith('@aluno.ifsertao-pe.edu.br')) {
      setStatus('error');
      setErrorMessage('Apenas e-mails institucionais oficiais (@aluno.ifsertao-pe.edu.br) têm acesso à plataforma, a não ser que você seja um visitante com chave.');
      return;
    }

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('As senhas não coincidem. Digite novamente.');
        }
        if (password.length < 6) {
          throw new Error('A senha deve ter pelo menos 6 caracteres.');
        }

        if (isVisitor) {
          if (!inviteKey.trim()) {
            throw new Error('Você precisa informar uma Chave de Acesso para se cadastrar como visitante.');
          }

          // Verificar chave no Supabase
          const { data: keyData, error: keyErr } = await supabase
            .from('invite_keys')
            .select('*')
            .eq('key_code', inviteKey.trim())
            .single();

          if (keyErr || !keyData) {
            throw new Error('Chave de Acesso inválida ou não encontrada.');
          }

          if (keyData.is_used) {
            throw new Error('Esta Chave de Acesso já foi utilizada por outro usuário.');
          }
        }

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
        });

        if (error) throw error;

        // Se for visitante, queima a chave
        if (isVisitor && data.user) {
          await supabase
            .from('invite_keys')
            .update({ is_used: true, used_by_email: cleanEmail })
            .eq('key_code', inviteKey.trim());
        }
        
        // Se a configuração de confirmação de e-mail estiver ativa no Supabase:
        if (data.user && data.user.identities && data.user.identities.length === 0) {
           throw new Error('Este e-mail já está cadastrado. Tente fazer login.');
        }

        setStatus('success');
      } else {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('E-mail ou senha incorretos.');
          }
          if (error.message.includes('Email not confirmed')) {
            throw new Error('Você precisa confirmar seu e-mail clicando no link que enviamos antes de fazer login.');
          }
          throw error;
        }
        // Se sucesso, o listener global do App.jsx assume e troca a tela automaticamente!
      }
    } catch (error) {
      console.error('Auth error:', error.message);
      setStatus('error');
      setErrorMessage(error.message === 'Failed to fetch' 
        ? 'Erro de conexão. Verifique se configurou o Banco de Dados (Supabase URL).' 
        : error.message);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setStatus('idle');
    setErrorMessage('');
    setPassword('');
    setConfirmPassword('');
    setIsVisitor(false);
    setInviteKey('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-10 relative group">
          {/* Efeito Glow Suave para realçar o PNG transparente */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-rose-500/20 blur-3xl group-hover:opacity-100 opacity-60 transition-opacity duration-700 rounded-full max-w-[180px] mx-auto" />
          
          <img src="/logo.png" alt="WebDev Pro" className="relative z-10 w-full max-w-[180px] h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          
          <div className="flex flex-col items-center gap-2 mb-6 text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl text-center">
            <ShieldCheck className="w-5 h-5 shrink-0 mb-1" />
            <span>Acesso Restrito IF-Sertão PE</span>
          </div>

          {status === 'success' && isSignUp ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Conta Criada!</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Enviamos um <strong>Link de Confirmação</strong> para <br/>
                <span className="text-slate-200">{email}</span><br/><br/>
                Por favor, acesse seu e-mail e clique no link para ativar a conta antes de entrar.
              </p>
              <button 
                onClick={toggleMode}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-3.5 px-4 font-bold transition-colors"
              >
                Já confirmei, quero fazer Login
              </button>
            </div>
          ) : (
            <>
              {/* Abas */}
              <div className="flex bg-slate-950/50 rounded-xl p-1 mb-6 border border-slate-800">
                <button
                  onClick={() => { if(isSignUp) toggleMode(); }}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${!isSignUp ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <LogIn className="w-4 h-4" /> Entrar
                </button>
                <button
                  onClick={() => { if(!isSignUp) toggleMode(); }}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${isSignUp ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <UserPlus className="w-4 h-4" /> Cadastrar
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="flex items-center gap-2 mb-4">
                    <input 
                      type="checkbox" 
                      id="visitor-check" 
                      checked={isVisitor}
                      onChange={(e) => setIsVisitor(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-rose-500 focus:ring-rose-500"
                    />
                    <label htmlFor="visitor-check" className="text-xs font-bold text-slate-300 cursor-pointer">
                      Sou Visitante (Possuo Chave de Acesso)
                    </label>
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 ml-1">
                    {isVisitor ? 'E-mail' : 'E-mail Institucional'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isVisitor ? "seu.email@exemplo.com" : "@aluno.ifsertao-pe.edu.br"}
                      className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600 font-medium text-sm"
                    />
                  </div>
                </div>

                {isSignUp && isVisitor && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-400 ml-1 text-rose-400">Chave de Acesso</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-rose-500/50" />
                      </div>
                      <input
                        type="text"
                        required
                        value={inviteKey}
                        onChange={(e) => setInviteKey(e.target.value)}
                        placeholder="Ex: INVITE-XXXX"
                        className="w-full bg-rose-500/5 border border-rose-500/30 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600 font-medium text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 ml-1">Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha secreta"
                      className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600 font-medium text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-400 ml-1">Confirmar Senha</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-slate-500" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita a senha"
                        className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-slate-600 font-medium text-sm"
                      />
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 mt-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold animate-fade-in leading-relaxed">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-6 bg-slate-100 hover:bg-white text-slate-900 rounded-xl py-3.5 px-4 font-bold transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
                  ) : (
                    <>
                      {isSignUp ? 'Criar Nova Conta' : 'Acessar Plataforma'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-xs text-slate-500 mt-6 font-medium">
            Do Zero ao CRUD Funcional<br/>
            Segurança e Sincronização em Nuvem<br/>Powered by Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
