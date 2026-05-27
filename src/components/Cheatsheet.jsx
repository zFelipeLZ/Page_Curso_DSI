import { useState } from 'react';
import { BookOpen, Copy, Check, Search, Layers, Code2, Terminal, Cpu, Database } from 'lucide-react';

const CHEATSHEETS = [
  {
    tech: "html",
    title: "HTML5 Semântico & Metatags",
    icon: <Layers className="w-5 h-5 text-red-400" />,
    items: [
      {
        name: "Metatags Essenciais de SEO",
        snippet: `<meta name="description" content="Aprenda Web Dev de forma prática.">
<meta name="keywords" content="HTML, CSS, JS, PHP">
<meta name="author" content="Felipe Louzeiro">`,
        desc: "Carrega metadados informativos de SEO cruciais para que o Google entenda e indexe o conteúdo da página."
      },
      {
        name: "Estrutura Semântica Padrão",
        snippet: `<header>
  <nav>Links de Menu</nav>
</header>
<main>
  <article>Artigo Principal</article>
  <aside>Barra Lateral</aside>
</main>
<footer>Rodapé</footer>`,
        desc: "Tags que auxiliam na acessibilidade e legibilidade do crawler do motor de busca (SEO)."
      },
      {
        name: "Formulários e Validação Nativa",
        snippet: `<form action="processar.php" method="POST">
  <input type="text" name="usuario" required minlength="3">
  <input type="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
  <button type="submit">Cadastrar</button>
</form>`,
        desc: "Inputs com validação de regex (pattern) e obrigatoriedade (required) nativas do navegador."
      }
    ]
  },
  {
    tech: "css",
    title: "CSS3 Flexbox, Grid & Keyframes",
    icon: <Code2 className="w-5 h-5 text-blue-400" />,
    items: [
      {
        name: "CSS Grid Responsivo",
        snippet: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}`,
        desc: "Cria um grid flexível que rearranja o número de colunas baseado na largura da tela automaticamente."
      },
      {
        name: "Centralização Absoluta Flexbox",
        snippet: `.flex-center {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
}`,
        desc: "Modo definitivo de alinhar e centralizar elementos filhos horizontal e verticalmente."
      },
      {
        name: "Keyframes & Animações",
        snippet: `@keyframes glow {
  0% { transform: scale(1); box-shadow: 0 0 5px rgba(59,130,246,0.3); }
  50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(59,130,246,0.6); }
  100% { transform: scale(1); box-shadow: 0 0 5px rgba(59,130,246,0.3); }
}
.botao-pulso {
  animation: glow 2s infinite ease-in-out;
}`,
        desc: "Cria uma animação fluida infinita de pulso e efeito luminoso em botões."
      }
    ]
  },
  {
    tech: "js",
    title: "JavaScript Lógica & Requisições",
    icon: <Terminal className="w-5 h-5 text-amber-400" />,
    items: [
      {
        name: "Consumo de API com fetch()",
        snippet: `async function carregarDados() {
  try {
    const resposta = await fetch('https://api.github.com/users/felipelouzeiro');
    if (!resposta.ok) throw new Error("Erro na rede");
    const dados = await json();
    console.log(dados.name);
  } catch (erro) {
    console.error("Erro capturado:", erro);
  }
}`,
        desc: "Estrutura moderna async/await para consumir dados dinâmicos de servidores sem travar o navegador."
      },
      {
        name: "Métodos de Array Úteis",
        snippet: `const alunos = [
  { nome: "Felipe", nota: 9.5 },
  { nome: "Ana", nota: 7.2 }
];

// Filtrar aprovados
const aprovados = alunos.filter(a => a.nota >= 8);

// Mapear apenas nomes
const nomes = alunos.map(a => a.nome);`,
        desc: "Manipulações declarativas e limpas de arrays muito comuns no desenvolvimento moderno."
      }
    ]
  },
  {
    tech: "php",
    title: "PHP Superglobals & PDO SQL",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    items: [
      {
        name: "Ler Formulário $_POST",
        snippet: `<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST["username"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    echo "Nome limpo: " . $nome;
}
?>`,
        desc: "Superglobal usada para processar formulários, limpando dados contra ataques XSS."
      },
      {
        name: "Persistir Login com $_SESSION",
        snippet: `<?php
session_start();
// Gravar na sessão
$_SESSION["usuario_logado"] = "Felipe";
$_SESSION["vip"] = true;

// Ler em outro script
session_start();
if (isset($_SESSION["usuario_logado"])) {
    echo "Bem-vindo de volta " . $_SESSION["usuario_logado"];
}
?>`,
        desc: "Mantém dados do usuário gravados no servidor enquanto ele navega por diferentes páginas do site."
      },
      {
        name: "Conexão Segura com Banco PDO",
        snippet: `<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=escola", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Consulta preparada contra SQL Injection
    $stmt = $pdo->prepare("SELECT * FROM estudantes WHERE nota > :nota");
    $stmt->execute(['nota' => 8.0]);
    $aprovados = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();
}
?>`,
        desc: "Estrutura recomendada profissional para conectar ao MySQL de forma blindada contra SQL Injection."
      }
    ]
  },
  {
    tech: "mysql",
    title: "MySQL Consultas & CRUD",
    icon: <Database className="w-5 h-5 text-cyan-400" />,
    items: [
      {
        name: "Comando SELECT (Ler)",
        snippet: `-- Busca tudo
SELECT * FROM usuarios;

-- Busca com Filtro e Ordem
SELECT nome, email FROM usuarios 
WHERE ativo = 1 
ORDER BY nome ASC 
LIMIT 10;`,
        desc: "O comando mais importante. Use WHERE para filtrar, ORDER BY para ordenar e LIMIT para paginar resultados."
      },
      {
        name: "Comando INSERT (Criar)",
        snippet: `INSERT INTO usuarios (nome, email, ativo) 
VALUES ('Novo Usuário', 'email@teste.com', 1);`,
        desc: "Criação de novos registros. A ordem dos campos em () deve corresponder exatamente à ordem dos valores em VALUES()."
      },
      {
        name: "Comandos UPDATE e DELETE (Perigo!)",
        snippet: `-- Atualizar
UPDATE usuarios SET ativo = 0 WHERE id = 5;

-- Excluir
DELETE FROM usuarios WHERE id = 5;`,
        desc: "CUIDADO: Nunca execute estes comandos sem a cláusula WHERE, ou você aplicará a ação a todas as linhas da tabela!"
      }
    ]
  }
];

export default function Cheatsheet() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (snippet, id) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Filter sheets by query
  const filteredCheatsheets = CHEATSHEETS.map(techGroup => {
    const items = techGroup.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...techGroup, items };
  }).filter(group => group.items.length > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/5 rounded-full blur-2xl -z-10 pointer-events-none" />
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-lg shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-200">Guia de Consulta Rápida (Cheatsheets)</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Esqueceu algum comando ou tag? Acesse referências rápidas e copie modelos de códigos consolidados para usar nos simuladores ou nos seus próprios projetos!
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar comandos/tags..."
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-750 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-3 outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      </div>

      {/* Cheatsheets Grid */}
      <div className="space-y-10">
        {filteredCheatsheets.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-850 p-12 text-center rounded-2xl text-slate-500 italic">
            Nenhum resultado encontrado para a sua pesquisa. Tente outras palavras-chave!
          </div>
        ) : (
          filteredCheatsheets.map((group) => (
            <section key={group.tech} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
                  {group.icon}
                </div>
                <h4 className="text-sm font-extrabold text-slate-200 uppercase tracking-widest">{group.title}</h4>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {group.items.map((item, idx) => {
                  const uniqueId = `${group.tech}-${idx}`;
                  const isCopied = copiedId === uniqueId;

                  return (
                    <div 
                      key={idx}
                      className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-slate-200 text-xs md:text-sm">{item.name}</h5>
                          
                          {/* Copy button */}
                          <button
                            onClick={() => handleCopy(item.snippet, uniqueId)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isCopied 
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                            title="Copiar código"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>

                      {/* Code Snippet Box */}
                      <pre className="mt-4 p-3 bg-slate-950/80 border border-slate-850 rounded-xl overflow-x-auto font-mono text-[10px] md:text-xs text-slate-300 leading-relaxed select-all">
                        <code>{item.snippet}</code>
                      </pre>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
