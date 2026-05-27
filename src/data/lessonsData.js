/**
 * JORNADA DE APRENDIZADO — WEB DEV LAB
 * Estrutura linear em 8 Etapas: do HTML ao Projeto Real em Laravel.
 * Cada lição contém: conteúdo, código de exemplo, quiz e materiais de apoio.
 */

export const STAGES = [
  // ─────────────────────────────────────────
  // ETAPA 1 — HTML5 FUNDAMENTOS
  // ─────────────────────────────────────────
  {
    id: "stage-html",
    stageNumber: 1,
    title: "HTML5 Fundamentos",
    subtitle: "A estrutura de toda página web",
    tech: "HTML",
    level: "Iniciante",
    optional: false,
    accent: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    lessons: [
      {
        id: "html-intro",
        title: "1. O que é HTML?",
        level: "Iniciante",
        badge: "Conceito Base",
        description: "Compreenda a espinha dorsal de qualquer página da web: as tags HTML.",
        content: `
          <p>O <strong>HTML</strong> (HyperText Markup Language) é a base de todas as páginas da internet. Não é uma linguagem de programação, mas sim uma <em>linguagem de marcação</em> que indica ao navegador como estruturar os elementos da página.</p>
          
          <h4>Como funcionam as Tags?</h4>
          <p>O HTML usa <strong>tags</strong> envolvidas em colchetes angulares. Quase todas as tags vêm em pares: uma de abertura e outra de fechamento.</p>
          
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4 my-4 font-mono text-sm text-slate-200">
            <div class="text-xs text-slate-500 mb-2">// Sintaxe de uma tag</div>
            <code>&lt;p&gt;Este é um parágrafo.&lt;/p&gt;</code>
          </div>

          <h4>A Estrutura Básica:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>&lt;!DOCTYPE html&gt;</code>: Declara o padrão HTML5.</li>
            <li><code>&lt;html&gt;</code>: Tag raiz que engloba tudo.</li>
            <li><code>&lt;head&gt;</code>: Metadados invisíveis (título, estilos, SEO).</li>
            <li><code>&lt;body&gt;</code>: Todo o conteúdo visual da página.</li>
          </ul>
        `,
        demoCode: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Meu Primeiro Site</title>
</head>
<body>
    <h1>Olá Mundo!</h1>
    <p>Estou aprendendo HTML!</p>
</body>
</html>`,
        resources: {
          videos: [
            { title: "HTML para Iniciantes — Curso em Vídeo", url: "https://www.youtube.com/watch?v=epDCjksKMok", duration: "1h 20min" },
            { title: "Aprenda HTML em 1 Hora — Filipe Deschamps", url: "https://www.youtube.com/watch?v=SV7TL0hxmIQ", duration: "58min" }
          ],
          docs: [
            { title: "MDN — Introdução ao HTML", url: "https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Introduction_to_HTML" },
            { title: "HTML Reference — W3Schools", url: "https://www.w3schools.com/html/html_intro.asp" }
          ]
        },
        quiz: {
          question: "Qual tag HTML é responsável por conter todo o conteúdo VISÍVEL que o usuário vê no navegador?",
          options: [
            { text: "A tag <head>", correct: false },
            { text: "A tag <body>", correct: true },
            { text: "A tag <html>", correct: false },
            { text: "A tag <meta>", correct: false }
          ],
          explanation: "Correto! O <body> contém todos os elementos visíveis: títulos, parágrafos, imagens e botões. O <head> guarda configurações invisíveis como o título da aba e links de CSS."
        }
      },
      {
        id: "html-semantic",
        title: "2. HTML Semântico",
        level: "Iniciante",
        badge: "Boas Práticas",
        description: "Use tags com significado real para melhorar SEO e acessibilidade.",
        content: `
          <p>Com o HTML5, foram introduzidas as <strong>tags semânticas</strong>. Elas têm significado tanto para o desenvolvedor quanto para os robôs do Google e leitores de tela para deficientes visuais.</p>
          
          <h4>Tags Semânticas Principais:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>&lt;header&gt;</code>: Cabeçalho da página.</li>
            <li><code>&lt;nav&gt;</code>: Menu de navegação.</li>
            <li><code>&lt;main&gt;</code>: Conteúdo principal — apenas UM por página.</li>
            <li><code>&lt;section&gt;</code>: Seção temática de conteúdo.</li>
            <li><code>&lt;article&gt;</code>: Conteúdo autônomo (ex: post de blog).</li>
            <li><code>&lt;footer&gt;</code>: Rodapé da página.</li>
          </ul>
          
          <p>Usar <code>&lt;div&gt;</code> para tudo é um erro comum. Prefira sempre a tag semântica mais adequada!</p>
        `,
        demoCode: `<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#sobre">Sobre</a>
  </nav>
</header>

<main>
  <section>
    <article>
      <h2>Por que usar HTML Semântico?</h2>
      <p>Melhora SEO e acessibilidade!</p>
    </article>
  </section>
</main>

<footer>
  <p>&copy; 2026 Web Dev Lab</p>
</footer>`,
        resources: {
          videos: [
            { title: "HTML Semântico — Rafaella Ballerini", url: "https://www.youtube.com/watch?v=7LMl8tyqMiM", duration: "12min" },
            { title: "Semantic HTML — Kevin Powell (EN)", url: "https://www.youtube.com/watch?v=kGW8Al_cga4", duration: "20min" }
          ],
          docs: [
            { title: "MDN — HTML Semântico", url: "https://developer.mozilla.org/pt-BR/docs/Glossary/Semantics#sem%C3%A2ntica_em_html" },
            { title: "Guia de Acessibilidade Web", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/pt-br" }
          ]
        },
        quiz: {
          question: "Qual tag semântica do HTML5 é recomendada para conter o conteúdo principal e exclusivo de uma página?",
          options: [
            { text: "<section>", correct: false },
            { text: "<div>", correct: false },
            { text: "<main>", correct: true },
            { text: "<article>", correct: false }
          ],
          explanation: "Exato! O <main> deve aparecer apenas uma vez por página e representa o conteúdo central, diferente do <section> que pode ser repetido para agrupar temas."
        }
      },
      {
        id: "html-forms",
        title: "3. Formulários HTML",
        level: "Iniciante",
        badge: "Interatividade",
        description: "Crie formulários funcionais que coletam informações do usuário.",
        content: `
          <p>Formulários são a principal forma de o usuário enviar dados para o servidor. Todo formulário começa com a tag <code>&lt;form&gt;</code> e usa vários tipos de campos.</p>
          
          <h4>Atributos essenciais do &lt;form&gt;:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>action</code>: URL que receberá os dados enviados (ex: <code>salvar.php</code>).</li>
            <li><code>method="POST"</code>: Envia os dados de forma segura, sem expor na URL.</li>
            <li><code>method="GET"</code>: Dados aparecem na URL (útil para buscas).</li>
          </ul>
          
          <h4>Tipos de Input mais usados:</h4>
          <ul class="list-disc pl-6 space-y-1 my-3 text-slate-300">
            <li><code>type="text"</code>: Campo de texto simples.</li>
            <li><code>type="email"</code>: Valida formato de e-mail automaticamente.</li>
            <li><code>type="password"</code>: Oculta os caracteres digitados.</li>
            <li><code>type="submit"</code>: Botão que envia o formulário.</li>
          </ul>
        `,
        demoCode: `<form action="login.php" method="POST">
  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email" 
         placeholder="seu@email.com" required>
  
  <label for="senha">Senha:</label>
  <input type="password" id="senha" name="senha" 
         minlength="6" required>
  
  <button type="submit">Entrar</button>
</form>`,
        resources: {
          videos: [
            { title: "Formulários HTML Completo — Hora de Codar", url: "https://www.youtube.com/watch?v=wwqOJ2o84S4", duration: "35min" }
          ],
          docs: [
            { title: "MDN — Formulários Web", url: "https://developer.mozilla.org/pt-BR/docs/Learn/Forms" },
            { title: "W3Schools — HTML Forms", url: "https://www.w3schools.com/html/html_forms.asp" }
          ]
        },
        quiz: {
          question: "Qual method do <form> deve ser usado para enviar dados sensíveis (como senha) de forma segura, sem expô-los na URL do navegador?",
          options: [
            { text: "method=\"GET\"", correct: false },
            { text: "method=\"PUT\"", correct: false },
            { text: "method=\"POST\"", correct: true },
            { text: "method=\"SEND\"", correct: false }
          ],
          explanation: "POST envia os dados no corpo da requisição HTTP, tornando-os invisíveis na URL. GET coloca os dados na URL (ex: ?senha=123), o que é perigoso para informações sensíveis."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 2 — CSS3 & DESIGN
  // ─────────────────────────────────────────
  {
    id: "stage-css",
    stageNumber: 2,
    title: "CSS3 & Design",
    subtitle: "Estilo, layout e responsividade",
    tech: "CSS",
    level: "Iniciante",
    optional: false,
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    lessons: [
      {
        id: "css-intro",
        title: "1. Fundamentos do CSS",
        level: "Iniciante",
        badge: "Seletores e Propriedades",
        description: "Aprenda a selecionar elementos e aplicar estilos visuais com CSS.",
        content: `
          <p>O <strong>CSS</strong> (Cascading Style Sheets) é a linguagem de estilo que transforma o HTML cru em interfaces bonitas. Ele funciona através de <em>regras</em> compostas por seletores e declarações.</p>

          <h4>Anatomia de uma Regra CSS:</h4>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4 my-4 font-mono text-sm text-slate-200">
            <code>seletor &lbrace;<br>&nbsp;&nbsp;propriedade: valor;<br>&rbrace;</code>
          </div>

          <h4>Formas de aplicar CSS:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><strong>Externo:</strong> Arquivo separado <code>.css</code> linkado no <code>&lt;head&gt;</code> — melhor prática.</li>
            <li><strong>Interno:</strong> Tag <code>&lt;style&gt;</code> dentro do <code>&lt;head&gt;</code>.</li>
            <li><strong>Inline:</strong> Atributo <code>style=""</code> direto na tag — evite!</li>
          </ul>
        `,
        demoCode: `/* Arquivo: style.css */

/* Seletor de tag */
body {
  background-color: #0f172a;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
}

/* Seletor de classe */
.titulo-destaque {
  color: #3b82f6;
  font-size: 2rem;
  font-weight: 800;
}

/* Seletor de ID */
#btn-principal {
  background: #3b82f6;
  padding: 12px 24px;
  border-radius: 8px;
}`,
        resources: {
          videos: [
            { title: "CSS do Zero — Curso em Vídeo", url: "https://www.youtube.com/watch?v=GPK8A-A156o", duration: "1h 15min" },
            { title: "CSS para iniciantes — Filipe Deschamps", url: "https://www.youtube.com/watch?v=TKB3oMRLzgE", duration: "45min" }
          ],
          docs: [
            { title: "MDN — CSS Primeiros Passos", url: "https://developer.mozilla.org/pt-BR/docs/Learn/CSS/First_steps" },
            { title: "CSS-Tricks — Almanac", url: "https://css-tricks.com/almanac/" }
          ]
        },
        quiz: {
          question: "Qual é a melhor prática para aplicar CSS em uma página HTML?",
          options: [
            { text: "Usando o atributo style=\"\" direto em cada tag HTML", correct: false },
            { text: "Usando a tag <style> dentro do <body>", correct: false },
            { text: "Criando um arquivo .css externo e linkando no <head>", correct: true },
            { text: "Escrevendo CSS dentro do JavaScript", correct: false }
          ],
          explanation: "Um arquivo .css externo mantém o código organizado, reutilizável e facilita a manutenção. O CSS inline mistura conteúdo com estilo, tornando o código difícil de manter."
        }
      },
      {
        id: "css-flexbox",
        title: "2. Flexbox — Layouts Modernos",
        level: "Intermediário",
        badge: "Layout",
        description: "Domine o Flexbox para criar layouts flexíveis e alinhamentos perfeitos.",
        content: `
          <p>O <strong>Flexbox</strong> é o sistema de layout mais poderoso do CSS moderno. Com apenas algumas propriedades, você resolve problemas de alinhamento que antes exigiam hacks complexos.</p>

          <h4>Propriedades do Container (pai):</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>display: flex</code>: Ativa o modo Flexbox.</li>
            <li><code>flex-direction</code>: Define a direção (<code>row</code> ou <code>column</code>).</li>
            <li><code>justify-content</code>: Alinha no eixo principal (horizontal).</li>
            <li><code>align-items</code>: Alinha no eixo cruzado (vertical).</li>
            <li><code>gap</code>: Define o espaço entre os itens.</li>
          </ul>
        `,
        demoCode: `/* Container Flex */
.navbar {
  display: flex;
  justify-content: space-between; /* Logo à esq, links à dir */
  align-items: center;            /* Centraliza verticalmente */
  padding: 16px 32px;
  gap: 16px;
}

/* Centralizar um elemento na tela */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 24px;
}`,
        resources: {
          videos: [
            { title: "Flexbox em 15 minutos — Kevin Powell (legendado)", url: "https://www.youtube.com/watch?v=hwbqquXww-U", duration: "15min" },
            { title: "Flexbox Completo — Origamid", url: "https://www.youtube.com/watch?v=s3y9-KSKiO0", duration: "1h 20min" }
          ],
          docs: [
            { title: "Guia Completo de Flexbox — CSS-Tricks", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
            { title: "Flexbox Froggy (Jogo Interativo)", url: "https://flexboxfroggy.com/#pt-br" }
          ]
        },
        quiz: {
          question: "Qual propriedade CSS ativa o modelo de layout Flexbox em um elemento HTML?",
          options: [
            { text: "layout: flex", correct: false },
            { text: "display: flex", correct: true },
            { text: "flex: true", correct: false },
            { text: "position: flex", correct: false }
          ],
          explanation: "display: flex transforma o elemento em um container flex, fazendo seus filhos diretos se tornarem itens flexíveis que podem ser organizados com as demais propriedades do Flexbox."
        }
      },
      {
        id: "css-responsive",
        title: "3. Design Responsivo",
        level: "Intermediário",
        badge: "Mobile First",
        description: "Crie sites que se adaptam a qualquer tela usando Media Queries.",
        content: `
          <p>Hoje mais de 60% dos acessos vêm de celulares. O <strong>Design Responsivo</strong> garante que seu site funcione bem em qualquer tamanho de tela, do celular à TV.</p>

          <h4>Técnicas Essenciais:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><strong>Viewport Meta Tag:</strong> <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> — obrigatória no head de todo site.</li>
            <li><strong>Unidades relativas:</strong> Use <code>%</code>, <code>em</code>, <code>rem</code>, <code>vw</code>, <code>vh</code> ao invés de pixels fixos.</li>
            <li><strong>Media Queries:</strong> Aplique estilos condicionais baseados na largura da tela.</li>
          </ul>
          
          <h4>Abordagem Mobile First:</h4>
          <p>Escreva CSS para celular primeiro, depois use <code>@media (min-width: ...)</code> para expandir o layout em telas maiores.</p>
        `,
        demoCode: `/* Mobile First: estilos base para celular */
.container {
  padding: 16px;
  flex-direction: column;
}

/* Tablet (768px ou maior) */
@media (min-width: 768px) {
  .container {
    padding: 32px;
    flex-direction: row;
  }
}

/* Desktop (1024px ou maior) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}`,
        resources: {
          videos: [
            { title: "Responsividade do Zero — Hora de Codar", url: "https://www.youtube.com/watch?v=H91DhKPjhPk", duration: "40min" }
          ],
          docs: [
            { title: "MDN — Design Responsivo", url: "https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Responsive_Design" },
            { title: "Responsive Design Checker", url: "https://responsivedesignchecker.com/" }
          ]
        },
        quiz: {
          question: "Qual técnica de desenvolvimento CSS recomenda escrever estilos para telas pequenas (celular) primeiro e depois expandir para telas maiores?",
          options: [
            { text: "Desktop First", correct: false },
            { text: "Grid First", correct: false },
            { text: "Mobile First", correct: true },
            { text: "Flex First", correct: false }
          ],
          explanation: "Mobile First é a abordagem recomendada porque garante performance em celulares (que têm mais limitações) e usa @media (min-width) para adicionar complexidade progressivamente em telas maiores."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 3 — JAVASCRIPT (OPCIONAL ★)
  // ─────────────────────────────────────────
  {
    id: "stage-js",
    stageNumber: 3,
    title: "JavaScript Essencial",
    subtitle: "Interatividade e lógica no navegador",
    tech: "JS",
    level: "Intermediário",
    optional: true,
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    lessons: [
      {
        id: "js-intro",
        title: "1. Fundamentos do JavaScript",
        level: "Iniciante",
        badge: "Lógica de Programação",
        description: "Aprenda variáveis, tipos de dados e estruturas de controle básicas.",
        content: `
          <p>O <strong>JavaScript</strong> é a linguagem de programação da web. Ele roda diretamente no navegador e permite criar páginas dinâmicas e interativas.</p>

          <h4>Variáveis modernas:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>const</code>: Para valores que não mudam (preferido).</li>
            <li><code>let</code>: Para valores que podem mudar.</li>
            <li>Evite <code>var</code> — é legado e tem problemas de escopo.</li>
          </ul>

          <h4>Tipos de dados:</h4>
          <p>String (<code>"texto"</code>), Number (<code>42</code>), Boolean (<code>true/false</code>), Array (<code>[1,2,3]</code>), Object (<code>{chave: valor}</code>).</p>
        `,
        demoCode: `// Variáveis
const nome = "Felipe";
let idade = 25;
const ativo = true;

// Condicionais
if (idade >= 18) {
  console.log(nome + " é maior de idade!");
} else {
  console.log("Menor de idade.");
}

// Loop
const linguagens = ["HTML", "CSS", "JS", "PHP"];
linguagens.forEach(lang => {
  console.log("Estudando: " + lang);
});`,
        resources: {
          videos: [
            { title: "JavaScript para Iniciantes — Filipe Deschamps", url: "https://www.youtube.com/watch?v=DiM-Kpuz7GU", duration: "55min" },
            { title: "Curso JavaScript Moderno — Hora de Codar", url: "https://www.youtube.com/watch?v=TkD0QMyBa28", duration: "2h" }
          ],
          docs: [
            { title: "MDN — JavaScript Primeiros Passos", url: "https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps" },
            { title: "JavaScript.info — O Tutorial Moderno", url: "https://javascript.info/" }
          ]
        },
        quiz: {
          question: "Qual palavra-chave deve ser usada para declarar uma variável cujo valor NÃO irá mudar ao longo do código?",
          options: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "static", correct: false }
          ],
          explanation: "const (de 'constant') impede que o valor seja reatribuído depois da declaração. É a escolha padrão no JavaScript moderno. Use let apenas quando precisar reatribuir."
        }
      },
      {
        id: "js-dom",
        title: "2. Manipulação do DOM",
        level: "Intermediário",
        badge: "DOM & Eventos",
        description: "Aprenda a modificar elementos da página dinamicamente com JavaScript.",
        content: `
          <p>O <strong>DOM</strong> (Document Object Model) é a representação da página HTML como um objeto JavaScript. Manipulá-lo significa alterar elementos visíveis na tela sem recarregar a página.</p>

          <h4>Selecionando elementos:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>document.getElementById('id')</code>: Pelo atributo ID.</li>
            <li><code>document.querySelector('.classe')</code>: Pelo primeiro elemento com a classe.</li>
            <li><code>document.querySelectorAll('li')</code>: Todos os elementos da tag.</li>
          </ul>

          <h4>Eventos:</h4>
          <p>Use <code>addEventListener</code> para executar código quando o usuário interage (clique, digitação, hover).</p>
        `,
        demoCode: `// Seleciona o botão e o parágrafo
const btn = document.querySelector('#btn-cores');
const texto = document.querySelector('#mensagem');

// Adiciona evento de clique
btn.addEventListener('click', () => {
  texto.textContent = 'Você clicou no botão!';
  texto.style.color = '#3b82f6';
  texto.style.fontWeight = 'bold';
  
  // Alterna uma classe CSS
  btn.classList.toggle('ativo');
});`,
        resources: {
          videos: [
            { title: "Manipulação do DOM — Programação Web (EN)", url: "https://www.youtube.com/watch?v=y17RuWkWdn8", duration: "25min" },
            { title: "DOM Completo — Curso em Vídeo", url: "https://www.youtube.com/watch?v=WWZX8RWLxIk", duration: "1h 30min" }
          ],
          docs: [
            { title: "MDN — Introdução ao DOM", url: "https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction" },
            { title: "MDN — addEventListener", url: "https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener" }
          ]
        },
        quiz: {
          question: "Qual método JavaScript seleciona o PRIMEIRO elemento da página que corresponde a um seletor CSS (como uma classe ou ID)?",
          options: [
            { text: "document.getElementById()", correct: false },
            { text: "document.querySelector()", correct: true },
            { text: "document.findElement()", correct: false },
            { text: "document.getElement()", correct: false }
          ],
          explanation: "querySelector() aceita qualquer seletor CSS válido (.classe, #id, tag) e retorna o primeiro elemento correspondente. É o método mais moderno e versátil para seleção no DOM."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 4 — PHP SERVER-SIDE
  // ─────────────────────────────────────────
  {
    id: "stage-php",
    stageNumber: 4,
    title: "PHP Server-Side",
    subtitle: "Lógica e processamento no servidor",
    tech: "PHP",
    level: "Intermediário",
    optional: false,
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    lessons: [
      {
        id: "php-intro",
        title: "1. Introdução ao PHP",
        level: "Iniciante",
        badge: "Server-Side",
        description: "Entenda como o PHP processa dados no servidor e gera HTML dinâmico.",
        content: `
          <p>O <strong>PHP</strong> (PHP: Hypertext Preprocessor) é uma linguagem de script que roda no <em>servidor</em>. Diferente do JavaScript (que roda no navegador), o PHP processa dados antes de enviar o HTML ao usuário.</p>

          <h4>Como funciona o fluxo:</h4>
          <ol class="list-decimal pl-6 space-y-2 my-3 text-slate-300">
            <li>O usuário acessa <code>meusite.com/perfil.php</code>.</li>
            <li>O servidor Apache/Nginx executa o código PHP.</li>
            <li>O PHP pode ler um banco de dados, processar dados, etc.</li>
            <li>O PHP gera e envia o HTML final ao navegador do usuário.</li>
          </ol>

          <h4>Sintaxe básica:</h4>
          <p>Todo código PHP fica entre as tags <code>&lt;?php</code> e <code>?&gt;</code>. Variáveis sempre começam com <code>$</code>.</p>
        `,
        demoCode: `<?php
// Variáveis em PHP
$nome = "Felipe";
$idade = 25;
$linguagens = ["HTML", "CSS", "PHP", "Laravel"];

// Saída de dados
echo "<h2>Perfil de $nome</h2>";
echo "<p>Idade: $idade anos</p>";

// Loop
echo "<ul>";
foreach ($linguagens as $lang) {
    echo "<li>$lang</li>";
}
echo "</ul>";
?>`,
        resources: {
          videos: [
            { title: "PHP para Iniciantes — Traversy Media (EN)", url: "https://www.youtube.com/watch?v=BUCiSSyIGGU", duration: "1h 10min" },
            { title: "Curso PHP Completo — Hora de Codar", url: "https://www.youtube.com/watch?v=F7KzJ7e6EAc", duration: "3h" }
          ],
          docs: [
            { title: "PHP Manual Oficial", url: "https://www.php.net/manual/pt_BR/" },
            { title: "PHP do Zero — W3Schools", url: "https://www.w3schools.com/php/" }
          ]
        },
        quiz: {
          question: "Qual é o símbolo obrigatório que toda variável deve ter em PHP?",
          options: [
            { text: "# (cerquilha)", correct: false },
            { text: "@ (arroba)", correct: false },
            { text: "$ (cifrão)", correct: true },
            { text: "& (e comercial)", correct: false }
          ],
          explanation: "Em PHP, todas as variáveis obrigatoriamente começam com $ seguido do nome. Ex: $nome, $preco, $usuario. É uma característica única que diferencia PHP de outras linguagens."
        }
      },
      {
        id: "php-forms",
        title: "2. PHP com Formulários",
        level: "Intermediário",
        badge: "Backend",
        description: "Processe formulários HTML no servidor com as superglobais $_POST e $_GET.",
        content: `
          <p>A principal tarefa do PHP é processar dados enviados por formulários HTML. Para isso, usamos as <strong>superglobais</strong>, que são arrays mágicos que o PHP popula automaticamente.</p>

          <h4>Superglobais essenciais:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>$_POST</code>: Dados de formulários com <code>method="POST"</code> — invisíveis na URL, para dados sensíveis.</li>
            <li><code>$_GET</code>: Dados passados na URL (ex: <code>?busca=php</code>) — para buscas e filtros.</li>
            <li><code>$_SESSION</code>: Dados persistentes entre páginas (login, carrinho).</li>
          </ul>

          <p><strong>Segurança:</strong> Sempre valide e sanitize dados do usuário com <code>htmlspecialchars()</code> antes de exibir.</p>
        `,
        demoCode: `<?php
// Processa o formulário de login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Sanitiza os dados do usuário
    $email = htmlspecialchars($_POST['email']);
    $senha = $_POST['senha'];
    
    // Validação simples
    if (empty($email) || empty($senha)) {
        echo "<p>Preencha todos os campos!</p>";
    } else {
        echo "<p>Login realizado: $email</p>";
    }
}
?>`,
        resources: {
          videos: [
            { title: "Formulários com PHP — Curso em Vídeo", url: "https://www.youtube.com/watch?v=RIiNixHCB4Y", duration: "40min" }
          ],
          docs: [
            { title: "PHP — $_POST e $_GET", url: "https://www.php.net/manual/pt_BR/reserved.variables.post.php" },
            { title: "PHP — Sanitização de Dados", url: "https://www.php.net/manual/pt_BR/filter.filters.sanitize.php" }
          ]
        },
        quiz: {
          question: "Qual superglobal do PHP deve ser usada para ler dados enviados de um formulário com method=\"POST\"?",
          options: [
            { text: "$_GET", correct: false },
            { text: "$_REQUEST", correct: false },
            { text: "$_POST", correct: true },
            { text: "$_SERVER", correct: false }
          ],
          explanation: "$_POST contém os dados enviados no corpo da requisição HTTP via method POST. É a escolha correta para dados sensíveis pois não os expõe na URL do navegador."
        }
      },
      {
        id: "php-pdo",
        title: "3. PDO e Banco de Dados",
        level: "Avançado",
        badge: "Banco de Dados",
        description: "Conecte o PHP a bancos de dados de forma segura usando PDO e Prepared Statements.",
        content: `
          <p>O <strong>PDO</strong> (PHP Data Objects) é a forma moderna e segura de conectar o PHP a bancos de dados. Ele protege contra o perigoso <em>SQL Injection</em> usando Prepared Statements.</p>

          <h4>O que é SQL Injection?</h4>
          <p>Se você concatena dados do usuário direto na query (<code>"SELECT * FROM users WHERE nome = '$nome'"</code>), um hacker pode injetar código SQL malicioso e destruir seu banco!</p>

          <h4>A solução: Prepared Statements</h4>
          <p>Usamos placeholders (<code>:nome</code> ou <code>?</code>) para separar o SQL dos dados, eliminando o risco.</p>
        `,
        demoCode: `<?php
// 1. Conecta ao MySQL via PDO
$pdo = new PDO(
    'mysql:host=localhost;dbname=meu_banco',
    'root',       // usuário
    ''            // senha (vazia no Laragon)
);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 2. Prepared Statement (SEGURO contra SQL Injection)
$stmt = $pdo->prepare(
    "SELECT * FROM usuarios WHERE email = :email"
);
$stmt->execute(['email' => $email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

echo "Usuário encontrado: " . $usuario['nome'];
?>`,
        resources: {
          videos: [
            { title: "PDO e SQL Injection — Traversy Media (EN)", url: "https://www.youtube.com/watch?v=OEV8gMkCHXQ", duration: "35min" }
          ],
          docs: [
            { title: "PHP Manual — PDO", url: "https://www.php.net/manual/pt_BR/book.pdo.php" },
            { title: "OWASP — SQL Injection Prevention", url: "https://owasp.org/www-community/attacks/SQL_Injection" }
          ]
        },
        quiz: {
          question: "Qual técnica do PDO protege a aplicação contra ataques de SQL Injection separando o código SQL dos dados do usuário?",
          options: [
            { text: "htmlspecialchars()", correct: false },
            { text: "Prepared Statements", correct: true },
            { text: "session_start()", correct: false },
            { text: "header()", correct: false }
          ],
          explanation: "Prepared Statements pré-compilam a estrutura da query SQL antes de receber os dados. Assim, mesmo que o usuário injete código malicioso, ele é tratado como texto simples, nunca como instrução SQL."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 5 — BANCO DE DADOS MYSQL
  // ─────────────────────────────────────────
  {
    id: "stage-mysql",
    stageNumber: 5,
    title: "MySQL Banco de Dados",
    subtitle: "Modelagem e Consultas Relacionais",
    tech: "MySQL",
    level: "Intermediário",
    optional: false,
    accent: "#0ea5e9",
    glow: "rgba(14, 165, 233, 0.15)",
    lessons: [
      {
        id: "mysql-intro",
        title: "1. Introdução ao MySQL e SQL",
        level: "Iniciante",
        badge: "Fundamentos",
        description: "Aprenda os conceitos básicos de bancos de dados relacionais e tabelas.",
        content: `
          <p>Bancos de dados relacionais organizam dados em <strong>tabelas</strong> compostas por linhas (registros) e colunas (atributos). O <strong>MySQL</strong> é o banco de dados de código aberto mais popular da web.</p>

          <h4>O que é SQL?</h4>
          <p>SQL (Structured Query Language) é a linguagem que usamos para nos comunicar com o banco de dados. Os comandos mais fundamentais são o <strong>CRUD</strong>:</p>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><strong>C</strong>reate: <code>INSERT INTO</code> (Inserir dados)</li>
            <li><strong>R</strong>ead: <code>SELECT</code> (Ler dados)</li>
            <li><strong>U</strong>pdate: <code>UPDATE</code> (Atualizar dados)</li>
            <li><strong>D</strong>elete: <code>DELETE</code> (Apagar dados)</li>
          </ul>
        `,
        demoCode: `-- Criando um banco de dados e uma tabela
CREATE DATABASE IF NOT EXISTS curso_db;
USE curso_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
        resources: {
          videos: [
            { title: "Curso de MySQL - Banco de Dados", url: "https://www.youtube.com/watch?v=Ofktsne-utM", duration: "1h 15min" }
          ],
          docs: [
            { title: "MySQL 8.0 Reference Manual", url: "https://dev.mysql.com/doc/refman/8.0/en/" }
          ]
        },
        quiz: {
          question: "Qual comando SQL é utilizado para ler dados de uma tabela?",
          options: [
            { text: "GET", correct: false },
            { text: "READ", correct: false },
            { text: "SELECT", correct: true },
            { text: "FETCH", correct: false }
          ],
          explanation: "O comando SELECT é a instrução principal da linguagem SQL para buscar, filtrar e ler informações contidas nas tabelas do banco."
        }
      },
      {
        id: "mysql-queries",
        title: "2. Manipulação de Dados (CRUD)",
        level: "Intermediário",
        badge: "Prática",
        description: "Execute operações reais de inserir, consultar, atualizar e excluir dados.",
        content: `
          <p>Para manipular os dados na tabela que criamos, utilizaremos as quatro operações básicas do CRUD. A sintaxe requer bastante atenção, principalmente com a cláusula <strong>WHERE</strong>.</p>

          <h4>Cláusula WHERE e Segurança</h4>
          <p>A cláusula <code>WHERE</code> funciona como um filtro. <strong>CUIDADO:</strong> Nunca faça um <code>UPDATE</code> ou <code>DELETE</code> sem um <code>WHERE</code>, ou você alterará/apagará TODOS os registros da tabela!</p>
        `,
        demoCode: `-- 1. CREATE (Inserir)
INSERT INTO usuarios (nome, email) 
VALUES ('Felipe', 'felipe@email.com');

-- 2. READ (Consultar)
-- Busca todos os campos de todos os usuários
SELECT * FROM usuarios;

-- Busca com filtro
SELECT nome, email FROM usuarios WHERE id = 1;

-- 3. UPDATE (Atualizar)
UPDATE usuarios 
SET nome = 'Felipe Editado' 
WHERE id = 1;

-- 4. DELETE (Deletar)
DELETE FROM usuarios WHERE id = 1;`,
        resources: {
          videos: [
            { title: "MySQL: INSERT, UPDATE e DELETE", url: "https://www.youtube.com/watch?v=5rKte0Yp-YQ", duration: "45min" }
          ],
          docs: [
            { title: "MySQL - Data Manipulation", url: "https://dev.mysql.com/doc/refman/8.0/en/data-manipulation.html" }
          ]
        },
        quiz: {
          question: "Por que é extremamente perigoso executar um comando UPDATE ou DELETE sem a cláusula WHERE?",
          options: [
            { text: "O banco de dados trava e precisa ser reiniciado.", correct: false },
            { text: "O comando afetará TODOS os registros da tabela ao invés de um específico.", correct: true },
            { text: "Dará um erro de sintaxe e nada será executado.", correct: false },
            { text: "O comando criará cópias dos registros.", correct: false }
          ],
          explanation: "O WHERE define o alvo (ex: WHERE id = 1). Sem ele, o banco entende que a regra se aplica a todas as linhas. Exemplo: DELETE FROM usuarios (apaga todo mundo)."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 6 — LARAVEL: AMBIENTE
  // ─────────────────────────────────────────
  {
    id: "stage-laravel-setup",
    stageNumber: 6,
    title: "Laravel: Ambiente",
    subtitle: "Instalação e configuração do projeto",
    tech: "Laravel",
    level: "Avançado",
    optional: false,
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    lessons: [
      {
        id: "laravel-laragon",
        title: "1. Instalando o Laragon",
        level: "Intermediário",
        badge: "Setup",
        description: "Configure seu ambiente local completo com PHP, MySQL e Composer em minutos.",
        content: `
          <p>O <strong>Laragon</strong> é a forma mais rápida de configurar um ambiente de desenvolvimento PHP profissional no Windows. Ele inclui Apache, PHP, MySQL, Git e Composer — tudo pré-configurado.</p>

          <h4>Passo a Passo de Instalação:</h4>
          <ol class="list-decimal pl-6 space-y-3 my-3 text-slate-300">
            <li><strong>Download:</strong> Acesse <a href="https://laragon.org" class="text-rose-400 underline">laragon.org</a> e baixe o <em>Laragon Full</em>.</li>
            <li><strong>Instalação:</strong> Execute o instalador e mantenha a pasta padrão (<code>C:\laragon</code>).</li>
            <li><strong>Iniciar:</strong> Abra o Laragon e clique em <strong>"Start All"</strong> para iniciar Apache e MySQL.</li>
            <li><strong>Testar:</strong> Acesse <code>http://localhost</code> — se aparecer a tela do Laragon, funcionou!</li>
            <li><strong>Auto Hosts:</strong> Toda pasta dentro de <code>C:\laragon\www</code> vira uma URL <code>nome-pasta.test</code> automaticamente.</li>
          </ol>
        `,
        demoCode: `// Verificando se tudo está funcionando no Terminal do Laragon:

> php --version
PHP 8.3.0 (cli) ...

> composer --version  
Composer version 2.6.0

> mysql --version
mysql  Ver 8.0.33

// Está tudo pronto para criar seu projeto Laravel!`,
        resources: {
          videos: [
            { title: "Instalando Laragon — Configuração Completa", url: "https://www.youtube.com/watch?v=E4bBJPvFxSE", duration: "20min" },
            { title: "Laragon Full Setup — Dev Hints", url: "https://www.youtube.com/watch?v=yNH2urFUxBg", duration: "15min" }
          ],
          docs: [
            { title: "Laragon.org — Site Oficial e Download", url: "https://laragon.org/download/" },
            { title: "Documentação do Laragon", url: "https://laragon.org/docs/" }
          ]
        },
        quiz: {
          question: "Qual é o diretório padrão onde você deve criar suas pastas de projetos no Laragon para que o Auto Virtual Host (.test) funcione automaticamente?",
          options: [
            { text: "C:\\laragon\\bin", correct: false },
            { text: "C:\\laragon\\www", correct: true },
            { text: "C:\\laragon\\etc", correct: false },
            { text: "C:\\Program Files\\Laragon", correct: false }
          ],
          explanation: "A pasta C:\\laragon\\www é o Document Root do Laragon. Tudo que você criar lá vira um projeto acessível via navegador com a URL nome-da-pasta.test automaticamente!"
        }
      },
      {
        id: "laravel-create",
        title: "2. Criando o Projeto Laravel",
        level: "Intermediário",
        badge: "Composer",
        description: "Use o Composer para criar um projeto Laravel completo com um único comando.",
        content: `
          <p>Com o Laragon instalado e rodando, criar um projeto Laravel é simples. O <strong>Composer</strong> (gerenciador de pacotes do PHP) faz todo o trabalho pesado.</p>

          <h4>Passo a Passo:</h4>
          <ol class="list-decimal pl-6 space-y-3 my-3 text-slate-300">
            <li>Abra o <strong>Terminal do Laragon</strong> (botão "Terminal" na interface).</li>
            <li>O terminal já abre na pasta <code>www</code>. Digite o comando de criação.</li>
            <li>Aguarde o Composer baixar todas as dependências (~2 minutos).</li>
            <li>Acesse <code>http://meu-sistema.test</code> no navegador — você verá a tela de boas-vindas do Laravel!</li>
          </ol>

          <h4>Estrutura de Pastas Gerada:</h4>
          <ul class="list-disc pl-6 space-y-1 my-3 text-slate-300 text-sm">
            <li><code>app/</code> — Models, Controllers e lógica de negócio.</li>
            <li><code>resources/views/</code> — Templates Blade (o HTML do Laravel).</li>
            <li><code>routes/web.php</code> — Definição de todas as URLs.</li>
            <li><code>database/migrations/</code> — Estrutura das tabelas do banco.</li>
            <li><code>.env</code> — Configurações de ambiente (banco, e-mail, etc).</li>
          </ul>
        `,
        demoCode: `// No terminal do Laragon, dentro de C:\\laragon\\www:

> composer create-project laravel/laravel meu-sistema
  Creating a "laravel/laravel" project...
  Installing laravel/laravel (v11.x.x)
  ...
  Application key set successfully!
  
// Pronto! Acesse: http://meu-sistema.test

// Estrutura criada:
meu-sistema/
├── app/Http/Controllers/
├── resources/views/
├── routes/web.php
├── database/migrations/
└── .env  ← configurações importantes!`,
        resources: {
          videos: [
            { title: "Criando primeiro projeto Laravel — Laracasts", url: "https://www.youtube.com/watch?v=MFh0Fd7BsjE", duration: "25min" },
            { title: "Laravel do Zero — Matheus Battisti", url: "https://www.youtube.com/watch?v=qH7rsZBENJo", duration: "3h" }
          ],
          docs: [
            { title: "Laravel 11 — Documentação Oficial (EN)", url: "https://laravel.com/docs/11.x/installation" },
            { title: "Laravel — Estrutura de Pastas", url: "https://laravel.com/docs/11.x/structure" }
          ]
        },
        quiz: {
          question: "Qual comando completo do Composer cria um novo projeto Laravel chamado 'meu-sistema'?",
          options: [
            { text: "npm create laravel meu-sistema", correct: false },
            { text: "php artisan new meu-sistema", correct: false },
            { text: "composer create-project laravel/laravel meu-sistema", correct: true },
            { text: "laravel new meu-sistema --composer", correct: false }
          ],
          explanation: "composer create-project laravel/laravel [nome] é o comando oficial. Ele baixa o template do Laravel do Packagist (repositório de pacotes PHP) e configura toda a estrutura."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 7 — LARAVEL: BANCO MySQL
  // ─────────────────────────────────────────
  {
    id: "stage-laravel-db",
    stageNumber: 7,
    title: "Laravel: Banco de Dados",
    subtitle: "MySQL, Migrations e Eloquent ORM",
    tech: "Laravel",
    level: "Avançado",
    optional: false,
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    lessons: [
      {
        id: "laravel-env-db",
        title: "1. Configurando o MySQL",
        level: "Intermediário",
        badge: "Banco de Dados",
        description: "Conecte seu projeto Laravel ao banco MySQL do Laragon via arquivo .env.",
        content: `
          <p>O Laravel se conecta ao banco de dados através de variáveis de ambiente no arquivo <code>.env</code>, localizado na raiz do projeto. Este arquivo <strong>nunca deve ir para o GitHub</strong> (já está no .gitignore).</p>

          <h4>Configuração no .env:</h4>
          <p>Abra o arquivo <code>.env</code> no seu editor e localize e altere a seção de banco:</p>
          
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-3 my-3 font-mono text-sm text-slate-200">
            DB_CONNECTION=mysql<br>
            DB_HOST=127.0.0.1<br>
            DB_PORT=3306<br>
            DB_DATABASE=meu_banco<br>
            DB_USERNAME=root<br>
            DB_PASSWORD=
          </div>

          <h4>Criando o banco no HeidiSQL (Laragon):</h4>
          <ol class="list-decimal pl-6 space-y-2 my-3 text-slate-300">
            <li>No Laragon, clique em <strong>Menu → HeidiSQL</strong>.</li>
            <li>Conecte com usuário <code>root</code> e senha vazia.</li>
            <li>Clique em "Nova base de dados" e crie <code>meu_banco</code>.</li>
            <li>Volte ao terminal e rode <code>php artisan migrate</code>.</li>
          </ol>
        `,
        demoCode: `// No arquivo .env do seu projeto Laravel:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=meu_banco
DB_USERNAME=root
DB_PASSWORD=

// No terminal, após configurar o .env:
> php artisan migrate

INFO  Running migrations.

  2014_10_12_000000_create_users_table .............. 10ms DONE
  2014_10_12_100000_create_password_resets_table .... 8ms  DONE

// Seu banco está conectado e as tabelas foram criadas!`,
        resources: {
          videos: [
            { title: "Laravel e MySQL — Configuração Completa", url: "https://www.youtube.com/watch?v=Lqo9-pQuBZE", duration: "20min" }
          ],
          docs: [
            { title: "Laravel — Database Configuration", url: "https://laravel.com/docs/11.x/database" },
            { title: "Laravel — Migrations", url: "https://laravel.com/docs/11.x/migrations" }
          ]
        },
        quiz: {
          question: "No Laragon, qual é a senha padrão do usuário root do MySQL que deve ser configurada no arquivo .env do Laravel?",
          options: [
            { text: "root", correct: false },
            { text: "password", correct: false },
            { text: "admin", correct: false },
            { text: "Sem senha (campo vazio)", correct: true }
          ],
          explanation: "O Laragon configura o MySQL sem senha para facilitar o desenvolvimento local. O campo DB_PASSWORD= deve ficar em branco no .env."
        }
      },
      {
        id: "laravel-migrations",
        title: "2. Migrations e Models",
        level: "Avançado",
        badge: "Eloquent ORM",
        description: "Crie tabelas com Migrations e gerencie dados com o Eloquent ORM.",
        content: `
          <p>O Laravel usa <strong>Migrations</strong> para controlar a estrutura do banco de dados como código. Isso significa que toda a equipe pode reproduzir o banco exato rodando um único comando.</p>

          <h4>Criando uma Migration e Model juntos:</h4>
          <p>O flag <code>-m</code> cria a migration automaticamente junto com a Model:</p>
          
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-3 my-3 font-mono text-sm text-rose-300">
            <code>php artisan make:model Produto -m</code>
          </div>

          <h4>O Eloquent ORM:</h4>
          <p>Cada Model representa uma tabela. O Eloquent permite consultar e salvar dados sem escrever SQL puro:</p>
          <ul class="list-disc pl-6 space-y-1 my-3 text-slate-300 text-sm">
            <li><code>Produto::all()</code> — Busca todos os produtos.</li>
            <li><code>Produto::find(1)</code> — Busca o produto com ID 1.</li>
            <li><code>Produto::where('preco', '>', 50)->get()</code> — Filtra por preço.</li>
            <li><code>Produto::create([...])</code> — Insere novo produto.</li>
          </ul>
        `,
        demoCode: `// 1. Criar Model + Migration
> php artisan make:model Produto -m

// 2. Editar a migration em database/migrations/..._create_produtos_table.php
Schema::create('produtos', function (Blueprint $table) {
    $table->id();
    $table->string('nome');
    $table->decimal('preco', 8, 2);
    $table->text('descricao')->nullable();
    $table->integer('estoque')->default(0);
    $table->timestamps();
});

// 3. Criar a tabela no banco
> php artisan migrate

// 4. Usar o Eloquent no Controller
$produtos = Produto::where('estoque', '>', 0)
                   ->orderBy('nome')
                   ->get();`,
        resources: {
          videos: [
            { title: "Eloquent ORM Completo — Laracasts", url: "https://www.youtube.com/watch?v=7tMiNp1R7vc", duration: "45min" }
          ],
          docs: [
            { title: "Laravel — Eloquent ORM", url: "https://laravel.com/docs/11.x/eloquent" },
            { title: "Laravel — Schema Builder (Migrations)", url: "https://laravel.com/docs/11.x/migrations#available-column-types" }
          ]
        },
        quiz: {
          question: "Qual comando Artisan cria simultaneamente uma Model e sua Migration correspondente no Laravel?",
          options: [
            { text: "php artisan make:model Produto --migration", correct: false },
            { text: "php artisan make:migration Produto -m", correct: false },
            { text: "php artisan make:model Produto -m", correct: true },
            { text: "php artisan generate Produto", correct: false }
          ],
          explanation: "O flag -m (abreviação de --migration) diz ao Artisan para criar a migration junto com a Model. É um atalho poderoso que agiliza muito a criação de novas entidades no sistema."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 8 — LARAVEL: ARQUITETURA MVC
  // ─────────────────────────────────────────
  {
    id: "stage-laravel-mvc",
    stageNumber: 8,
    title: "Laravel: Arquitetura MVC",
    subtitle: "Rotas, Controllers e Views Blade",
    tech: "Laravel",
    level: "Avançado",
    optional: false,
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    lessons: [
      {
        id: "laravel-routes",
        title: "1. Rotas e Controllers",
        level: "Avançado",
        badge: "Rotas",
        description: "Defina URLs e conecte-as a Controllers para organizar a lógica do sistema.",
        content: `
          <p>No Laravel, as <strong>Rotas</strong> são o ponto de entrada de toda requisição. Elas ficam no arquivo <code>routes/web.php</code> e conectam cada URL a um Controller ou closure.</p>

          <h4>Tipos de Rota:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>Route::get('/url', ...)</code> — Para exibir páginas.</li>
            <li><code>Route::post('/url', ...)</code> — Para receber formulários.</li>
            <li><code>Route::resource('/produtos', ProdutoController::class)</code> — Cria as 7 rotas CRUD de uma vez!</li>
          </ul>

          <h4>Resource Controller — 7 rotas automáticas:</h4>
          <p>Com um único <code>Route::resource</code>, o Laravel cria: index, create, store, show, edit, update e destroy.</p>
        `,
        demoCode: `// routes/web.php

// Rota simples para página inicial
Route::get('/', function () {
    return view('welcome');
});

// Rota apontando para um Controller
Route::get('/produtos', [ProdutoController::class, 'index']);

// Resource Controller — 7 rotas CRUD automáticas!
Route::resource('produtos', ProdutoController::class);

// Verificar todas as rotas criadas:
// > php artisan route:list`,
        resources: {
          videos: [
            { title: "Laravel Routes e Controllers — Matheus Battisti", url: "https://www.youtube.com/watch?v=TqGQkXN9eWA", duration: "30min" }
          ],
          docs: [
            { title: "Laravel — Routing", url: "https://laravel.com/docs/11.x/routing" },
            { title: "Laravel — Controllers", url: "https://laravel.com/docs/11.x/controllers" }
          ]
        },
        quiz: {
          question: "Qual comando do Artisan exibe uma lista completa de todas as rotas registradas na aplicação Laravel?",
          options: [
            { text: "php artisan routes", correct: false },
            { text: "php artisan list:routes", correct: false },
            { text: "php artisan route:list", correct: true },
            { text: "php artisan show:routes", correct: false }
          ],
          explanation: "php artisan route:list exibe uma tabela organizada com todas as rotas, seus métodos HTTP, URIs, nomes e os Controllers/closures que as atendem."
        }
      },
      {
        id: "laravel-blade",
        title: "2. Views com Blade",
        level: "Avançado",
        badge: "Templates",
        description: "Use o motor Blade para criar templates HTML dinâmicos e reutilizáveis.",
        content: `
          <p>O <strong>Blade</strong> é o motor de templates do Laravel. Ele permite misturar HTML com variáveis e estruturas de controle de forma limpa, usando a sintaxe <code>@</code> ao invés do verboso PHP raiz.</p>

          <h4>Funcionalidades do Blade:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>{{ $variavel }}</code> — Imprime o valor com escape HTML (seguro).</li>
            <li><code>@foreach($itens as $item)</code> / <code>@endforeach</code> — Loop.</li>
            <li><code>@if($condicao)</code> / <code>@endif</code> — Condicional.</li>
            <li><code>@extends('layout')</code> — Herda um template base.</li>
            <li><code>@section('conteudo')</code> — Define uma seção de conteúdo.</li>
          </ul>

          <h4>Layouts com Blade:</h4>
          <p>Crie um arquivo <code>layouts/app.blade.php</code> com o HTML base e use <code>@yield('content')</code> onde o conteúdo de cada página entrará.</p>
        `,
        demoCode: `{{-- resources/views/produtos/index.blade.php --}}
@extends('layouts.app')

@section('titulo', 'Lista de Produtos')

@section('content')
  <h1>Nossos Produtos</h1>

  @if($produtos->isEmpty())
    <p>Nenhum produto cadastrado ainda.</p>
  @else
    <div class="grid">
      @foreach($produtos as $produto)
        <div class="card">
          <h3>{{ $produto->nome }}</h3>
          <p>R$ {{ number_format($produto->preco, 2, ',', '.') }}</p>
          <a href="{{ route('produtos.show', $produto) }}">Ver</a>
        </div>
      @endforeach
    </div>
  @endif
@endsection`,
        resources: {
          videos: [
            { title: "Blade Templates Completo — Laravel Daily", url: "https://www.youtube.com/watch?v=iFSBd9Wr3Z8", duration: "35min" }
          ],
          docs: [
            { title: "Laravel — Blade Templates", url: "https://laravel.com/docs/11.x/blade" }
          ]
        },
        quiz: {
          question: "No Blade do Laravel, qual sintaxe é usada para exibir o valor de uma variável com proteção automática contra XSS (escape HTML)?",
          options: [
            { text: "<?php echo $variavel; ?>", correct: false },
            { text: "{!! $variavel !!}", correct: false },
            { text: "{{ $variavel }}", correct: true },
            { text: "@echo($variavel)", correct: false }
          ],
          explanation: "{{ $variavel }} imprime o valor e aplica htmlspecialchars() automaticamente, prevenindo ataques XSS. Use {!! !!} APENAS quando você quiser renderizar HTML bruto de uma fonte confiável."
        }
      }
    ]
  },

  // ─────────────────────────────────────────
  // ETAPA 9 — LARAVEL: PROJETO REAL (MVP)
  // ─────────────────────────────────────────
  {
    id: "stage-laravel-mvp",
    stageNumber: 9,
    title: "Laravel: Projeto Real",
    subtitle: "Construindo um MVP completo do zero",
    tech: "Laravel",
    level: "Master",
    optional: false,
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    lessons: [
      {
        id: "laravel-crud",
        title: "1. CRUD Completo",
        level: "Master",
        badge: "Projeto Prático",
        description: "Construa as operações Criar, Ler, Atualizar e Deletar (CRUD) usando o fluxo completo do Laravel.",
        content: `
          <p>Um <strong>CRUD</strong> (Create, Read, Update, Delete) é o coração de qualquer sistema web. Com o Laravel, o fluxo completo pode ser gerado em minutos com o Artisan.</p>

          <h4>Gerando o CRUD Completo de uma vez:</h4>
          <div class="bg-slate-900 border border-rose-500/20 rounded-lg p-3 my-3 font-mono text-sm text-rose-300">
            <code>php artisan make:model Tarefa -mcr</code>
          </div>
          <p>Os flags significam: <code>-m</code> (migration), <code>-c</code> (controller), <code>-r</code> (resource — já com os 7 métodos CRUD).</p>

          <h4>Os 7 Métodos do Resource Controller:</h4>
          <ul class="list-disc pl-6 space-y-1 my-3 text-slate-300 text-sm">
            <li><code>index()</code> — Lista todos.</li>
            <li><code>create()</code> — Exibe formulário de criação.</li>
            <li><code>store()</code> — Salva no banco.</li>
            <li><code>show($id)</code> — Exibe um item.</li>
            <li><code>edit($id)</code> — Exibe formulário de edição.</li>
            <li><code>update($id)</code> — Atualiza no banco.</li>
            <li><code>destroy($id)</code> — Remove do banco.</li>
          </ul>
        `,
        demoCode: `// TarefaController.php — store() e destroy()

public function store(Request $request) {
    $request->validate([
        'titulo' => 'required|min:3|max:100',
    ]);
    
    Tarefa::create([
        'titulo' => $request->titulo,
        'usuario_id' => auth()->id(),
    ]);
    
    return redirect()->route('tarefas.index')
                     ->with('success', 'Tarefa criada!');
}

public function destroy(Tarefa $tarefa) {
    $tarefa->delete();
    return back()->with('success', 'Tarefa removida!');
}`,
        resources: {
          videos: [
            { title: "CRUD Completo em Laravel — Matheus Battisti", url: "https://www.youtube.com/watch?v=qH7rsZBENJo", duration: "2h 30min" },
            { title: "Laravel CRUD do Zero — Laracasts (EN)", url: "https://www.youtube.com/watch?v=ImtZ5yENzgE", duration: "1h" }
          ],
          docs: [
            { title: "Laravel — Resource Controllers", url: "https://laravel.com/docs/11.x/controllers#resource-controllers" },
            { title: "Laravel — Validation", url: "https://laravel.com/docs/11.x/validation" }
          ]
        },
        quiz: {
          question: "Qual comando Artisan gera a Model, a Migration, o Controller e já preenche os 7 métodos CRUD de uma vez?",
          options: [
            { text: "php artisan make:crud Tarefa", correct: false },
            { text: "php artisan make:model Tarefa -mcr", correct: true },
            { text: "php artisan make:resource Tarefa --all", correct: false },
            { text: "php artisan scaffold Tarefa", correct: false }
          ],
          explanation: "O -mcr combina -m (migration), -c (controller) e -r (resource). É o atalho definitivo do Laravel para criar toda a estrutura de uma entidade com CRUD completo."
        }
      },
      {
        id: "laravel-auth",
        title: "2. Autenticação de Usuários",
        level: "Master",
        badge: "Segurança",
        description: "Implemente login, logout e proteção de rotas com o sistema de Auth do Laravel.",
        content: `
          <p>O Laravel possui um sistema de autenticação robusto. Para projetos simples, usamos o <strong>Laravel Breeze</strong>, que gera as telas de login, registro e redefinição de senha em minutos.</p>

          <h4>Instalando o Laravel Breeze:</h4>
          <ol class="list-decimal pl-6 space-y-2 my-3 text-slate-300">
            <li><code>composer require laravel/breeze --dev</code></li>
            <li><code>php artisan breeze:install blade</code></li>
            <li><code>npm install && npm run dev</code></li>
            <li><code>php artisan migrate</code></li>
          </ol>

          <h4>Protegendo Rotas com Middleware:</h4>
          <p>Use o middleware <code>auth</code> para garantir que apenas usuários logados acessem determinadas rotas:</p>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-3 my-3 font-mono text-sm text-slate-200">
            <code>Route::resource('tarefas', TarefaController::class)->middleware('auth');</code>
          </div>
        `,
        demoCode: `// routes/web.php
// Protegendo todas as rotas de tarefas com auth
Route::resource('tarefas', TarefaController::class)
     ->middleware('auth');

// No Controller, verificar dono do recurso
public function destroy(Tarefa $tarefa) {
    // Garante que o usuário só apaga SUAS tarefas
    if ($tarefa->usuario_id !== auth()->id()) {
        abort(403, 'Acesso negado!');
    }
    
    $tarefa->delete();
    return back()->with('success', 'Removida!');
}

// Na View Blade
@auth
    <p>Olá, {{ auth()->user()->name }}!</p>
    <a href="/logout">Sair</a>
@endauth`,
        resources: {
          videos: [
            { title: "Laravel Breeze — Autenticação Completa", url: "https://www.youtube.com/watch?v=DFamHnGkb_4", duration: "40min" }
          ],
          docs: [
            { title: "Laravel — Authentication", url: "https://laravel.com/docs/11.x/authentication" },
            { title: "Laravel Breeze — Starter Kit", url: "https://laravel.com/docs/11.x/starter-kits#laravel-breeze" }
          ]
        },
        quiz: {
          question: "Qual middleware do Laravel deve ser aplicado às rotas para garantir que apenas usuários autenticados (logados) possam acessá-las?",
          options: [
            { text: "->middleware('logged')", correct: false },
            { text: "->middleware('auth')", correct: true },
            { text: "->middleware('session')", correct: false },
            { text: "->middleware('verified')", correct: false }
          ],
          explanation: "O middleware 'auth' verifica se há uma sessão de usuário ativa. Se o visitante não estiver logado, ele é automaticamente redirecionado para a tela de login."
        }
      }
    ]
  }
];

// Helper: retorna o total de lições obrigatórias (JS excluído)
export const REQUIRED_LESSON_IDS = STAGES
  .filter(s => !s.optional)
  .flatMap(s => s.lessons.map(l => l.id));

// Helper: busca uma stage pelo ID
export const getStageById = (id) => STAGES.find(s => s.id === id);

// Helper: busca uma lição pelo ID dentro de uma stage
export const getLessonById = (stageId, lessonId) => {
  const stage = getStageById(stageId);
  return stage?.lessons.find(l => l.id === lessonId);
};

export function getStageStatus(stage, completedLessons) {
  const lessonIds = stage.lessons.map(l => l.id);
  const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length;
  if (completedCount === lessonIds.length) return 'done';
  if (completedCount > 0) return 'active';
  return 'pending';
}

export function isStageUnlocked(stageIndex, stages, completedLessons) {
  if (stageIndex === 0) return true;
  const prev = stages[stageIndex - 1];
  if (prev.optional) {
    return isStageUnlocked(stageIndex - 1, stages, completedLessons);
  }
  const prevStatus = getStageStatus(prev, completedLessons);
  return prevStatus === 'done';
}

// Legado — mantido para não quebrar imports antigos durante a transição
export const CURRICULUM_DATA = {};
