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
            { 
              title: "HTML para Iniciantes — Curso em Vídeo", 
              url: "https://www.youtube.com/watch?v=epDCjksKMok", 
              duration: "1h 20min",
              interactiveQuestions: [
                {
                  timestampSeconds: 5,
                  question: "O HTML é considerado uma linguagem de programação?",
                  options: ["Sim, ele compila código.", "Não, é uma linguagem de marcação.", "Sim, é orientado a objetos."],
                  correctIndex: 1,
                  explanation: "Exatamente! HTML significa HyperText Markup Language (Linguagem de Marcação de Hipertexto)."
                },
                {
                  timestampSeconds: 15,
                  question: "Quais são as tags base obrigatórias de um documento HTML?",
                  options: ["<header>, <footer> e <main>", "<html>, <head> e <body>", "<nav>, <section> e <div>"],
                  correctIndex: 1,
                  explanation: "Toda página precisa da tag <html> englobando o <head> (configurações) e o <body> (conteúdo visual)."
                }
              ]
            },
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
            { title: "HTML Semântico — Rafaella Ballerini", url: "https://www.youtube.com/watch?v=Fhy-5CtVkiM", duration: "12min" },
            { title: "Semantic HTML — Kevin Powell (EN)", url: "https://www.youtube.com/watch?v=YOsMJQfwqow", duration: "20min" }
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
            { title: "Formulários HTML Completo — Hora de Codar", url: "https://www.youtube.com/watch?v=91u7wBqQBIo", duration: "35min" }
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
      },
      {
        id: "html-aria",
        title: "4. Acessibilidade e ARIA",
        level: "Intermediário",
        badge: "A11y",
        description: "Torne suas páginas acessíveis para todos, incluindo usuários de leitores de tela.",
        content: `
          <p>Acessibilidade (<strong>a11y</strong>) garante que pessoas com deficiência visual, motora ou cognitiva consigam usar seu site. Na prática, isso impacta também o SEO — o Google interpreta código acessível como conteúdo de qualidade.</p>

          <h4>A Regra de Ouro do ARIA:</h4>
          <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 my-4 text-amber-300 text-sm">
            ⚠️ <strong>Importante:</strong> "Nunca use ARIA quando um elemento HTML semântico nativo resolve o problema." Um <code>&lt;button&gt;</code> já é acessível. Um <code>&lt;div role="button"&gt;</code> é um remendo.
          </div>

          <h4>Os 3 pilares do ARIA:</h4>
          <ul class="list-disc pl-6 space-y-3 my-3 text-slate-300">
            <li><code>role</code> — Define <em>o que</em> o elemento é semanticamente. Ex: <code>role="dialog"</code>, <code>role="alert"</code>.</li>
            <li><code>aria-label</code> — Fornece um rótulo para leitores de tela quando não há texto visível. Ex: botão de fechar (X) precisa de <code>aria-label="Fechar modal"</code>.</li>
            <li><code>aria-hidden="true"</code> — Oculta elementos decorativos (ícones, separadores) dos leitores de tela.</li>
          </ul>

          <h4>aria-expanded e estados dinâmicos:</h4>
          <p>Menus suspensos devem alternar <code>aria-expanded="true/false"</code> via JavaScript, comunicando o estado ao leitor de tela em tempo real.</p>

          <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 my-4 text-emerald-300 text-sm">
            ✅ <strong>Dica profissional:</strong> Use a extensão gratuita <strong>axe DevTools</strong> no Chrome para auditar acessibilidade automaticamente durante o desenvolvimento.
          </div>
        `,
        demoCode: `<!-- Navegação acessível -->
<nav aria-label="Menu principal de navegação">
  <ul>
    <!-- aria-current="page" indica a página ativa -->
    <li><a href="/home" aria-current="page">Início</a></li>
    <li><a href="/cursos">Cursos</a></li>
  </ul>
</nav>

<!-- Botão com ícone: aria-label obrigatório! -->
<button aria-label="Fechar modal de confirmação">
  <!-- aria-hidden oculta o ícone decorativo do leitor de tela -->
  <svg aria-hidden="true">...</svg>
</button>

<!-- Modal acessível com role e aria-modal -->
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-titulo"
  aria-describedby="modal-descricao"
>
  <h2 id="modal-titulo">Confirmar Exclusão</h2>
  <p id="modal-descricao">Esta ação não pode ser desfeita.</p>
</div>`,
        resources: {
          videos: [
            { title: "Acessibilidade Web para Iniciantes — ARIA explicado", url: "https://www.youtube.com/watch?v=g1ptrMrfrVc", duration: "18min" },
            { title: "HTML Semântico e Acessibilidade — Código Fonte TV", url: "https://www.youtube.com/watch?v=4dQtz1PpY9A", duration: "12min" }
          ],
          docs: [
            { title: "MDN — ARIA: Funções, Estados e Propriedades", url: "https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA" },
            { title: "W3C — Diretrizes de Acessibilidade (WCAG 2.1)", url: "https://www.w3.org/WAI/WCAG21/quickref/" }
          ]
        },
        quiz: {
          question: "Qual atributo ARIA deve ser adicionado a um botão que contém APENAS um ícone (sem texto visível) para torná-lo acessível a leitores de tela?",
          options: [
            { text: "role=\"button\"", correct: false },
            { text: "aria-hidden=\"true\"", correct: false },
            { text: "aria-label=\"Descrição da ação\"", correct: true },
            { text: "tabindex=\"0\"", correct: false }
          ],
          explanation: "aria-label fornece um rótulo textual alternativo visível apenas a tecnologias assistivas. aria-hidden='true' faria o oposto — esconderia o elemento inteiramente. Botões sem texto visível SEMPRE precisam de aria-label."
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
            { title: "CSS do Zero — Curso em Vídeo", url: "https://www.youtube.com/watch?v=Ejkb_YpuHWs", duration: "1h 15min" },
            { title: "CSS para iniciantes — Filipe Deschamps", url: "https://www.youtube.com/watch?v=xx01-s_Q-mU", duration: "45min" }
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
            { title: "Flexbox em 15 minutos — Kevin Powell (legendado)", url: "https://www.youtube.com/watch?v=ObvHOlAsbKw", duration: "15min" },
            { title: "Flexbox Completo — Origamid", url: "https://www.youtube.com/watch?v=x-4z_u8LcGc", duration: "1h 20min" }
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
            { title: "Responsividade do Zero — Hora de Codar", url: "https://www.youtube.com/watch?v=Z14bK5yEzY8", duration: "40min" }
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
      },
      {
        id: "css-grid-variables",
        title: "4. CSS Grid e Variáveis CSS",
        level: "Intermediário",
        badge: "Design System",
        description: "Crie layouts bidimensionais complexos com Grid e construa Design Systems escaláveis com variáveis CSS.",
        content: `
          <h4>CSS Grid: Layout Bidimensional</h4>
          <p>Enquanto o Flexbox é ideal para uma dimensão (linha OU coluna), o <strong>CSS Grid</strong> controla simultaneamente linhas E colunas — perfeito para dashboards, galerias e layouts de página completos.</p>

          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>display: grid</code> — Ativa o Grid no elemento.</li>
            <li><code>grid-template-columns</code> — Define as colunas. Ex: <code>280px 1fr</code> (sidebar + área principal).</li>
            <li><code>gap</code> — Espaçamento entre colunas e linhas simultaneamente.</li>
            <li><code>grid-column: span 2</code> — Faz um elemento ocupar 2 colunas.</li>
          </ul>

          <h4>Variáveis CSS com :root — Design System</h4>
          <p>Variáveis CSS (Custom Properties) são a diferença entre um CSS manutenível e um CSS que ninguém quer tocar. Ao centralizar cores, fontes e espaçamentos no <code>:root</code>, você cria um <strong>Design System</strong> escalável.</p>

          <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 my-4 text-emerald-300 text-sm">
            ✅ <strong>Vantagem real:</strong> Se o cliente pedir para mudar a cor primária da aplicação, você edita <strong>um único lugar</strong> no :root e toda a interface atualiza automaticamente.
          </div>

          <h4>Unidade <code>fr</code> (fraction):</h4>
          <p>A unidade <code>fr</code> representa uma fração do espaço disponível. <code>grid-template-columns: 1fr 2fr 1fr</code> cria 3 colunas onde a do meio é o dobro das laterais.</p>
        `,
        demoCode: `/* 1. Design System com Variáveis CSS no :root */
:root {
  /* Cores — fonte única da verdade */
  --cor-primaria: #3b82f6;
  --cor-fundo: #0f172a;
  --cor-superficie: #1e293b;
  --cor-texto: #e2e8f0;
  
  /* Espaçamento em escala de 4px */
  --espaco-sm: 0.5rem;    /* 8px */
  --espaco-md: 1rem;      /* 16px */
  --espaco-lg: 1.5rem;    /* 24px */
  
  /* Transições */
  --transicao: all 0.3s ease;
}

/* Usando as variáveis */
.botao-primario {
  background-color: var(--cor-primaria);
  padding: var(--espaco-sm) var(--espaco-md);
  transition: var(--transicao);
}

/* 2. Layout com CSS Grid */
.dashboard {
  display: grid;
  /* 280px fixo para sidebar, restante para o conteúdo */
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr; /* Header auto, conteúdo expande */
  gap: var(--espaco-lg);
  min-height: 100vh;
}

/* Grid de cards 3 colunas */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas iguais */
  gap: var(--espaco-md);
}

/* Card que ocupa a linha inteira */
.card-destaque {
  grid-column: 1 / -1; /* Do início ao fim */
}

/* Responsivo: 1 coluna no mobile */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr; /* Coluna única */
  }
  .grid-cards {
    grid-template-columns: 1fr;
  }
}`,
        resources: {
          videos: [
            { title: "CSS Grid em 20 minutos — Traversy Media (legendado)", url: "https://www.youtube.com/watch?v=0xMQfnTU6oo", duration: "20min" },
            { title: "CSS Grid completo — Origamid", url: "https://www.youtube.com/watch?v=x-4z_u8LcGc", duration: "1h 10min" }
          ],
          docs: [
            { title: "CSS Grid Garden — Jogo Interativo de Grid", url: "https://cssgridgarden.com/#pt-br" },
            { title: "Guia Completo de CSS Grid — CSS-Tricks", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }
          ]
        },
        quiz: {
          question: "Qual é a principal diferença entre CSS Flexbox e CSS Grid que determina quando usar cada um?",
          options: [
            { text: "Flexbox é mais moderno e deve sempre ser preferido ao Grid", correct: false },
            { text: "Flexbox controla UMA dimensão (linha OU coluna); Grid controla DUAS dimensões (linhas E colunas) simultaneamente", correct: true },
            { text: "Grid só funciona em navegadores modernos, enquanto Flexbox é compatível com todos", correct: false },
            { text: "Flexbox requer JavaScript para funcionar corretamente", correct: false }
          ],
          explanation: "Use Flexbox para componentes internos (barra de navegação, lista de botões). Use Grid para estrutura da página (layout com sidebar, grid de cards). Eles se complementam e são frequentemente usados juntos no mesmo projeto."
        }
      },
      {
        id: "css-ui-project",
        type: "project",
        title: "Projeto Prático: Interface do Sistema CRUD",
        level: "Intermediário",
        badge: "Entrega Visual",
        description: "Construa a interface (Frontend) do sistema que você dará vida no Projeto Final usando HTML e CSS.",
        content: `
          <h4>Sua Missão Visual</h4>
          <p>Antes de criarmos o banco de dados e a lógica em PHP, precisamos construir a <strong>tela do nosso sistema</strong>. Esta entrega será a base visual para o seu Desafio Final.</p>
          
          <h4>O que você deve criar:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><strong>Tema livre:</strong> Você escolhe! Pode ser uma loja, uma agenda, um sistema de adoção de pets, etc. (O mesmo tema será usado no Projeto Final).</li>
            <li><strong>Página Principal (Dashboard/Listagem):</strong> Uma tela agradável que mostre uma lista (tabela ou cards) dos itens hipotéticos cadastrados.</li>
            <li><strong>Formulário de Cadastro:</strong> Uma tela (ou área na mesma tela) contendo um formulário bem estilizado para inserir novos itens.</li>
            <li><strong>Design Responsivo:</strong> O sistema deve se adaptar a celulares usando Flexbox ou CSS Grid.</li>
          </ul>

          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4 text-blue-300 text-sm">
            💡 <strong>Dica:</strong> Capriche nas cores, efeitos de hover, sombras e formato dos botões e inputs. Um bom CSS aqui vai impressionar quando o projeto for integrado ao PHP!
          </div>

          <h4>Instruções de Entrega:</h4>
          <p>Coloque seus arquivos HTML e CSS em uma pasta, compacte-a em <code>.zip</code> e faça o upload abaixo. Esta etapa é fundamental para liberar a sua progressão!</p>
        `
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
            { title: "JavaScript para Iniciantes — Filipe Deschamps", url: "https://www.youtube.com/watch?v=QVrrqgDhhu4", duration: "55min" },
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
            { title: "Manipulação do DOM — Programação Web (EN)", url: "https://www.youtube.com/watch?v=2JVJAaVZnqc", duration: "25min" },
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
      },
      {
        id: "js-async",
        title: "3. Assincronismo e fetch()",
        level: "Avançado",
        badge: "APIs e HTTP",
        description: "Entenda o Event Loop e consuma APIs REST externas com fetch(), async/await e tratamento de erros robusto.",
        content: `
          <h4>O Problema da Sincronia</h4>
          <p>O JavaScript é <strong>single-threaded</strong> — possui apenas um fio de execução. Se ele precisasse esperar uma resposta de rede (que pode levar 3 segundos), a página inteira congelaria.</p>

          <h4>Como o Event Loop resolve isso:</h4>
          <ol class="list-decimal pl-6 space-y-2 my-3 text-slate-300">
            <li>Seu código chama <code>fetch()</code> — a requisição é <strong>delegada</strong> ao browser.</li>
            <li>O fio principal JS <strong>continua</strong> executando o restante do código.</li>
            <li>Quando a resposta chega, o callback entra na fila de microtasks.</li>
            <li>Quando a Call Stack esvazia, o Event Loop executa o callback.</li>
          </ol>

          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4 text-blue-300 text-sm">
            💡 <strong>Analogia:</strong> É como pedir comida em um restaurante. O garçom (Event Loop) não fica parado na cozinha esperando. Ele anota seu pedido e atende outras mesas. Quando fica pronto, ele serve.
          </div>

          <h4>async/await — Código assíncrono legível:</h4>
          <p><code>async/await</code> é açúcar sintático sobre Promises. Torna código assíncrono tão legível quanto código síncrono.</p>

          <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4 text-red-300 text-sm">
            ⚠️ <strong>Armadilha comum:</strong> <code>fetch()</code> NÃO lança erro para respostas HTTP 404 ou 500. Ele só rejeita se houver falha de rede. Sempre verifique <code>response.ok</code> manualmente!
          </div>
        `,
        demoCode: `// Consultando a API de CEP (ViaCEP) de forma profissional

const buscarEnderecoPorCep = async (cepDigitado) => {
  // Sanitiza: remove traços e espaços
  const cep = cepDigitado.replace(/\\D/g, '');
  
  if (cep.length !== 8) {
    throw new Error('CEP deve ter 8 dígitos.');
  }
  
  try {
    // fetch() retorna uma Promise — await pausa aqui
    const resposta = await fetch(\`https://viacep.com.br/ws/\${cep}/json/\`);
    
    // ARMADILHA: status 404 não rejeita a Promise!
    if (!resposta.ok) {
      throw new Error(\`Erro HTTP: \${resposta.status}\`);
    }
    
    const dados = await resposta.json();
    
    // ViaCEP retorna { erro: true } para CEPs inexistentes
    if (dados.erro) {
      throw new Error('CEP não encontrado nos Correios.');
    }
    
    return {
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    };
    
  } catch (erro) {
    // Captura: falha de rede, CEP inválido, erro HTTP
    console.error('[BuscaCEP]', erro.message);
    throw erro; // Relança para o chamador decidir
  }
};

// Uso na página
document.getElementById('btn-buscar').addEventListener('click', async () => {
  const cep = document.getElementById('input-cep').value;
  const div = document.getElementById('resultado');
  
  div.textContent = 'Buscando...';
  
  try {
    const endereco = await buscarEnderecoPorCep(cep);
    div.innerHTML = \`
      <strong>\${endereco.rua}</strong><br>
      \${endereco.bairro} — \${endereco.cidade}/\${endereco.estado}
    \`;
  } catch (e) {
    div.textContent = 'Erro: ' + e.message;
  }
});`,
        resources: {
          videos: [
            { title: "Fetch API e Async/Await — Traversy Media (legendado)", url: "https://www.youtube.com/watch?v=q28lfkBd9F4", duration: "30min" },
            { title: "JavaScript Assíncrono completo — Rocketseat", url: "https://www.youtube.com/watch?v=-pQ2d0z-8r4", duration: "45min" }
          ],
          docs: [
            { title: "MDN — Como usar Promises", url: "https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises" },
            { title: "javascript.info — async/await", url: "https://javascript.info/async-await" }
          ]
        },
        quiz: {
          question: "Você fez um fetch() para uma API e recebeu uma resposta. O response.ok retornou FALSE (status 404). O que acontece automaticamente?",
          options: [
            { text: "O bloco catch() é acionado automaticamente", correct: false },
            { text: "A Promise é rejeitada e o erro é capturado pelo try/catch", correct: false },
            { text: "Nada — o fetch() resolve normalmente. É necessário verificar response.ok e lançar o erro manualmente", correct: true },
            { text: "O JavaScript exibe um alert() ao usuário automaticamente", correct: false }
          ],
          explanation: "Esta é a armadilha mais comum com fetch(). Ele só rejeita a Promise em falhas de REDE (internet off, CORS, timeout). Erros HTTP (404, 500) são respostas válidas para o fetch — você deve checar response.ok e lançar um erro manualmente com throw new Error()."
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
            { title: "PHP para Iniciantes — Traversy Media (EN)", url: "https://www.youtube.com/watch?v=oJbfyzaA2QA", duration: "1h 10min" },
            { title: "Curso PHP Completo — Hora de Codar", url: "https://www.youtube.com/watch?v=6qafpEI8lcU", duration: "3h" }
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
            { title: "Formulários com PHP — Curso em Vídeo", url: "https://www.youtube.com/watch?v=tZf2mIAXTLw", duration: "40min" }
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
            { title: "PDO e SQL Injection — Traversy Media (EN)", url: "https://www.youtube.com/watch?v=kEW6f7Pilc4", duration: "35min" }
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
      },
      {
        id: "php-oo",
        title: "4. PHP Orientado a Objetos (POO)",
        level: "Avançado",
        badge: "POO",
        description: "Domine Classes, Objetos, Encapsulamento e Herança para construir código PHP organizado e reutilizável.",
        content: `
          <p>A <strong>Programação Orientada a Objetos (POO)</strong> é o paradigma dominante no desenvolvimento web profissional. Em vez de funções soltas e variáveis globais, organizamos o código em <strong>Classes</strong> (moldes) e <strong>Objetos</strong> (instâncias concretas).</p>

          <h4>Por que usar POO?</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><strong>Organização:</strong> Cada classe tem uma responsabilidade clara (ex: a classe <code>Aluno</code> gerencia apenas dados de alunos).</li>
            <li><strong>Reutilização:</strong> Escreva uma vez, use em qualquer lugar.</li>
            <li><strong>Encapsulamento:</strong> Protege os dados internos contra modificações acidentais.</li>
          </ul>

          <h4>Visibilidade das Propriedades:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>public</code> — Acessível de qualquer lugar.</li>
            <li><code>private</code> — Somente dentro da própria classe. Use para dados sensíveis.</li>
            <li><code>protected</code> — Acessível na classe e suas subclasses (herança).</li>
          </ul>

          <h4>Getters e Setters:</h4>
          <p>Métodos públicos que controlam o acesso às propriedades privadas, permitindo <strong>validação</strong> antes de salvar um valor (ex: "a idade não pode ser negativa").</p>

          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4 text-blue-300 text-sm">
            💡 <strong>Regra de Clean Code:</strong> Sempre declare propriedades como <code>private</code> por padrão e exponha apenas o que for necessário via métodos públicos.
          </div>
        `,
        demoCode: `<?php
// Arquivo: Aluno.php

class Aluno {
    // Propriedades privadas: só acessíveis dentro da classe
    private string $nome;
    private string $matricula;
    private int $idade;

    // __construct: executado automaticamente com "new Aluno()"
    public function __construct(string $nome, string $matricula, int $idade) {
        // Usa o setter para forçar validação já na criação!
        $this->setNome($nome);
        $this->matricula = $matricula;
        $this->setIdade($idade);
    }

    // SETTER com validação de negócio
    public function setNome(string $nome): void {
        if (mb_strlen(trim($nome)) < 2) {
            throw new InvalidArgumentException("Nome muito curto.");
        }
        $this->nome = htmlspecialchars(trim($nome));
    }

    public function setIdade(int $idade): void {
        if ($idade < 0 || $idade > 120) {
            throw new InvalidArgumentException("Idade inválida: $idade");
        }
        $this->idade = $idade;
    }

    // GETTERS para leitura pública
    public function getNome(): string { return $this->nome; }
    public function getIdade(): int { return $this->idade; }

    // Método de comportamento do objeto
    public function apresentar(): string {
        return "{$this->nome} | Matrícula: {$this->matricula} | Idade: {$this->idade}";
    }
}

// Instanciando o objeto
try {
    $aluno = new Aluno("Felipe Santos", "2026-001", 22);
    echo $aluno->apresentar();
    // Saída: Felipe Santos | Matrícula: 2026-001 | Idade: 22
    
    // $aluno->nome = "Hack"; // ERRO FATAL — private!
    // $aluno->setIdade(-5); // Lança InvalidArgumentException
    
} catch (InvalidArgumentException $e) {
    echo "Erro: " . $e->getMessage();
}
?>`,
        resources: {
          videos: [
            { title: "PHP OO Completo — Hora de Codar", url: "https://www.youtube.com/watch?v=6qafpEI8lcU", duration: "2h 30min" },
            { title: "Orientação a Objetos em PHP — Laracasts (EN)", url: "https://www.youtube.com/watch?v=hzy_P_H-1CQ", duration: "25min" }
          ],
          docs: [
            { title: "PHP Manual — Classes e Objetos", url: "https://www.php.net/manual/pt_BR/language.oop5.php" },
            { title: "PHP do Zero ao Avançado — Dev Media", url: "https://www.devmedia.com.br/php-orientado-a-objetos/26762" }
          ]
        },
        quiz: {
          question: "Por que é uma boa prática declarar propriedades de uma classe PHP como 'private' ao invés de 'public'?",
          options: [
            { text: "Propriedades private são processadas mais rápido pelo PHP", correct: false },
            { text: "Propriedades private impedem que código externo modifique os dados diretamente sem passar pela validação dos setters", correct: true },
            { text: "Propriedades private são obrigatórias para que o construtor funcione", correct: false },
            { text: "Não há diferença prática — é apenas uma questão de estilo", correct: false }
          ],
          explanation: "Encapsulamento garante que os dados de um objeto só sejam alterados de forma controlada. Com private, qualquer modificação passa obrigatoriamente pelo setter, onde você pode validar regras de negócio (ex: bloquear idades negativas) antes de persistir o valor."
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
            { title: "MySQL: INSERT, UPDATE e DELETE", url: "https://www.youtube.com/watch?v=wXViczeTr6Q", duration: "45min" }
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
      },
      {
        id: "mysql-normalizacao",
        title: "3. Normalização e Relacionamentos",
        level: "Intermediário",
        badge: "Modelagem",
        description: "Projete bancos de dados eficientes com chaves estrangeiras e as Formas Normais (1FN → 3FN).",
        content: `
          <p>Um banco de dados mal projetado <strong>armazena dados duplicados</strong>, tornando as atualizações trabalhosas e propensas a inconsistências. A <strong>Normalização</strong> é o processo de organizar as tabelas para eliminar redundância.</p>

          <h4>O Problema da Não-Normalização:</h4>
          <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4 text-red-300 text-sm">
            ❌ <strong>Problema:</strong> Imagina uma tabela de pedidos com as colunas: <code>id | cliente_nome | cliente_email | produto | preco</code>. Se o cliente mudar o e-mail, você precisa atualizar TODOS os pedidos dele. Se deletar o último pedido, você perde o cadastro do cliente!
          </div>

          <h4>1FN — Primeira Forma Normal (Atomicidade):</h4>
          <p>Cada coluna deve ter um único valor atômico. Proibido guardar listas separadas por vírgula em uma célula (ex: <code>cursos: "HTML,CSS,PHP"</code>). Crie uma tabela separada para relacionar.</p>

          <h4>2FN — Segunda Forma Normal (Dependência Total):</h4>
          <p>Todos os atributos não-chave devem depender da chave primária <em>inteira</em>. Elimina dependências parciais em chaves compostas.</p>

          <h4>3FN — Terceira Forma Normal (Sem Dependências Transitivas):</h4>
          <p>Atributos não-chave não podem depender de outros atributos não-chave. Se <em>nome_cidade</em> depende de <em>cep</em>, que por sua vez depende de <em>id</em> — mova <em>nome_cidade</em> para uma tabela de CEPs.</p>

          <h4>Chave Estrangeira (FOREIGN KEY):</h4>
          <p>Garante integridade referencial. Se você tem um pedido com <code>cliente_id = 5</code>, o MySQL <strong>impede deletar</strong> o cliente 5 enquanto existirem pedidos vinculados.</p>
        `,
        demoCode: `-- ANTES da normalização (problema):
-- pedidos: id | cliente_nome | cliente_email | produto_nome | produto_preco
-- Se o email mudar → atualizar TODAS as linhas!

-- DEPOIS da normalização (correto):

-- Tabela de Clientes (responsabilidade: dados do cliente)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL CHECK (preco > 0)
);

-- Tabela de Pedidos (armazena APENAS a relação + dados únicos do pedido)
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT DEFAULT 1,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves estrangeiras garantem integridade
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE RESTRICT    -- Impede deletar cliente com pedidos
        ON UPDATE CASCADE,    -- Atualiza automaticamente se o ID mudar
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
        ON DELETE RESTRICT
);

-- Agora, mudar o email do cliente → 1 UPDATE apenas na tabela clientes!
UPDATE clientes SET email = 'novo@email.com' WHERE id = 5;`,
        resources: {
          videos: [
            { title: "Normalização de Banco de Dados — Bóson Treinamentos", url: "https://www.youtube.com/watch?v=NpG1Xt8LB_c", duration: "40min" },
            { title: "Modelo Relacional e Chaves Estrangeiras", url: "https://www.youtube.com/watch?v=m4mXM99xKng", duration: "25min" }
          ],
          docs: [
            { title: "MySQL — FOREIGN KEY Constraints", url: "https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html" },
            { title: "Guia de Normalização — W3Schools", url: "https://www.w3schools.com/sql/sql_ref_normalization.asp" }
          ]
        },
        quiz: {
          question: "Qual é a principal função de uma FOREIGN KEY (Chave Estrangeira) em um banco de dados relacional?",
          options: [
            { text: "Criar um índice automático para acelerar consultas", correct: false },
            { text: "Garantir a integridade referencial — impedir que um registro filho aponte para um pai inexistente", correct: true },
            { text: "Criptografar os dados armazenados na coluna", correct: false },
            { text: "Criar uma coluna de identificação única auto-incrementada", correct: false }
          ],
          explanation: "A FOREIGN KEY estabelece um vínculo entre tabelas. Se cliente_id em pedidos referencia clientes.id, o MySQL impede: 1) inserir um pedido com cliente_id que não existe; 2) deletar um cliente que tem pedidos vinculados (com ON DELETE RESTRICT). Isso garante consistência dos dados."
        }
      },
      {
        id: "mysql-joins",
        title: "4. JOINs e Agrupamentos",
        level: "Avançado",
        badge: "Consultas Avançadas",
        description: "Combine dados de múltiplas tabelas com JOINs e crie relatórios com GROUP BY e funções de agregação.",
        content: `
          <p>No banco normalizado, os dados estão em tabelas separadas. O <strong>JOIN</strong> é o mecanismo SQL para combiná-los em uma única consulta, sem duplicar dados no banco.</p>

          <h4>Tipos de JOIN:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><code>INNER JOIN</code> — Retorna apenas os registros que têm correspondência nas DUAS tabelas. O mais comum.</li>
            <li><code>LEFT JOIN</code> — Retorna TODOS os registros da tabela esquerda, mesmo sem correspondência na direita (resulta em NULL).</li>
            <li><code>RIGHT JOIN</code> — O oposto do LEFT JOIN. Menos usado.</li>
          </ul>

          <h4>Funções de Agregação com GROUP BY:</h4>
          <p>Agrupam linhas e calculam estatísticas: <code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MAX()</code>, <code>MIN()</code>.</p>

          <h4>Quando usar LEFT JOIN vs INNER JOIN:</h4>
          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4 text-blue-300 text-sm">
            💡 <strong>Regra prática:</strong> Use INNER JOIN quando ambos os lados sempre terão correspondência (pedido sempre tem cliente). Use LEFT JOIN quando o lado direito pode não existir (listar todos os clientes, mesmo sem pedidos).
          </div>
        `,
        demoCode: `-- Exemplo 1: INNER JOIN - Buscar pedidos com dados do cliente e produto
SELECT 
    p.id           AS pedido_id,
    c.nome         AS cliente,
    c.email        AS email_cliente,
    pr.nome        AS produto,
    pr.preco       AS valor_unitario,
    p.quantidade,
    (pr.preco * p.quantidade) AS total,
    p.criado_em
FROM pedidos p
    INNER JOIN clientes c  ON p.cliente_id = c.id
    INNER JOIN produtos  pr ON p.produto_id  = pr.id
WHERE p.criado_em >= '2026-01-01'
ORDER BY p.criado_em DESC;

-- Exemplo 2: LEFT JOIN - Clientes SEM nenhum pedido
SELECT 
    c.id, 
    c.nome, 
    c.email,
    COUNT(p.id) AS total_pedidos  -- 0 para clientes sem pedidos
FROM clientes c
    LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nome, c.email
HAVING COUNT(p.id) = 0;  -- Filtra apenas os sem pedidos

-- Exemplo 3: Relatório de vendas por produto (GROUP BY + SUM)
SELECT 
    pr.nome                          AS produto,
    COUNT(p.id)                      AS qtd_pedidos,
    SUM(p.quantidade)                AS unidades_vendidas,
    SUM(pr.preco * p.quantidade)     AS faturamento_total,
    AVG(pr.preco * p.quantidade)     AS ticket_medio
FROM pedidos p
    INNER JOIN produtos pr ON p.produto_id = pr.id
GROUP BY pr.id, pr.nome
ORDER BY faturamento_total DESC
LIMIT 10;  -- Top 10 produtos mais vendidos`,
        resources: {
          videos: [
            { title: "SQL JOINs explicados — Bóson Treinamentos", url: "https://www.youtube.com/watch?v=4nbECYDlAwc", duration: "35min" },
            { title: "GROUP BY e Funções de Agregação em SQL", url: "https://www.youtube.com/watch?v=jiQhZ6v3pMU", duration: "20min" }
          ],
          docs: [
            { title: "MySQL — JOIN Syntax", url: "https://dev.mysql.com/doc/refman/8.0/en/join.html" },
            { title: "SQL JOINs Guia Visual — W3Schools", url: "https://www.w3schools.com/sql/sql_join.asp" }
          ]
        },
        quiz: {
          question: "Você quer listar TODOS os clientes, incluindo os que nunca fizeram pedidos (mostrando 0 no campo de total). Qual tipo de JOIN é correto?",
          options: [
            { text: "INNER JOIN — retorna apenas linhas com correspondência nas duas tabelas", correct: false },
            { text: "LEFT JOIN — retorna todos da tabela esquerda (clientes), com NULL onde não há pedidos", correct: true },
            { text: "RIGHT JOIN — retorna todos da tabela direita (pedidos)", correct: false },
            { text: "CROSS JOIN — combina cada cliente com cada pedido", correct: false }
          ],
          explanation: "LEFT JOIN (ou LEFT OUTER JOIN) retorna TODOS os registros da tabela à esquerda (clientes) e os campos correspondentes da tabela da direita (pedidos). Para clientes sem pedidos, as colunas de pedidos retornam NULL — que podemos converter em 0 com COUNT() ou COALESCE()."
        }
      },
      {
        id: "final-crud-project",
        type: "project",
        title: "Projeto Final: Sistema CRUD (PHP + MySQL)",
        level: "Master",
        badge: "Desafio Final",
        description: "Desenvolva um sistema completo de gestão conectando HTML, CSS, PHP puro e MySQL para obter seu certificado.",
        content: `
          <h4>Sua Missão Final</h4>
          <p>Para obter a sua certificação WebDev Pro, você deverá construir um <strong>Sistema de Gestão (CRUD)</strong> utilizando o conhecimento adquirido nas etapas obrigatórias.</p>
          
          <h4>Requisitos do Projeto:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300">
            <li><strong>Frontend:</strong> Interface visual em HTML e CSS (JavaScript é totalmente opcional).</li>
            <li><strong>Backend:</strong> Lógica estruturada em PHP puro.</li>
            <li><strong>Banco de Dados:</strong> MySQL (no mínimo 1 tabela para as operações).</li>
            <li><strong>Operações Obrigatórias (CRUD):</strong>
              <ul class="list-disc pl-6 mt-2 text-slate-400">
                <li>Create: Inserir novos registros.</li>
                <li>Read: Listar os registros cadastrados na interface.</li>
                <li>Update: Editar um registro existente.</li>
                <li>Delete: Excluir um registro do banco.</li>
              </ul>
            </li>
          </ul>

          <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 my-4 text-amber-300 text-sm">
            💡 <strong>Dica:</strong> Pode ser um sistema de gerenciamento de tarefas, cadastro de produtos ou um pequeno blog. O tema é livre!
          </div>

          <h4>Instruções de Entrega:</h4>
          <p>Crie uma pasta com todos os seus arquivos, incluindo um arquivo <code>.sql</code> ou as queries para criarmos a sua tabela. Compacte a pasta em <code>.zip</code> e envie abaixo. Assim que o administrador aprovar seu projeto, você poderá emitir o seu certificado!</p>
        `
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
    optional: true,
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
            { title: "Instalando Laragon — Configuração Completa", url: "https://www.youtube.com/watch?v=CIhbm6xjEOs", duration: "20min" },
            { title: "Laragon Full Setup — Dev Hints", url: "https://www.youtube.com/watch?v=CIhbm6xjEOs", duration: "15min" }
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
            { title: "Criando primeiro projeto Laravel — Laracasts", url: "https://www.youtube.com/watch?v=1NjOWtQ7S2o", duration: "25min" },
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
    optional: true,
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
            { title: "Laravel e MySQL — Configuração Completa", url: "https://www.youtube.com/watch?v=J4UbaSMVj-M", duration: "20min" }
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
            { title: "Eloquent ORM Completo — Laracasts", url: "https://www.youtube.com/watch?v=gHQ-OT8V5VU", duration: "45min" }
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
      },
      {
        id: "laravel-scopes",
        title: "3. Eloquent Avançado: Scopes e Relacionamentos",
        level: "Avançado",
        badge: "ORM Avançado",
        description: "Encapsule consultas complexas com Query Scopes e domine relacionamentos (HasMany, BelongsTo) com Eager Loading.",
        content: `
          <h4>Query Scopes</h4>
          <p>Scopes permitem que você encapsule lógicas de consulta comuns dentro do seu Model, tornando o código do Controller muito mais limpo e legível. Em vez de repetir <code>where('ativo', 1)->where('estoque', '>', 0)</code> em vários lugares, você cria um scope <code>ativosEComEstoque()</code>.</p>

          <h4>Relacionamentos no Eloquent</h4>
          <p>O Eloquent facilita o relacionamento entre tabelas sem precisar escrever SQL JOINs complexos:</p>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300 text-sm">
            <li><code>hasMany()</code> — Um para Muitos (Ex: Um Cliente tem muitos Pedidos).</li>
            <li><code>belongsTo()</code> — Pertence a (Ex: O Pedido pertence a um Cliente).</li>
          </ul>

          <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4 text-red-300 text-sm">
            ⚠️ <strong>O Problema do N+1:</strong> Se você buscar 100 pedidos e, dentro de um loop, tentar acessar o cliente de cada um, o Laravel fará 1 consulta + 100 consultas = 101 queries! Resolva isso com <strong>Eager Loading</strong> usando o método <code>with('cliente')</code>.
          </div>
        `,
        demoCode: `// 1. Definindo Scopes e Relacionamentos no Model
class Produto extends Model
{
    // Local Scope (prefixo 'scope')
    public function scopeDisponiveis($query)
    {
        return $query->where('ativo', true)
                     ->where('estoque', '>', 0);
    }

    // Relacionamento (Um Produto pertence a uma Categoria)
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}

// 2. Usando no Controller
// Usando o scope 'disponiveis' e Eager Loading (with) para evitar N+1
$produtos = Produto::with('categoria')
                   ->disponiveis()
                   ->orderBy('preco', 'asc')
                   ->get();

// Na view (Blade), acessar a categoria não fará nova query SQL!
// {{ $produto->categoria->nome }}`,
        resources: {
          videos: [
            { title: "Laravel Eager Loading (Evitando N+1) — Coder's Tape", url: "https://www.youtube.com/watch?v=bZlvzvGpCEE", duration: "18min" }
          ],
          docs: [
            { title: "Laravel — Local Scopes", url: "https://laravel.com/docs/11.x/eloquent#local-scopes" },
            { title: "Laravel — Eloquent Relationships", url: "https://laravel.com/docs/11.x/eloquent-relationships" }
          ]
        },
        quiz: {
          question: "Como o Laravel resolve o problema clássico de 'N+1 queries' ao listar itens e seus relacionamentos (ex: listar 50 posts e o autor de cada post)?",
          options: [
            { text: "Aumentando a memória RAM do PHP no servidor", correct: false },
            { text: "Usando o método with() (Eager Loading) para carregar os relacionamentos na consulta principal", correct: true },
            { text: "O Laravel resolve o problema sozinho magicamente, não é preciso fazer nada", correct: false },
            { text: "Usando Raw SQL para escrever JOINs manuais", correct: false }
          ],
          explanation: "O Eager Loading (carregamento antecipado) através do método with('relacionamento') reduz drasticamente o número de queries de N+1 para apenas 2 queries: uma para buscar os posts e outra (usando WHERE IN) para buscar todos os autores correspondentes."
        }
      },
      {
        id: "laravel-requests",
        title: "4. Validação e Form Requests",
        level: "Intermediário",
        badge: "Segurança",
        description: "Isole a lógica de validação de formulários fora do Controller usando Form Requests.",
        content: `
          <p>O Laravel facilita a validação de dados recebidos (POST/PUT). Em vez de poluir seu Controller com dezenas de regras de "if/else", a melhor prática de Clean Code é usar <strong>Form Requests</strong>.</p>

          <h4>O que é um Form Request?</h4>
          <p>É uma classe dedicada à validação de uma requisição específica (ex: <code>StoreProdutoRequest</code>). O Laravel a executa <em>antes</em> mesmo de o código chegar no Controller!</p>

          <h4>Vantagens:</h4>
          <ul class="list-disc pl-6 space-y-2 my-3 text-slate-300 text-sm">
            <li><strong>Separação de Responsabilidades:</strong> O Controller foca apenas no fluxo de negócio.</li>
            <li><strong>Reutilização:</strong> Regras de validação centralizadas.</li>
            <li><strong>Autorização embutida:</strong> Possui um método <code>authorize()</code> para verificar se o usuário tem permissão para a ação.</li>
          </ul>

          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4 text-blue-300 text-sm">
            💡 <strong>Comando mágico:</strong> <code>php artisan make:request StoreProdutoRequest</code>
          </div>
        `,
        demoCode: `// 1. Criando o Form Request
// app/Http/Requests/StoreProdutoRequest.php
class StoreProdutoRequest extends FormRequest
{
    public function authorize()
    {
        // Apenas admins podem criar produtos
        return auth()->user()->is_admin;
    }

    public function rules()
    {
        return [
            'nome' => 'required|string|min:3|max:100|unique:produtos',
            'preco' => 'required|numeric|min:0.01',
            'categoria_id' => 'required|exists:categorias,id'
        ];
    }
    
    public function messages()
    {
        return [
            'nome.required' => 'O nome do produto é obrigatório!',
            'nome.unique' => 'Já existe um produto com este nome.'
        ];
    }
}

// 2. Usando no Controller
// A injeção de dependência já valida automaticamente!
public function store(StoreProdutoRequest $request)
{
    // Se chegou aqui, os dados estão válidos E o usuário é admin!
    
    // Pega apenas os dados validados de forma segura
    $dados = $request->validated();
    
    Produto::create($dados);
    
    return redirect()->route('produtos.index')
                     ->with('sucesso', 'Produto salvo com sucesso!');
}`,
        resources: {
          videos: [
            { title: "Laravel Form Requests explicados — Laravel Daily", url: "https://www.youtube.com/watch?v=YK8GZmuf8_0", duration: "12min" }
          ],
          docs: [
            { title: "Laravel — Form Request Validation", url: "https://laravel.com/docs/11.x/validation#form-request-validation" }
          ]
        },
        quiz: {
          question: "No padrão de Form Requests do Laravel, o que acontece se a validação (rules) falhar ao enviar um formulário pelo navegador?",
          options: [
            { text: "A aplicação retorna uma tela de Erro 500 (Internal Server Error)", correct: false },
            { text: "O código do Controller é executado, mas com os campos inválidos nulos", correct: false },
            { text: "O Laravel redireciona automaticamente o usuário de volta à página anterior, injetando as mensagens de erro na sessão ($errors)", correct: true },
            { text: "Um modal de erro em JavaScript aparece na tela", correct: false }
          ],
          explanation: "Esta é a magia do Laravel: se a validação do Form Request falhar, ele lança uma ValidationException que é interceptada pelo framework. O usuário é redirecionado de volta ao formulário automaticamente e a variável $errors fica disponível no Blade para exibir as mensagens."
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
    optional: true,
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
            { title: "Laravel Routes e Controllers — Matheus Battisti", url: "https://www.youtube.com/watch?v=qH7rsZBENJo", duration: "30min" }
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
            { title: "Blade Templates Completo — Laravel Daily", url: "https://www.youtube.com/watch?v=CKiDWra20P0", duration: "35min" }
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
    optional: true,
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
            { title: "Laravel CRUD do Zero — Laracasts (EN)", url: "https://www.youtube.com/watch?v=gq3dn_lmc-0", duration: "1h" }
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
            { title: "Laravel Breeze — Autenticação Completa", url: "https://www.youtube.com/watch?v=layAvwbXGYI", duration: "40min" }
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
      },
      {
        id: "laravel-prg-csrf",
        title: "3. Padrão PRG, CSRF e Transações DB",
        level: "Master",
        badge: "Arquitetura",
        description: "Construa sistemas blindados contra ataques CSRF, duplicação de dados e inconsistências de banco de dados.",
        content: `
          <h4>1. Padrão PRG (Post/Redirect/Get)</h4>
          <p>Você já preencheu um formulário, recarregou a página (F5) e o navegador perguntou "Deseja reenviar o formulário?"? Isso acontece quando o sistema não usa o padrão <strong>PRG</strong>.</p>
          <p>Sempre que processar um <code>POST</code>, você <strong>nunca</strong> deve retornar uma View diretamente. Você deve fazer um <strong>Redirect</strong> para uma rota <code>GET</code>. O Laravel incentiva isso nativamente.</p>

          <h4>2. CSRF (Cross-Site Request Forgery)</h4>
          <p>É um ataque onde um site malicioso força o usuário (que está logado no seu sistema) a executar ações indesejadas (ex: apagar a conta). O Laravel protege formulários gerando um <strong>Token CSRF único</strong> na sessão.</p>
          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4 text-blue-300 text-sm">
            💡 <strong>Regra:</strong> Todo formulário POST, PUT ou DELETE no Laravel exige a diretiva <code>@csrf</code>, senão ele retorna Erro 419 (Page Expired).
          </div>

          <h4>3. Transações de Banco de Dados (DB Transactions)</h4>
          <p>Quando uma ação precisa salvar em MÚLTIPLAS tabelas (ex: criar Pedido e atualizar Estoque), se o estoque falhar, o Pedido deve ser desfeito (Rollback) para evitar inconsistência. Transações garantem que as operações sejam <strong>Atômicas</strong> (Tudo funciona, ou nada funciona).</p>
        `,
        demoCode: `<!-- 1. Prevenção CSRF no Formulário (Blade) -->
<form action="/pedidos" method="POST">
    @csrf <!-- ESSENCIAL! Gera o token escondido -->
    <button type="submit">Finalizar Compra</button>
</form>

<?php
// 2. Controller com Padrão PRG e DB Transaction
use Illuminate\\Support\\Facades\\DB;

public function store(Request $request)
{
    // Validação
    $dados = $request->validate([...]);

    try {
        // Inicia a Transação: NADA é salvo no banco permanentemente ainda
        DB::beginTransaction();

        // Operação 1: Criar Pedido
        $pedido = Pedido::create($dados);

        // Operação 2: Atualizar Estoque do Produto
        $produto = Produto::find($dados['produto_id']);
        if ($produto->estoque < 1) {
            // Lança exceção para cancelar TUDO
            throw new \\Exception('Produto sem estoque!'); 
        }
        $produto->decrement('estoque');

        // Confirma todas as operações de uma vez!
        DB::commit();

        // 3. Padrão PRG (Redirect GET)
        return redirect()->route('pedidos.show', $pedido->id)
                         ->with('sucesso', 'Pedido criado!');

    } catch (\\Exception $e) {
        // Se QUALQUER coisa falhar, desfaz o pedido criado
        DB::rollBack();

        // Redireciona de volta com o erro
        return back()->with('erro', $e->getMessage());
    }
}`,
        resources: {
          videos: [
            { title: "Ataque CSRF Explicado e como o Laravel previne", url: "https://www.youtube.com/watch?v=ikjo5JUcTf4", duration: "10min" },
            { title: "Database Transactions em Laravel — Povilas Korop", url: "https://www.youtube.com/watch?v=D4a4XdL3XnE", duration: "12min" }
          ],
          docs: [
            { title: "Laravel — CSRF Protection", url: "https://laravel.com/docs/11.x/csrf" },
            { title: "Laravel — Database Transactions", url: "https://laravel.com/docs/11.x/database#database-transactions" }
          ]
        },
        quiz: {
          question: "Qual mecanismo o Laravel usa para garantir que operações em múltiplas tabelas (ex: transferir dinheiro de uma conta A para a conta B) funcionem perfeitamente em conjunto ou falhem em conjunto sem alterar o banco?",
          options: [
            { text: "Padrão PRG (Post/Redirect/Get)", correct: false },
            { text: "Tokens CSRF na sessão", correct: false },
            { text: "DB Transactions (beginTransaction, commit, rollBack)", correct: true },
            { text: "Middlewares de validação customizados", correct: false }
          ],
          explanation: "DB Transactions garantem a propriedade de Atomicidade no banco de dados. DB::beginTransaction() inicia a transação. Se todas as ações ocorrerem com sucesso, DB::commit() as salva definitivamente. Se houver falha, DB::rollBack() desfaz as ações anteriores não confirmadas."
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

export function isStageUnlocked(stageIndex, stages, completedLessons, submittedStages = []) {
  if (stageIndex === 0) return true;
  
  const prev = stages[stageIndex - 1];
  if (prev.optional) {
    return isStageUnlocked(stageIndex - 1, stages, completedLessons, submittedStages);
  }
  
  const prevStatus = getStageStatus(prev, completedLessons);
  if (prevStatus === 'done') return true;

  // Se o aluno enviou o projeto da etapa anterior, libera a próxima etapa.
  if (submittedStages.includes(prev.id)) {
    return true;
  }
  
  return false;
}

// Legado — mantido para não quebrar imports antigos durante a transição
export const CURRICULUM_DATA = {};
