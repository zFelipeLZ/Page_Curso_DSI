import { useState } from 'react';
import { PHPInterpreter } from '../utils/phpInterpreter';
import { Play, SkipForward, RotateCcw, Cpu, Terminal, FormInput, Server, Sparkles } from 'lucide-react';

const PHP_TEMPLATES = {
  basic: {
    name: "1. Variáveis & Condições",
    desc: "Demonstração de definição de variáveis, concatenação de strings e fluxos de controle condicional (if/else).",
    code: `<?php
$usuario = "Felipe Louzeiro";
$idade = 26;
echo "Olá, " . $usuario . "!\\n";
echo "Você tem " . $idade . " anos de idade.\\n";
if ($idade >= 18) {
    $status = "Acesso Autorizado";
    echo "Status: " . $status . "\\n";
} else {
    $status = "Menor de Idade";
    echo "Status: " . $status . "\\n";
}
?>`
  },
  loop: {
    name: "2. Estrutura de Loop (while)",
    desc: "Exemplo de como o servidor processa contagens e repetições repetitivas usando laços while.",
    code: `<?php
$contador = 1;
$limite = 3;
echo "Iniciando contagem de loop:\\n";
while ($contador <= $limite) {
    echo "Linha do relatório nº " . $contador . "\\n";
    $contador = $contador + 1;
}
echo "Loop encerrado! Total processado.";
?>`
  },
  post: {
    name: "3. Recebendo dados via $_POST",
    desc: "Simulação de como o PHP captura dados preenchidos pelo usuário em formulários HTML (Superglobal $_POST).",
    code: `<?php
$nome_cliente = $_POST["username"];
$email_cliente = $_POST["email"];
echo "--- RECEBIDO NO SERVIDOR ---\\n";
echo "Olá, " . $nome_cliente . "!\\n";
echo "Enviaremos novidades para o e-mail: " . $email_cliente . "\\n";
$processado = true;
?>`
  },
  session: {
    name: "4. Mantendo Sessão ($_SESSION)",
    desc: "Simulação de persistência de login do usuário e armazenamento de tokens de sessão (Superglobal $_SESSION).",
    code: `<?php
session_start();
$_SESSION["logged_in"] = true;
$_SESSION["user_id"] = 4321;
echo "Autenticando usuário no banco de dados...\\n";
if ($_SESSION["logged_in"] == true) {
    echo "Login efetuado! ID da sessão: " . $_SESSION["user_id"] . "\\n";
    echo "Carregando área logada...\\n";
}
?>`
  }
};

export default function PHPSimulator() {
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [phpCode, setPhpCode] = useState(PHP_TEMPLATES.basic.code);
  const [formInputs, setFormInputs] = useState({
    username: "Felipe Louzeiro",
    email: "felipe@louzeiro.dev"
  });
  
  // Interpreter state
  const [interpreter, setInterpreter] = useState(() => new PHPInterpreter(PHP_TEMPLATES.basic.code, {
    username: "Felipe Louzeiro",
    email: "felipe@louzeiro.dev"
  }));
  const [currentLine, setCurrentLine] = useState(-1);
  const [variables, setVariables] = useState({});
  const [outputBuffer, setOutputBuffer] = useState("");
  const [session, setSession] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleReset = (customCode = phpCode, customInputs = formInputs) => {
    const newInterpreter = new PHPInterpreter(customCode, customInputs);
    setInterpreter(newInterpreter);
    setCurrentLine(-1);
    setVariables({});
    setOutputBuffer("");
    setSession({});
    setIsRunning(false);
    setIsFinished(false);
  };

  const loadTemplate = (key) => {
    setSelectedTemplate(key);
    const newCode = PHP_TEMPLATES[key].code;
    setPhpCode(newCode);
    handleReset(newCode, formInputs);
  };

  const handleStep = () => {
    if (!interpreter) return;
    
    setIsRunning(true);
    const result = interpreter.step();
    
    setCurrentLine(result.currentLineIndex);
    setVariables({ ...result.variables });
    setOutputBuffer(result.outputBuffer);
    setSession({ ...result.session });
    
    if (result.finished) {
      setIsFinished(true);
      setIsRunning(false);
    }
  };

  const handleRunAll = () => {
    if (!interpreter) return;
    
    setIsRunning(true);
    let result = { finished: false };
    
    // Safety break limit to avoid infinite loops
    let limit = 1000;
    while (!result.finished && limit > 0) {
      result = interpreter.step();
      limit--;
    }
    
    setCurrentLine(-1); // Finished visual state
    setVariables({ ...result.variables });
    setOutputBuffer(result.outputBuffer);
    setSession({ ...result.session });
    setIsFinished(true);
    setIsRunning(false);
    
    if (limit === 0) {
      setOutputBuffer(prev => prev + "\n[ERRO: Tempo limite de execução excedido - Possível loop infinito detectado no servidor]");
    }
  };

  const codeLines = phpCode.split('\n');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-2xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg shrink-0">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-200">Interpretador e Debugger Visual PHP</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              O PHP é processado no servidor e o navegador só recebe o resultado final em HTML/Text. Com este debugger interativo, você pode rodar scripts PHP <strong>passo a passo (linha por linha)</strong> e assistir à memória do servidor e à saída sendo montadas em tempo real!
            </p>
          </div>
        </div>
      </div>

      {/* Top Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Object.entries(PHP_TEMPLATES).map(([key, item]) => (
          <button
            key={key}
            onClick={() => loadTemplate(key)}
            className={`
              p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-28 hover:bg-slate-900/50
              ${selectedTemplate === key 
                ? 'bg-slate-900 border-purple-500 glow-php' 
                : 'bg-slate-900/40 border-slate-800'
              }
            `}
          >
            <div>
              <h4 className={`text-xs font-bold ${selectedTemplate === key ? 'text-purple-400' : 'text-slate-300'}`}>
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight line-clamp-3">
                {item.desc}
              </p>
            </div>
            {selectedTemplate === key && (
              <span className="text-[9px] font-extrabold text-purple-400 uppercase tracking-widest flex items-center gap-1 mt-2">
                <Sparkles className="w-3 h-3 animate-spin" /> Ativo
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Simulator Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: PHP Editor Panel (xl:col-span-7) */}
        <div className="xl:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
          <div className="bg-slate-900 border-b border-slate-800/80 px-5 py-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40" />
              <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Código PHP (Editável)</h4>
            </div>

            {/* Stepping controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleStep}
                disabled={isFinished}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white text-[11px] font-extrabold rounded-lg flex items-center gap-1.5 shadow-lg shadow-purple-600/10 cursor-pointer transition-all"
                title="Executa a próxima instrução"
              >
                <SkipForward className="w-3.5 h-3.5" />
                Próxima Linha
              </button>
              <button
                onClick={handleRunAll}
                disabled={isFinished}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-[11px] font-extrabold rounded-lg flex items-center gap-1.5 shadow-lg shadow-emerald-600/10 cursor-pointer transition-all"
                title="Executa todo o arquivo de uma vez"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Executar Tudo
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-extrabold rounded-lg flex items-center gap-1.5 border border-slate-700/50 cursor-pointer transition-all"
                title="Reiniciar Simulação"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar
              </button>
            </div>
          </div>

          {/* Simulated IDE with line-gutter highlighting */}
          <div className="flex bg-slate-950/60 font-mono text-xs md:text-sm h-96 relative overflow-hidden">
            {/* Gutter Line Numbers */}
            <div className="w-12 py-4 bg-slate-950 border-r border-slate-900 text-slate-600 select-none text-right pr-3.5 space-y-[2px] leading-relaxed">
              {codeLines.map((_, idx) => (
                <div key={idx} className={`${currentLine === idx ? 'text-purple-400 font-extrabold' : ''}`}>
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Editable code text-area / Visual display overlay */}
            <div className="flex-1 relative h-full">
              {/* Highlight bar behind text */}
              {currentLine !== -1 && currentLine < codeLines.length && (
                <div 
                  className="absolute left-0 w-full bg-purple-500/10 border-l-[3px] border-purple-500 pointer-events-none transition-all duration-150 ease-out"
                  style={{ 
                    top: `${currentLine * 22 + 16}px`, 
                    height: '22px' 
                  }}
                />
              )}

              {/* Editable overlay when not running, showing styled text area */}
              <textarea
                value={phpCode}
                onChange={(e) => {
                  const newCode = e.target.value;
                  setPhpCode(newCode);
                  handleReset(newCode, formInputs);
                }}
                disabled={isRunning || isFinished}
                spellCheck="false"
                className="absolute inset-0 w-full h-full bg-transparent border-none text-slate-300 resize-none outline-none font-mono text-xs md:text-sm p-4 pt-4 leading-[22px] overflow-y-auto whitespace-pre-wrap disabled:cursor-not-allowed"
                placeholder="// Escreva seu código PHP aqui..."
              />
            </div>
          </div>
 
          {/* Emulated Request Input Panel */}
          {selectedTemplate === 'post' && (
            <div className="bg-slate-950 p-5 border-t border-slate-800/80 space-y-4">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <FormInput className="w-3.5 h-3.5 text-slate-500" />
                Valores do Formulário HTML (Enviados por $_POST)
              </span>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Input: username</label>
                  <input
                    type="text"
                    value={formInputs.username}
                    onChange={(e) => {
                      const newUsername = e.target.value;
                      setFormInputs(prev => ({ ...prev, username: newUsername }));
                      handleReset(phpCode, { ...formInputs, username: newUsername });
                    }}
                    disabled={isRunning || isFinished}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-purple-500 transition-colors disabled:opacity-40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Input: email</label>
                  <input
                    type="email"
                    value={formInputs.email}
                    onChange={(e) => {
                      const newEmail = e.target.value;
                      setFormInputs(prev => ({ ...prev, email: newEmail }));
                      handleReset(phpCode, { ...formInputs, email: newEmail });
                    }}
                    disabled={isRunning || isFinished}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-purple-500 transition-colors disabled:opacity-40"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Server Status & Screen Outputs (xl:col-span-5) */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Server Variable Memory Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-black/10 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-3">
              <Server className="w-4.5 h-4.5 text-purple-400" />
              Memória RAM do Servidor
            </h4>

            {Object.keys(variables).length === 0 && Object.keys(session).length <= 2 && (
              <div className="text-xs text-slate-500 italic py-2">
                Nenhuma variável armazenada na memória no momento. Avance linhas de código para instanciar.
              </div>
            )}

            {/* Variable table visualization */}
            {Object.keys(variables).length > 0 && (
              <div className="space-y-3">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Variáveis Locais ($):</span>
                <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
                  <table className="w-full font-mono text-[11px] text-slate-300">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-500 text-[9px] font-bold uppercase">
                        <th className="py-2.5 px-4 text-left">Nome</th>
                        <th className="py-2.5 px-4 text-left">Tipo</th>
                        <th className="py-2.5 px-4 text-left">Valor na RAM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 bg-slate-950/20">
                      {Object.entries(variables).map(([name, val]) => (
                        <tr key={name} className="hover:bg-slate-800/20">
                          <td className="py-2.5 px-4 text-purple-400 font-bold">${name}</td>
                          <td className="py-2.5 px-4 text-slate-500 text-[10px] uppercase font-semibold">
                            {Array.isArray(val) ? 'Array' : typeof val}
                          </td>
                          <td className="py-2.5 px-4 text-emerald-400 font-semibold truncate max-w-[150px]">
                            {JSON.stringify(val)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Session data visualization */}
            {Object.keys(session).some(k => k !== 'logged_in' && k !== 'user_id' || session[k] !== false && session[k] !== null) && (
              <div className="space-y-3 pt-2">
                <span className="text-[9px] font-extrabold text-purple-400 uppercase tracking-wider block">Dados da Sessão Activa ($_SESSION):</span>
                <div className="overflow-x-auto border border-purple-900/30 rounded-xl">
                  <table className="w-full font-mono text-[11px] text-slate-300">
                    <thead>
                      <tr className="bg-purple-950/20 border-b border-purple-900/30 text-purple-400 text-[9px] font-bold uppercase">
                        <th className="py-2.5 px-4 text-left">Chave</th>
                        <th className="py-2.5 px-4 text-left">Valor Guardado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/10 bg-purple-950/5">
                      {Object.entries(session).map(([key, val]) => (
                        <tr key={key} className="hover:bg-purple-950/10">
                          <td className="py-2.5 px-4 text-purple-300">$_SESSION["{key}"]</td>
                          <td className="py-2.5 px-4 text-emerald-400 font-bold">{JSON.stringify(val)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Output Buffer Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-64 shadow-xl">
            <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between text-xs text-slate-400 font-bold select-none">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Retorno do Servidor (Output Buffer)
              </span>
              {isFinished && (
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase font-extrabold">
                  Completo
                </span>
              )}
            </div>

            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 flex flex-col justify-start">
              {outputBuffer === "" ? (
                <div className="text-slate-600 italic">Nenhuma saída gerada ainda. Avance uma linha de código que chame "echo".</div>
              ) : (
                <pre className="text-slate-300 break-all whitespace-pre-wrap leading-relaxed">{outputBuffer}</pre>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
