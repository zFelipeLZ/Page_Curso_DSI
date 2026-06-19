import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI de fallback.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erro
    console.error("ErrorBoundary capturou um erro:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback alternativa
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-slate-200">
          <div className="max-w-2xl bg-slate-900 border border-red-500/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <span className="text-red-500 text-2xl font-black">!</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-400">Oops! Um erro inesperado ocorreu.</h1>
                <p className="text-sm text-slate-400">Isso ajudará a depurar o problema "tela azul escura".</p>
              </div>
            </div>
            
            <div className="bg-slate-950 rounded-xl p-4 overflow-auto border border-slate-800">
              <pre className="text-xs text-red-300 whitespace-pre-wrap font-mono">
                {this.state.error && this.state.error.toString()}
              </pre>
              <pre className="text-[10px] text-slate-500 mt-4 whitespace-pre-wrap font-mono">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors"
              >
                Recarregar a página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
