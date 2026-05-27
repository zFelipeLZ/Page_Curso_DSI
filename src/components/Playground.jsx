import { useState, useEffect, useRef } from 'react';
import { Play, Download, Terminal, Layers, Code2, Globe } from 'lucide-react';
import JSZip from 'jszip';

const TEMPLATES = {
  hello: {
    html: `<!-- Bem-vindo ao Laboratório Frontend! -->
<div class="boas-vindas">
    <h1>Olá, Mundo! 🌍</h1>
    <p>Este é o seu Playground interativo. Você pode alterar qualquer código à esquerda e clicar em "Rodar Código".</p>
    <button class="botao-animado" onclick="saudacao()">Clique Aqui!</button>
</div>`,
    css: `body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
}

.boas-vindas {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.botao-animado {
    background-color: #10b981;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.botao-animado:hover {
    background-color: #059669;
    transform: scale(1.05);
}`,
    js: `// Função de saudação interativa
function saudacao() {
    console.log("O botão foi clicado com sucesso!");
    alert("Parabéns! Você executou sua primeira lógica com JS no Playground!");
}`
  },
  card: {
    html: `<div class="glass-card">
    <div class="perfil-imagem">FL</div>
    <h2>Felipe Louzeiro</h2>
    <p class="titulo">Estudante de Web Development</p>
    <p class="bio">Criando designs modernos, responsivos e interativos usando HTML5 semântico, CSS3 flexível e lógicas JavaScript.</p>
    <div class="habilidades">
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>PHP</span>
    </div>
</div>`,
    css: `body {
    background-color: #0f172a;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    width: 320px;
    text-align: center;
    color: white;
    backdrop-filter: blur(12px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
}

.perfil-imagem {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3b82f6, #10b981);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto 20px auto;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

h2 {
    margin: 10px 0 5px 0;
    font-size: 22px;
}

.titulo {
    color: #3b82f6;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
}

.bio {
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 20px;
}

.habilidades {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
}

.habilidades span {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
}` ,
    js: `console.log("Card de Glassmorphism carregado no Playground.");`
  },
  counter: {
    html: `<div class="contador-wrapper">
    <h2>Contador de Cliques</h2>
    <div class="valor-display" id="contador-valor">0</div>
    <div class="controles">
        <button id="btn-subtrair">- Subtrair</button>
        <button id="btn-adicionar">+ Adicionar</button>
    </div>
    <p id="contador-status">Contagem zerada</p>
</div>`,
    css: `body {
    background: #111827;
    color: white;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.contador-wrapper {
    background: #1f2937;
    border: 1px solid #374151;
    border-radius: 16px;
    padding: 30px;
    width: 280px;
    text-align: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

h2 {
    margin-top: 0;
    font-size: 20px;
    color: #f3f4f6;
}

.valor-display {
    font-size: 72px;
    font-weight: 800;
    margin: 20px 0;
    color: #10b981;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
    transition: transform 0.1s ease;
    display: inline-block;
}

.controles {
    display: flex;
    gap: 12px;
}

button {
    flex: 1;
    background-color: #374151;
    color: white;
    border: 1px solid #4b5563;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}

button:hover {
    background-color: #4b5563;
}

#btn-adicionar:hover {
    background-color: #10b981;
    border-color: #10b981;
}

#btn-subtrair:hover {
    background-color: #ef4444;
    border-color: #ef4444;
}

p {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 15px;
    margin-bottom: 0;
}`,
    js: `// Inicializa a contagem
let contagem = 0;

const display = document.getElementById('contador-valor');
const statusText = document.getElementById('contador-status');
const btnAdd = document.getElementById('btn-adicionar');
const btnSub = document.getElementById('btn-subtrair');

function atualizarInterface() {
    display.innerText = contagem;
    
    if (contagem > 0) {
        display.style.color = "#10b981";
        statusText.innerText = "Contagem em alta positiva!";
    } else if (contagem < 0) {
        display.style.color = "#ef4444";
        statusText.innerText = "Contagem em saldo negativo.";
    } else {
        display.style.color = "#f59e0b";
        statusText.innerText = "Contagem zerada.";
    }
}

btnAdd.addEventListener('click', () => {
    contagem++;
    console.log("Contador somado. Novo valor: " + contagem);
    atualizarInterface();
});

btnSub.addEventListener('click', () => {
    contagem--;
    console.log("Contador subtraído. Novo valor: " + contagem);
    atualizarInterface();
});`
  }
};

export default function Playground() {
  const [activeTab, setActiveTab] = useState('html');
  const [code, setCode] = useState({
    html: TEMPLATES.hello.html,
    css: TEMPLATES.hello.css,
    js: TEMPLATES.hello.js
  });
  const [logs, setLogs] = useState(() => [{
    id: 'init',
    method: 'info',
    text: 'Modelo "hello" carregado no Sandbox. Altere e clique em "Rodar Código".',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }]);
  const iframeRef = useRef(null);

  const loadTemplate = (key) => {
    const template = TEMPLATES[key];
    if (template) {
      setCode({ html: template.html, css: template.css, js: template.js });
      setLogs([{
        id: 'init',
        method: 'info',
        text: `Modelo "${key}" carregado no Sandbox. Altere e clique em "Rodar Código".`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }]);
    }
  };

  // Listen for sandbox console messages
  useEffect(() => {
    const handleConsoleMessage = (event) => {
      if (event.data && event.data.type === 'console-log') {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLogs(prev => [...prev, {
          id: Date.now() + Math.random(),
          method: event.data.method,
          text: event.data.data,
          time
        }]);
      }
    };

    window.addEventListener('message', handleConsoleMessage);
    return () => window.removeEventListener('message', handleConsoleMessage);
  }, []);

  const handleRunCode = () => {
    const consoleOverrideScript = `
      <script>
        (function() {
          const _log = console.log;
          const _error = console.error;
          const _warn = console.warn;
          const _info = console.info;

          function formatMsg(args) {
            return args.map(arg => {
              if (typeof arg === 'object') {
                try { return JSON.stringify(arg); } catch(e) { return String(arg); }
              }
              return String(arg);
            }).join(' ');
          }

          console.log = function(...args) {
            window.parent.postMessage({type: 'console-log', method: 'log', data: formatMsg(args)}, '*');
            _log.apply(console, args);
          };
          console.error = function(...args) {
            window.parent.postMessage({type: 'console-log', method: 'error', data: formatMsg(args)}, '*');
            _error.apply(console, args);
          };
          console.warn = function(...args) {
            window.parent.postMessage({type: 'console-log', method: 'warn', data: formatMsg(args)}, '*');
            _warn.apply(console, args);
          };
          console.info = function(...args) {
            window.parent.postMessage({type: 'console-log', method: 'info', data: formatMsg(args)}, '*');
            _info.apply(console, args);
          };

          window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({type: 'console-log', method: 'error', data: message + " (Linha " + lineno + ")"}, '*');
            return false;
          };
        })();
      </script>
    `;

    const compiledCode = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <style>${code.css}</style>
          ${consoleOverrideScript}
      </head>
      <body>
          ${code.html}
          <script>
              try {
                  ${code.js}
              } catch(err) {
                  console.error(err.message);
              }
          </script>
      </body>
      </html>
    `;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = compiledCode;
    }
  };

  const handleDownloadZIP = async () => {
    const zip = new JSZip();
    
    // Add index.html structured properly
    zip.file("index.html", `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Dev Lab - Exportação</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${code.html}
    <script src="script.js"></script>
</body>
</html>`);

    // Add style.css and script.js
    zip.file("style.css", code.css);
    zip.file("script.js", code.js);

    // Generate blob content and trigger browser download
    const blobContent = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(blobContent);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projeto-exportado-webdevlab.zip';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClearConsole = () => {
    setLogs([]);
  };

  const handleCodeChange = (e) => {
    setCode(prev => ({ ...prev, [activeTab]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[calc(100vh-140px)] min-h-[550px] animate-fade-in">
      {/* Left Panel: Modular 3-Tab Text Editor */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-black/10">
        <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between px-2">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-5 py-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                activeTab === 'html' ? 'border-red-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-red-500" />
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-5 py-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                activeTab === 'css' ? 'border-blue-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-blue-500" />
              CSS
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-5 py-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                activeTab === 'js' ? 'border-amber-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              JavaScript
            </button>
          </div>

          {/* Quick Buttons */}
          <div className="flex gap-2 pr-3">
            <button
              onClick={handleRunCode}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1.5 shadow-lg shadow-emerald-600/10 cursor-pointer transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Rodar
            </button>
            <button
              onClick={handleDownloadZIP}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold rounded-lg flex items-center gap-1.5 border border-slate-700/50 cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar .ZIP
            </button>
          </div>
        </div>

        {/* Textarea Workspace */}
        <div className="flex-1 bg-slate-950/60 p-4 font-mono text-sm relative">
          <textarea
            value={code[activeTab]}
            onChange={handleCodeChange}
            spellCheck="false"
            className="w-full h-full bg-transparent border-none text-slate-300 resize-none outline-none font-mono text-xs md:text-sm leading-relaxed"
            placeholder={`// Digite seu código ${activeTab.toUpperCase()} aqui...`}
          />
        </div>

        {/* Templates selector footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800/80">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2.5">
            Modelos Disponíveis:
          </span>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => loadTemplate('hello')}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl text-left cursor-pointer transition-all hover:bg-slate-900/50"
            >
              <h5 className="text-xs font-bold text-slate-300">Olá Mundo!</h5>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Título e corpo básico.</p>
            </button>
            <button
              onClick={() => loadTemplate('card')}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl text-left cursor-pointer transition-all hover:bg-slate-900/50"
            >
              <h5 className="text-xs font-bold text-slate-300">Card Glassmorphism</h5>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Efeitos e sombras CSS.</p>
            </button>
            <button
              onClick={() => loadTemplate('counter')}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl text-left cursor-pointer transition-all hover:bg-slate-900/50"
            >
              <h5 className="text-xs font-bold text-slate-300">Contador Cliques</h5>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Soma/Subtração com DOM.</p>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Browser Viewport & Emulated Terminal Console */}
      <div className="flex flex-col gap-6 h-full xl:max-h-[calc(100vh-140px)]">
        {/* Browser viewport iframe */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-black/10">
          <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between gap-4 text-xs select-none">
            <span className="font-extrabold text-slate-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-400" />
              Navegador
            </span>
            <div className="bg-slate-950 px-3 py-1 border border-slate-800 rounded-full font-mono text-[10px] text-slate-500 flex-grow max-w-md mx-auto truncate flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              https://sandbox.local/index.html
            </div>
          </div>

          <div className="flex-1 bg-white relative">
            <iframe
              ref={iframeRef}
              className="w-full h-full bg-white border-none"
              title="Playground Sandbox Preview"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        </div>

        {/* Emulated Console */}
        <div className="h-44 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-lg">
          <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs text-slate-400 select-none font-bold">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-amber-500" />
              Console JS
            </span>
            <button
              onClick={handleClearConsole}
              className="text-[10px] text-slate-500 hover:text-slate-300 font-extrabold uppercase transition-colors cursor-pointer"
            >
              Limpar
            </button>
          </div>

          <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-2 flex flex-col justify-start">
            {logs.length === 0 ? (
              <div className="text-slate-600 italic">Nenhum log no console. Clique em "Rodar Código".</div>
            ) : (
              logs.map((log) => {
                let textClass = 'text-slate-300';
                if (log.method === 'error') textClass = 'text-red-400';
                if (log.method === 'warn') textClass = 'text-amber-400';
                if (log.method === 'info') textClass = 'text-blue-400';

                return (
                  <div key={log.id} className="flex gap-2 leading-relaxed">
                    <span className="text-slate-600 shrink-0 font-light select-none">[{log.time}]</span>
                    <span className={`${textClass} break-all whitespace-pre-wrap`}>{log.text}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
