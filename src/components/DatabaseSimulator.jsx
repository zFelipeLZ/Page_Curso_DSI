import { useState, useEffect } from 'react';
import { Database, Play, RotateCcw, Terminal, Table, BookOpen, AlertTriangle } from 'lucide-react';

const INITIAL_DATABASE = [
  { id: 1, nome: 'Felipe Louzeiro', linguagem: 'PHP', nota: 9.5, vip: true },
  { id: 2, nome: 'Ana Silva', linguagem: 'JS', nota: 8.0, vip: false },
  { id: 3, nome: 'Carlos Mendes', linguagem: 'CSS', nota: 7.5, vip: false },
  { id: 4, nome: 'Mariana Costa', linguagem: 'PHP', nota: 10.0, vip: true },
  { id: 5, nome: 'João Souza', linguagem: 'HTML', nota: 6.5, vip: false },
  { id: 6, nome: 'Beatriz Lima', linguagem: 'JS', nota: 9.0, vip: true },
  { id: 7, nome: 'Lucas Almeida', linguagem: 'Laravel', nota: 8.5, vip: false },
  { id: 8, nome: 'Fernanda Rocha', linguagem: 'JS', nota: 5.5, vip: false },
];

const SQL_TEMPLATES = [
  {
    name: "Buscar todos os alunos",
    query: "SELECT * FROM estudantes;",
    desc: "Consulta padrão que retorna todos os registros de colunas e linhas da tabela 'estudantes'."
  },
  {
    name: "Alunos com nota alta (> 8)",
    query: "SELECT * FROM estudantes WHERE nota > 8;",
    desc: "Aplica o filtro WHERE na coluna 'nota' para extrair apenas alunos com desempenho acima da média."
  },
  {
    name: "Especialistas em JavaScript",
    query: "SELECT * FROM estudantes WHERE linguagem = 'JS';",
    desc: "Aplica filtro textual exato. Filtra e extrai alunos cujo campo de linguagem de estudo seja 'JS'."
  },
  {
    name: "Alunos com assinatura VIP",
    query: "SELECT * FROM estudantes WHERE vip = 1;",
    desc: "Filtra por valores booleanos ou binários (1 = verdadeiro / 0 = falso) na coluna 'vip'."
  }
];

export default function DatabaseSimulator() {
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM estudantes;");
  const [results, setResults] = useState(INITIAL_DATABASE);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Initial load log
    setLogs([{
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'info',
      text: "Conexão com Banco de Dados simulado iniciada com sucesso. Tabela 'estudantes' pronta!"
    }]);
  }, []);

  const handleRunSQL = () => {
    setErrorMsg(null);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    try {
      const cleanSql = sqlQuery.trim().replace(/;$/, '').toLowerCase();
      
      if (!cleanSql.startsWith('select')) {
        throw new Error("Apenas comandos de leitura 'SELECT' são suportados neste laboratório didático por motivos de segurança.");
      }

      if (!cleanSql.includes('from estudantes')) {
        throw new Error("Tabela não encontrada! Certifique-se de realizar a consulta na tabela 'estudantes'. Ex: FROM estudantes");
      }

      let filteredData = [];

      if (cleanSql === 'select * from estudantes') {
        filteredData = INITIAL_DATABASE;
      } else {
        // Matches: select * from estudantes where col operator val
        const matchWhere = cleanSql.match(/select\s+\*\s+from\s+estudantes\s+where\s+([a-zA-Z0-9_]+)\s*([=>^<!]+)\s*(['"]?.*?['"]?)$/i);
        
        if (matchWhere) {
          const column = matchWhere[1].trim().toLowerCase();
          const operator = matchWhere[2].trim();
          let value = matchWhere[3].trim().replace(/['"]/g, ''); // strip quotes
          
          filteredData = INITIAL_DATABASE.filter(row => {
            let rowValue = row[column];
            if (rowValue === undefined) {
              const mappedCol = Object.keys(row).find(k => k.toLowerCase() === column);
              if (mappedCol) rowValue = row[mappedCol];
            }
            if (rowValue === undefined) return false;

            // Boolean conversions
            if (column === 'vip') {
              const boolVal = (value === '1' || value === 'true');
              return operator === '=' ? rowValue === boolVal : rowValue !== boolVal;
            }

            // Number comparisons
            if (!isNaN(rowValue) && !isNaN(value)) {
              const rNum = Number(rowValue);
              const vNum = Number(value);
              if (operator === '=') return rNum === vNum;
              if (operator === '>') return rNum > vNum;
              if (operator === '<') return rNum < vNum;
              if (operator === '>=') return rNum >= vNum;
              if (operator === '<=') return rNum <= vNum;
              if (operator === '!=') return rNum !== vNum;
            }

            // String comparisons
            const rStr = String(rowValue).toLowerCase();
            const vStr = String(value).toLowerCase();
            if (operator === '=') return rStr === vStr;
            if (operator === '!=') return rStr !== vStr;
            return false;
          });
        } else {
          throw new Error("Estrutura da cláusula 'WHERE' inválida. Use filtros como: WHERE nota > 8 ou WHERE linguagem = 'JS'");
        }
      }

      setResults(filteredData);
      setLogs(prev => [
        {
          time: timeStr,
          type: 'success',
          text: `Query executada com sucesso! ${filteredData.length} registros retornados.`
        },
        ...prev
      ]);

    } catch (err) {
      setErrorMsg(err.message);
      setLogs(prev => [
        {
          time: timeStr,
          type: 'error',
          text: `Erro SQL: ${err.message}`
        },
        ...prev
      ]);
    }
  };

  const handleSelectTemplate = (idx) => {
    setActiveTemplateIdx(idx);
    setSqlQuery(SQL_TEMPLATES[idx].query);
    setErrorMsg(null);
  };

  const handleReset = () => {
    setSqlQuery("SELECT * FROM estudantes;");
    setResults(INITIAL_DATABASE);
    setErrorMsg(null);
    setActiveTemplateIdx(0);
    setLogs(prev => [
      {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: 'info',
        text: "Tabela e terminal redefinidos para os valores iniciais."
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* DB Introduction Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full blur-2xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-lg shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-200">Laboratório e Simulador SQL</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              No Back-End, o PHP se comunica com bancos de dados relacioanais rodando a linguagem **SQL**. Escreva instruções SQL abaixo ou clique nos modelos didáticos para entender como o servidor extrai e filtra dados em tabelas!
            </p>
          </div>
        </div>
      </div>

      {/* SQL Templates selector cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SQL_TEMPLATES.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectTemplate(idx)}
            className={`
              p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-28 hover:bg-slate-900/50
              ${activeTemplateIdx === idx 
                ? 'bg-slate-900 border-cyan-500 glow-css' 
                : 'bg-slate-900/40 border-slate-800'
              }
            `}
          >
            <div>
              <h4 className={`text-xs font-bold ${activeTemplateIdx === idx ? 'text-cyan-400' : 'text-slate-300'}`}>
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight line-clamp-3">
                {item.desc}
              </p>
            </div>
            <code className="text-[9px] text-slate-400 font-mono font-bold truncate w-full mt-2 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-850">
              {item.query}
            </code>
          </button>
        ))}
      </div>

      {/* SQL Editor Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Editor Box */}
        <div className="xl:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
          <div className="bg-slate-900 border-b border-slate-800/80 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/40" />
              <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Console de Query SQL</h4>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleRunSQL}
                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-extrabold rounded-lg flex items-center gap-1.5 shadow-lg shadow-cyan-600/10 cursor-pointer transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Executar SQL
              </button>
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-extrabold rounded-lg flex items-center gap-1.5 border border-slate-700/50 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetar
              </button>
            </div>
          </div>

          {/* SQL Command input */}
          <div className="bg-slate-950/60 p-4 font-mono text-sm h-48 relative">
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              spellCheck="false"
              className="w-full h-full bg-transparent border-none text-slate-300 resize-none outline-none font-mono text-xs md:text-sm leading-relaxed"
              placeholder="-- Digite sua query SQL aqui..."
            />
          </div>

          {/* Guide Explainer Alert */}
          <div className="bg-slate-950 p-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Como o PHP integra com isto?</strong> No PHP real, você utilizaria a classe <code className="text-cyan-400 bg-slate-900 border border-slate-850 px-1 py-0.5 rounded font-mono font-bold">PDO</code> para executar essa mesma instrução: 
              <pre className="mt-2 p-2 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-purple-400 overflow-x-auto">
                {"$stmt = $pdo->query(\"SELECT * FROM estudantes WHERE nota > 8\");\n$alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);"}
              </pre>
            </div>
          </div>
        </div>

        {/* Output Grid and Logs Panel (xl:col-span-5) */}
        <div className="xl:col-span-5 space-y-6">
          {/* SQL Output Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-black/10 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-3">
              <Table className="w-4.5 h-4.5 text-cyan-400" />
              Tabela de Retorno (Banco de Dados)
            </h4>

            {errorMsg && (
              <div className="bg-red-500/10 border-l-4 border-red-500 rounded-r-xl p-4 text-xs font-semibold text-red-400 animate-fade-in flex items-start gap-2">
                <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {!errorMsg && results.length === 0 && (
              <div className="text-xs text-slate-500 italic py-4 text-center">
                A consulta não retornou nenhum registro no banco de dados.
              </div>
            )}

            {!errorMsg && results.length > 0 && (
              <div className="overflow-x-auto border border-slate-800 rounded-xl max-h-56">
                <table className="w-full font-mono text-[11px] text-slate-300">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-500 text-[9px] font-bold uppercase select-none">
                      <th className="py-2.5 px-3 text-left">ID</th>
                      <th className="py-2.5 px-3 text-left">Nome</th>
                      <th className="py-2.5 px-3 text-left">Língua</th>
                      <th className="py-2.5 px-3 text-center">Nota</th>
                      <th className="py-2.5 px-3 text-center">VIP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 bg-slate-950/20">
                    {results.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-800/20">
                        <td className="py-2 px-3 text-slate-500">{row.id}</td>
                        <td className="py-2 px-3 text-slate-200 font-bold">{row.nome}</td>
                        <td className="py-2 px-3">
                          <span className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                            row.linguagem === 'JS' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            row.linguagem === 'PHP' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                            row.linguagem === 'CSS' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {row.linguagem}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center text-emerald-400 font-semibold">{row.nota.toFixed(1)}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                            row.vip ? 'bg-amber-400/10 text-amber-400' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {row.vip ? 'SIM' : 'NÃO'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Emulated DBMS logs console */}
          <div className="h-32 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-lg">
            <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs text-slate-400 select-none font-bold">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Log do Servidor de BD (SGBD)
              </span>
            </div>

            <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-2.5 flex flex-col justify-start">
              {logs.map((log, idx) => {
                let statusColor = 'text-slate-400';
                if (log.type === 'error') statusColor = 'text-red-400';
                if (log.type === 'success') statusColor = 'text-emerald-400';
                if (log.type === 'info') statusColor = 'text-blue-400';
                
                return (
                  <div key={idx} className="flex gap-2 leading-relaxed">
                    <span className="text-slate-600 shrink-0 font-light select-none">[{log.time}]</span>
                    <span className={`${statusColor} break-all whitespace-pre-wrap`}>{log.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
