import { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  RefreshCw, 
  ArrowRight, 
  Clock, 
  Sliders, 
  Cpu,
  FileText,
  Bell,
  Briefcase,
  Check,
  Mic,
  Radar,
  Lock,
  Shield,
  GitCommit,
  Scale
} from 'lucide-react';

interface LogEntry {
  id: string;
  document: string;
  type: 'Petição' | 'Contrato' | 'Parecer' | 'Recurso';
  status: 'Concluído' | 'Análise de Risco' | 'Alerta Crítico' | 'Em Fila';
  riskScore: number;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'risk' | 'system'>('analytics');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', document: 'Contrato de Adesão - Prestação de Serviços S/A', type: 'Contrato', status: 'Alerta Crítico', riskScore: 88, timestamp: '10:42:15' },
    { id: '2', document: 'Petição Inicial - Ação de Cobrança C/C Danos Morais', type: 'Petição', status: 'Concluído', riskScore: 12, timestamp: '10:41:02' },
    { id: '3', document: 'Parecer Jurídico - Fusão & Aquisição Venture Capital', type: 'Parecer', status: 'Análise de Risco', riskScore: 54, timestamp: '10:39:48' },
    { id: '4', document: 'Recurso Extraordinário - Matéria Tributária Constitucional', type: 'Recurso', status: 'Em Fila', riskScore: 20, timestamp: '10:38:12' },
    { id: '5', document: 'Contrato de Mútuo Conversível em Ações - Startup X', type: 'Contrato', status: 'Concluído', riskScore: 8, timestamp: '10:35:00' },
  ]);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(logs[0]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [systemLoad, setSystemLoad] = useState(62);
  const [docCounter, setDocCounter] = useState(1428);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para monitorar o scroll e aplicar cor/efeito ao menu superior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const suitsRef = useRef<HTMLDivElement>(null);
  const [suitsOffsetY, setSuitsOffsetY] = useState(0);

  // Efeito parallax para a imagem de fundo da seção Suits
  useEffect(() => {
    const handleScroll = () => {
      if (!suitsRef.current) return;
      const rect = suitsRef.current.getBoundingClientRect();
      const elemTop = rect.top + window.scrollY;
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (scrollPosition > elemTop) {
        const yOffset = (window.scrollY - elemTop) * 0.12;
        setSuitsOffsetY(yOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para simular atualização em tempo real (Telemetria do Dashboard)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSystemLoad(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const text = prev + delta;
        return Math.max(45, Math.min(85, text));
      });

      setDocCounter(prev => prev + (Math.random() > 0.6 ? 1 : 0));

      setLogs(prevLogs => {
        return prevLogs.map(log => {
          if (log.status === 'Em Fila') {
            return {
              ...log,
              status: Math.random() > 0.5 ? 'Análise de Risco' : 'Concluído',
              riskScore: Math.floor(Math.random() * 40) + 10
            };
          }
          return log;
        });
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleSimulateNewDoc = () => {
    const documentNames = [
      'Acordo de Confidencialidade (NDA) - Parceria Comercial',
      'Contrato de Trabalho - Diretor Executivo C-Level',
      'Petição de Embargos de Declaração - Processo 08412-SP',
      'Minuta de Acordo Societário - Quotas de Sociedade Limitada'
    ];
    const types: ('Petição' | 'Contrato' | 'Parecer' | 'Recurso')[] = ['Contrato', 'Contrato', 'Petição', 'Parecer'];
    
    const randomIndex = Math.floor(Math.random() * documentNames.length);
    const newScore = Math.floor(Math.random() * 100);
    
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newLog: LogEntry = {
      id: String(Date.now()),
      document: documentNames[randomIndex],
      type: types[randomIndex],
      status: 'Em Fila',
      riskScore: newScore,
      timestamp: timeString
    };

    setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    setSelectedLog(newLog);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] text-zinc-800 flex flex-col font-sans selection:bg-zinc-800 selection:text-white antialiased">
      
      {/* Barra Fina de Anúncio no Topo (Idêntica ao site original) */}
      <div className="fixed inset-x-0 top-0 z-[60] hidden h-9 items-center justify-center gap-3 text-[12px] transition-colors duration-300 sm:flex bg-white text-black font-sans font-medium border-b border-zinc-100">
        <span>A plataforma jurídica feita para Advogados vencedores.</span>
        <a className="underline underline-offset-4 hover:no-underline" href="#manifesto">Saber mais</a>
      </div>

      {/* 1. NAVBAR (HEADER) - Fundo dinâmico com a mesma cor e efeito da barra de clientes */}
      <header className={`fixed inset-x-0 z-50 transition-all duration-300 sm:top-9 top-0 border-b text-white ${
        isScrolled 
          ? 'border-white/10 bg-black/40 backdrop-blur-[2px]' 
          : 'border-transparent bg-transparent'
      }`}>
        <div className="relative flex h-16 w-full items-center px-6 sm:px-10 lg:px-14 xl:px-20 max-w-[1480px] mx-auto">
          {/* Logo Serifada Elegante (Peso normal/médio para refinamento) */}
          <a aria-label="Specter — início" className="z-10 flex shrink-0 items-center" href="/">
            <span className="font-serif text-[26px] font-normal leading-none tracking-tight transition-colors duration-300 text-white">Specter</span>
          </a>

          {/* Navigation */}
          <nav aria-label="Navegação principal" className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 md:flex">
            <a href="#plataforma" className="text-[13.5px] tracking-[0.005em] transition-colors duration-200 text-white/80 hover:text-white font-normal">Plataforma</a>
            <a href="#solucoes" className="text-[13.5px] tracking-[0.005em] transition-colors duration-200 text-white/80 hover:text-white font-normal">Soluções</a>
            <a href="#clientes" className="text-[13.5px] tracking-[0.005em] transition-colors duration-200 text-white/80 hover:text-white font-normal">Clientes</a>
            <a href="#seguranca" className="text-[13.5px] tracking-[0.005em] transition-colors duration-200 text-white/80 hover:text-white font-normal">Segurança</a>
            <a href="#manifesto" className="text-[13.5px] tracking-[0.005em] transition-colors duration-200 text-white/80 hover:text-white font-normal">Manifesto</a>
          </nav>

          {/* Action Buttons */}
          <div className="z-10 ml-auto hidden shrink-0 items-center gap-5 md:flex">
            <a className="text-[13.5px] tracking-[0.005em] transition-colors duration-200 text-white/80 hover:text-white font-normal" href="#login">Entrar</a>
            <a 
              href="#solicitar-demonstracao"
              className="inline-flex h-9 items-center rounded-md bg-white px-4 text-[12.5px] font-medium tracking-[0.01em] text-black transition-[transform,filter,background-color,color] duration-200 hover:scale-[1.02]"
            >
              Solicitar demonstração
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full">
        
        {/* 2. HERO SECTION - Estilo Cinematográfico Original */}
        <section id="plataforma" className="relative isolate flex min-h-[100vh] w-full flex-col overflow-hidden bg-black text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Vídeo do Harvey Specter lendo papéis sob o abajur */}
            <video 
              className="absolute inset-0 h-full w-full object-cover opacity-50" 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto" 
              poster="https://specter.ia.br/specter-hero-poster.jpg"
              aria-hidden="true" 
              disablePictureInPicture
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-02%20at%2015.59.32-WYm6lRe2kQu3JK2DWJ5sTZAxSaOkBS.mp4" type="video/mp4"/>
            </video>

            {/* Overlays de iluminação do abajur e vinheta */}
            <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.32) 35%, rgba(10,10,10,0.6) 75%, rgba(10,10,10,0.95) 100%)' }}></div>
            <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 28% 55%, transparent 0%, transparent 38%, rgba(10,10,10,0.42) 100%)' }}></div>
          </div>

          {/* Conteúdo do Hero (Alinhado à esquerda e refinado, peso da fonte Fraunces corrigido para normal) */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-end px-6 pb-20 pt-40 sm:pb-24 sm:pt-44 lg:px-14 lg:pb-28 lg:pt-48 xl:px-20 text-left">
            
            {/* Tag Utilitária Sutil */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[10px] uppercase tracking-[0.15em] text-white/70 mb-6 font-mono w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-white/90" strokeWidth={1.25} />
              Infraestrutura Jurídica Operacional
            </div>

            {/* H1 (Grande, Serifada Elegante com peso normal/médio) */}
            <h1 className="max-w-[22ch] text-balance font-serif text-[42px] font-normal leading-[1.02] tracking-[-0.022em] text-white sm:text-[60px] md:text-[80px] lg:text-[100px]">
              <span className="block">SPECTER.</span>
              <span className="block text-white/45">Inteligência jurídica operacional.</span>
            </h1>

            {/* H2 (Subtítulo médio em cinza) */}
            <h2 className="mt-8 max-w-[52ch] text-pretty text-[16px] leading-[1.55] text-zinc-300 sm:text-[18px] md:text-[20px] font-light font-sans">
              A infraestrutura que conecta produção, análise, monitoramento e gestão em um único ambiente.
            </h2>

            {/* Parágrafo */}
            <p className="mt-4 max-w-[52ch] text-[13.5px] sm:text-[14.5px] leading-[1.6] text-zinc-500 font-light font-sans">
              A advocacia se tornou complexa demais para operar de forma fragmentada. Produza documentos. Analise riscos. Monitore processos. Gerencie clientes. Tudo em um único sistema. Sem trocar de plataforma. Sem perder contexto. Sem perder tempo.
            </p>

            {/* Botões lado a lado */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-12">
              <a 
                className="inline-flex h-12 items-center rounded-md bg-white px-7 text-[13.5px] font-medium tracking-[0.005em] text-black shadow-lg transition-[transform,filter] duration-200 hover:scale-[1.02] hover:bg-zinc-200" 
                href="#solicitar-demonstracao"
              >
                Solicitar demonstração
              </a>
              <a 
                className="text-[13.5px] tracking-[0.005em] text-white/85 underline-offset-[6px] transition-colors hover:text-white hover:underline flex items-center gap-1.5 font-medium" 
                href="#dashboard-preview"
              >
                Conhecer a plataforma <ArrowRight className="w-4 h-4 inline" strokeWidth={1.5} />
              </a>
            </div>

          </div>

          {/* Base do Hero: Barra com cor e efeito (sem texto) */}
          <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-[2px] h-12">
          </div>
        </section>

        {/* 2.1 DASHBOARD MOCKUP - Dashboard Executivo Premium e Escurecido */}
        <section id="dashboard-preview" className="w-full bg-[#000000] border-t border-zinc-900 py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[10px] font-mono text-zinc-650 uppercase tracking-[0.2em]">[ Painel Corporativo ]</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white mt-3 leading-snug">Ambiente Integrado de Controle</h2>
            </div>

            <div className="bg-[#09090B] border border-zinc-900 rounded-sm shadow-2xl overflow-hidden text-left">
              {/* Topbar do Terminal */}
              <div className="bg-black px-4 py-3 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                  </div>
                  <div className="h-4 w-[1px] bg-zinc-800 mx-1"></div>
                  <span className="font-mono text-zinc-500 tracking-wider">SPECTER OPERATING ENVIRONMENT v4.8</span>
                </div>
                
                <div className="flex items-center gap-4 font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span className="text-zinc-500">SYSTEM:</span>
                    <span className="text-white font-semibold uppercase">ONLINE</span>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div>
                      <span className="text-zinc-500">VOLUMETRIA:</span> <span className="text-white font-medium">{docCounter}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">LATÊNCIA:</span> <span className="text-white font-medium">12ms</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">NÚCLEO:</span> <span className="text-white font-medium">{systemLoad}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Header de Navegação do Mockup */}
              <div className="border-b border-zinc-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-black/40">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-zinc-650" strokeWidth={1.25} />
                  <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-white font-sans">Módulos de Telemetria</h3>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                      activeTab === 'analytics' 
                        ? 'border-zinc-850 bg-zinc-900 text-white' 
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    [ 01. Telemetria Geral ]
                  </button>
                  <button 
                    onClick={() => setActiveTab('risk')}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                      activeTab === 'risk' 
                        ? 'border-zinc-850 bg-zinc-900 text-white' 
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    [ 02. Auditoria de Risco ]
                  </button>
                  <button 
                    onClick={() => setActiveTab('system')}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                      activeTab === 'system' 
                        ? 'border-zinc-850 bg-zinc-900 text-white' 
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    [ 03. Variáveis ]
                  </button>
                </div>
              </div>

              {/* Corpo do Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900 bg-black/25">
                
                {/* Esquerda: Telemetria & Gráfico (Col 7) */}
                <div className="lg:col-span-7 p-6 flex flex-col gap-6">
                  {activeTab === 'analytics' && (
                    <>
                      {/* Linha superior de micro-cards */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-black/50 p-4 border border-zinc-900 rounded-sm">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">Documentos</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white">482</span>
                            <span className="text-[9px] text-zinc-650 font-mono">Últimas 24h</span>
                          </div>
                        </div>
                        <div className="bg-black/50 p-4 border border-zinc-900 rounded-sm">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">Alertas</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white">14</span>
                            <span className="text-[9px] text-zinc-650 font-mono">Processados</span>
                          </div>
                        </div>
                        <div className="bg-black/50 p-4 border border-zinc-900 rounded-sm">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">Prazos</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white">1,894</span>
                            <span className="text-[9px] text-zinc-650 font-mono">Monitorados</span>
                          </div>
                        </div>
                      </div>

                      {/* Gráfico de Linha Vetorial */}
                      <div className="bg-black/30 p-5 border border-zinc-900 rounded-sm flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.25} />
                            <span className="text-xs uppercase tracking-wider font-semibold text-white font-sans">Mapeamento de Litígios Recentes</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">PERÍODO: 30 DIAS</span>
                        </div>

                        <div className="relative w-full h-40 flex-1">
                          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                            <line x1="0" y1="25" x2="500" y2="25" stroke="#18181B" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="0" y1="75" x2="500" y2="75" stroke="#18181B" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="0" y1="125" x2="500" y2="125" stroke="#18181B" strokeWidth="1" strokeDasharray="4 4" />
                            
                            <path
                              d="M 0 150 L 0 100 Q 50 120 100 80 T 200 110 T 300 60 T 400 40 T 500 15 L 500 150 Z"
                              fill="url(#chart-gradient)"
                              opacity="0.03"
                            />
                            <path
                              d="M 0 100 Q 50 120 100 80 T 200 110 T 300 60 T 400 40 T 500 15"
                              fill="none"
                              stroke="#A1A1AA"
                              strokeWidth="1.25"
                            />
                            <circle cx="400" cy="40" r="3" fill="#FFFFFF" />
                            
                            <defs>
                              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#A1A1AA" />
                                <stop offset="100%" stopColor="#000000" />
                              </linearGradient>
                            </defs>
                          </svg>

                          <div className="flex justify-between text-[8px] font-mono text-zinc-550 mt-2">
                            <span>DIA 01</span>
                            <span>DIA 10</span>
                            <span>DIA 20</span>
                            <span>DIA 30</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'risk' && (
                    <div className="bg-black/30 p-5 border border-zinc-900 rounded-sm flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-zinc-400" strokeWidth={1.25} />
                            <span className="text-xs uppercase tracking-wider font-semibold text-white">Análise de Risco Corporativo</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">Módulo de Compliance</span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans font-light">
                          Cláusulas e anomalias estruturais identificadas em tempo real nos documentos jurídicos analisados.
                        </p>

                        <div className="space-y-3">
                          <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-sm flex justify-between items-center">
                            <div>
                              <span className="text-xs font-mono text-white block">Cláusula 12.4 - Indenização Ilimitada</span>
                              <span className="text-[9px] text-zinc-500">Contrato de Prestação de Serviços</span>
                            </div>
                            <span className="text-xs text-white font-mono font-bold">Crítico (88%)</span>
                          </div>
                          <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-sm flex justify-between items-center">
                            <div>
                              <span className="text-xs font-mono text-white block">Cláusula 8.2 - Foro Estrangeiro</span>
                              <span className="text-[9px] text-zinc-500">Acordo de Parceria</span>
                            </div>
                            <span className="text-xs text-zinc-400 font-mono font-bold">Médio (54%)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-[9px] font-mono text-zinc-500 border-t border-zinc-900 pt-4 mt-6">
                        * Atualização automática com base no motor Harvey de litígios.
                      </div>
                    </div>
                  )}

                  {activeTab === 'system' && (
                    <div className="bg-black/30 p-5 border border-zinc-900 rounded-sm flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-zinc-400" strokeWidth={1.25} />
                            <span className="text-xs uppercase tracking-wider font-semibold text-white">Parâmetros Ativos</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">Variáveis do Sistema</span>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-zinc-400">Sensibilidade do Motor de Riscos</span>
                              <span className="font-mono text-white font-medium">0.85</span>
                            </div>
                            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                              <div className="bg-white h-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-zinc-400">Varredura de Diários Oficiais</span>
                              <span className="font-mono text-white font-medium">Tempo Real</span>
                            </div>
                            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                              <div className="bg-white h-full" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-[#A1A1AA]/55 border-t border-zinc-900 pt-4 mt-6">
                        <span>SECURE NODE SINC: OK</span>
                        <button 
                          onClick={() => setDocCounter(prev => prev + 1)}
                          className="text-white hover:underline uppercase"
                        >
                          [ Forçar Sinc ]
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direita: Tabela de Dados (Col 5) */}
                <div className="lg:col-span-5 p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.25} />
                      <span className="text-xs uppercase tracking-wider font-semibold text-white">Log de Operações</span>
                    </div>
                    <button 
                      onClick={handleSimulateNewDoc}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 uppercase"
                    >
                      <RefreshCw className="w-3 h-3" strokeWidth={1.25} />
                      [ Simular Entrada ]
                    </button>
                  </div>

                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-900 text-[9px] text-zinc-500 uppercase font-mono">
                          <th className="py-2 font-medium">Documento</th>
                          <th className="py-2 text-right font-medium">Risco</th>
                          <th className="py-2 text-right font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900 text-[11px] font-sans">
                        {logs.map((log) => (
                          <tr 
                            key={log.id} 
                            onClick={() => setSelectedLog(log)}
                            className={`cursor-pointer transition-colors ${
                              selectedLog?.id === log.id 
                                ? 'bg-zinc-900/40 text-white font-medium' 
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/10'
                            }`}
                          >
                            <td className="py-2.5 pr-2 truncate max-w-[150px]">
                              <span className="block font-medium truncate text-white/90">{log.document}</span>
                              <span className="text-[8px] text-zinc-500 font-mono uppercase">{log.type} @ {log.timestamp}</span>
                            </td>
                            <td className="py-2.5 text-right font-mono">
                              <span className={log.riskScore > 70 ? 'text-white' : 'text-zinc-650'}>
                                {log.riskScore}%
                              </span>
                            </td>
                            <td className="py-2.5 text-right">
                              <span className={`inline-block text-[8px] px-2 py-0.5 border font-mono uppercase ${
                                log.status === 'Concluído' ? 'border-zinc-800 text-zinc-500 bg-zinc-900/20' :
                                log.status === 'Análise de Risco' ? 'border-zinc-800 text-white' :
                                log.status === 'Alerta Crítico' ? 'border-white text-white font-semibold' :
                                'border-zinc-900 text-zinc-600'
                              }`}>
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedLog && (
                    <div className="bg-black p-3.5 border border-zinc-900 rounded-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.25} />
                        <span className="text-[9px] font-mono uppercase text-zinc-500">Metadados</span>
                      </div>
                      <div className="text-[10px] font-mono space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-zinc-600">ID:</span>
                          <span className="text-zinc-300">{selectedLog.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-600">Alvo:</span>
                          <span className="text-zinc-300 truncate max-w-[160px]" title={selectedLog.document}>
                            {selectedLog.document}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-600">Inconsistência:</span>
                          <span className="text-zinc-300 font-semibold">{selectedLog.riskScore}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rodapé do Terminal */}
              <div className="bg-black px-6 py-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                <div className="flex items-center gap-3 text-zinc-500 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-zinc-650" strokeWidth={1.25} />
                  <span>ENVIRONMENT NODE: SPO-LATAM-01</span>
                  <span>|</span>
                  <span>SECURE SSL 256-BIT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 font-mono text-[10px]">SIMULADOR:</span>
                  <button 
                    onClick={() => setIsSimulating(!isSimulating)}
                    className={`text-[9px] font-mono px-2 py-0.5 border ${
                      isSimulating 
                        ? 'border-zinc-800 text-white' 
                        : 'border-zinc-900 text-zinc-500'
                    }`}
                  >
                    {isSimulating ? 'ON (LOOP)' : 'OFF (PAUSED)'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEÇÃO: O PROBLEMA - Estilo Editorial Premium Off-White (Peso Serifada Corrigido para Normal) */}
        <section className="w-full bg-[#F7F2EA] border-t border-[#E4DEC6]/60 py-28 lg:py-36">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 text-left">
            {/* H2 Serifado de Altíssimo Refinamento (font-normal) */}
            <h2 className="max-w-[42ch] font-serif text-[26px] font-normal leading-[1.12] tracking-[-0.02em] text-[#0A0A0A] sm:text-[34px] md:text-[42px] lg:text-[52px]">
              <span className="block">O problema não é falta de informação.</span>
              <span className="block text-[#0A0A0A]/45 mt-1 sm:mt-2">É excesso.</span>
            </h2>
            
            <p className="mt-8 max-w-[58ch] text-[15px] sm:text-[16.5px] md:text-[18px] leading-[1.6] text-zinc-600 font-sans font-light">
              Todos os dias sua equipe produz documentos. Recebe movimentações. Pesquisa jurisprudência. Controla prazos. Atende clientes. Atualiza planilhas. Organiza processos.
            </p>

            <div className="border-t border-[#E4DEC6] pt-10 mt-12 max-w-[58ch]">
              <p className="text-[16px] sm:text-[18px] text-black font-normal leading-relaxed font-serif">
                O trabalho jurídico nunca esteve tão dependente de informação. E nunca foi tão difícil transformar informação em ação.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SEÇÃO: A ARQUITETURA (Grid Bento Box em Fundo Claro, Título com peso normal) */}
        <section id="solucoes" className="w-full bg-[#F7F2EA] border-t border-[#E4DEC6]/60 py-28 lg:py-36">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end mb-16">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 font-mono font-medium">Plataforma</p>
                <h2 className="mt-5 font-serif text-[38px] sm:text-[50px] md:text-[62px] font-normal leading-[1.04] tracking-[-0.02em] text-black">
                  <span className="block">Uma plataforma.</span>
                  <span className="block text-black/40">Quatro áreas de operação.</span>
                </h2>
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-zinc-600 font-sans font-light">
                Cada área operacional resolve uma fase decisiva da advocacia. Funcionam de forma integrada para estruturar sua firma.
              </p>
            </div>

            {/* Grid Bento Box Refinado com Linhas Finas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-[2px] border border-[#E4DEC6] bg-[#E4DEC6]">
              
              {/* PRODUÇÃO */}
              <div className="group relative flex flex-col gap-6 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-600 transition-colors group-hover:border-zinc-450 group-hover:text-black">
                  <FileText className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Produção</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-medium">ARCH.01 // DOCUMENTAL</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-650 font-sans font-light">
                  Transforme informações em documentos jurídicos.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-zinc-550 border-t border-[#E4DEC6] pt-4 mt-4">
                  <div>// Petições e Recursos</div>
                  <div>// Contratos e Pareceres</div>
                  <div>// Cálculos periciais</div>
                </div>
              </div>

              {/* INTELIGÊNCIA */}
              <div className="group relative flex flex-col gap-6 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-600 transition-colors group-hover:border-zinc-450 group-hover:text-black">
                  <Cpu className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Inteligência</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-medium">ARCH.02 // ESTRATÉGIA</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-650 font-sans font-light">
                  Transforme dados em estratégia.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-zinc-550 border-t border-[#E4DEC6] pt-4 mt-4">
                  <div>// Perfil do magistrado</div>
                  <div>// Jurimetria de sentenças</div>
                  <div>// Análise preditiva de risco</div>
                </div>
              </div>

              {/* MONITORAMENTO */}
              <div className="group relative flex flex-col gap-6 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-600 transition-colors group-hover:border-zinc-450 group-hover:text-black">
                  <Bell className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Monitoramento</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-medium">ARCH.03 // ACOMPANHAMENTO</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-650 font-sans font-light">
                  Transforme movimentações em ação.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-zinc-550 border-t border-[#E4DEC6] pt-4 mt-4">
                  <div>// Consultas processuais</div>
                  <div>// Alertas de novas ações</div>
                  <div>// Monitoramento contínuo</div>
                </div>
              </div>

              {/* ESCRITÓRIO */}
              <div className="group relative flex flex-col gap-6 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-600 transition-colors group-hover:border-zinc-450 group-hover:text-black">
                  <Briefcase className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Escritório</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-mono font-medium">ARCH.04 // OPERACIONAL</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-650 font-sans font-light">
                  Transforme operação em controle.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-zinc-550 border-t border-[#E4DEC6] pt-4 mt-4">
                  <div>// CRM e Clientes</div>
                  <div>// Agenda integrada</div>
                  <div>// Gestão e Governança</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. SEÇÃO: CENTRO DE COMANDO (KPIs) */}
        <section className="w-full bg-[#000000] border-t border-zinc-900 py-32">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Esquerda: Textos */}
              <div className="lg:col-span-5 text-left flex flex-col justify-center">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 mb-4">
                  [ Centro de Controle ]
                </div>
                {/* H2 Serifado de Peso Normal */}
                <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.15] mb-6">
                  O centro de comando da sua operação.
                </h2>
                {/* Texto */}
                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-lg font-light font-sans">
                  O Specter não mostra apenas processos. Ele mostra o funcionamento do escritório. O sócio deixa de abrir dez sistemas. Passa a abrir apenas um.
                </p>
              </div>

              {/* Direita: Cards de métricas */}
              <div className="lg:col-span-7">
                <div className="bg-[#09090B] border border-zinc-900 p-8 rounded-sm relative overflow-hidden shadow-xl">
                  
                  <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-700 select-none">
                    OPERATIONAL_LOG // SYS.METRICS
                  </div>

                  <div className="flex items-center gap-2 mb-8 border-b border-zinc-900 pb-4">
                    <Terminal className="w-4 h-4 text-zinc-600" strokeWidth={1.25} />
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-sans">Métricas Ativas do Escritório</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Painel executivo */}
                    <div className="p-4 bg-black border border-zinc-900 rounded-sm hover:border-zinc-850 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-850 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" strokeWidth={1.25} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Status</span>
                        <span className="text-xs font-semibold text-white font-sans">Painel executivo</span>
                      </div>
                    </div>

                    {/* Horas economizadas */}
                    <div className="p-4 bg-black border border-zinc-900 rounded-sm hover:border-zinc-850 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-850 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-4 h-4 text-white" strokeWidth={1.25} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Média Mensal</span>
                        <span className="text-xs font-semibold text-white font-sans">Horas economizadas</span>
                      </div>
                    </div>

                    {/* Fila prioritária */}
                    <div className="p-4 bg-black border border-zinc-900 rounded-sm hover:border-zinc-850 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-850 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white" strokeWidth={1.25} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Fila de Espera</span>
                        <span className="text-xs font-semibold text-white font-sans">Fila prioritária</span>
                      </div>
                    </div>

                    {/* Peças aguardando aprovação */}
                    <div className="p-4 bg-black border border-zinc-900 rounded-sm hover:border-zinc-850 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-850 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-white" strokeWidth={1.25} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Revisões</span>
                        <span className="text-xs font-semibold text-white font-sans">Peças aguardando aprovação</span>
                      </div>
                    </div>

                    {/* Riscos identificados */}
                    <div className="p-4 bg-black border border-zinc-900 rounded-sm hover:border-zinc-850 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-850 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4 h-4 text-white" strokeWidth={1.25} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Auditoria</span>
                        <span className="text-xs font-semibold text-white font-sans">Riscos identificados</span>
                      </div>
                    </div>

                    {/* Performance da equipe */}
                    <div className="p-4 bg-black border border-zinc-900 rounded-sm hover:border-zinc-850 transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-850 flex items-center justify-center flex-shrink-0">
                        <Terminal className="w-4 h-4 text-white" strokeWidth={1.25} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Telemetria</span>
                        <span className="text-xs font-semibold text-white font-sans">Performance da equipe</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. SEÇÃO: MOTORES - Estilo Refinado Original em Fundo Claro */}
        <section id="motores" className="w-full bg-[#F7F2EA] border-t border-[#E4DEC6]/60 py-28 lg:py-36">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end mb-16">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 font-mono font-medium">Motores</p>
                <h2 className="mt-5 font-serif text-[38px] sm:text-[50px] md:text-[62px] font-normal leading-[1.04] tracking-[-0.02em] text-black">
                  <span className="block">Produção jurídica</span>
                  <span className="block text-black/40">em escala.</span>
                </h2>
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-zinc-600 font-sans font-light">
                Cinco motores de inteligência que agem sob o comando da sua estratégia legal.
              </p>
            </div>

            {/* Grid de Motores (Cards estilo Print 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-[2px] border border-[#E4DEC6] bg-[#E4DEC6]">
              
              {/* Motor Ross */}
              <div className="group relative flex flex-col gap-5 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-700 transition-colors group-hover:border-zinc-400 group-hover:text-black">
                  <FileText className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Ross</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono font-medium">Geração de peças</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-600 font-sans font-light">
                  Da inicial ao recurso especial. Estrutura, linguagem e citações em padrão pericial.
                </p>
              </div>

              {/* Motor Louis */}
              <div className="group relative flex flex-col gap-5 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-700 transition-colors group-hover:border-zinc-400 group-hover:text-black">
                  <Scale className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Louis</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono font-medium">Cálculos periciais</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-600 font-sans font-light">
                  Liquidações automatizadas de sentença, cálculos trabalhistas e precatórios sob regras de compliance pericial.
                </p>
              </div>

              {/* Motor Harvey */}
              <div className="group relative flex flex-col gap-5 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-700 transition-colors group-hover:border-zinc-400 group-hover:text-black">
                  <Sliders className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Harvey</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono font-medium">Inteligência aplicada ao litígio</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-600 font-sans font-light">
                  Análise preditiva do julgador, probabilidade de riscos e cruzamento de dados com a jurisprudência.
                </p>
              </div>

              {/* Motor Saul */}
              <div className="group relative flex flex-col gap-5 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40 lg:col-span-1">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-700 transition-colors group-hover:border-zinc-400 group-hover:text-black">
                  <Mic className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Saul</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono font-medium">Análise multimodal</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-600 font-sans font-light">
                  Transcrição forense com diarização de oradores, busca em áudio de audiência e mapeamento de contradições.
                </p>
              </div>

              {/* Motores Donna e Sherlock */}
              <div className="group relative flex flex-col gap-5 bg-[#F7F2EA] p-9 transition-colors hover:bg-white/40 md:col-span-2 lg:col-span-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4DEC6] bg-[#F7F2EA] text-zinc-700 transition-colors group-hover:border-zinc-400 group-hover:text-black">
                  <Radar className="w-4 h-4" strokeWidth={1.25} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.012em] text-black">Donna & Sherlock</h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono font-medium">Radar de monitoramento e fraudes</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-zinc-660 font-sans font-light">
                  Varredura de certidões, diários oficiais em tempo real e localização de ativos. Um radar integrado para controle de novas ações e compliance corporativo contra fraudes à execução.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 7. SEÇÃO DUPLA: PORTAL DO CLIENTE & GOVERNANÇA (Totalmente Reajustada ao Print 4) */}
        <section id="clientes" className="w-full bg-[#000000] border-t border-zinc-900 py-32">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Bloco 1: Portal do Cliente */}
              <div className="bg-[#09090B] border border-zinc-900 p-8 sm:p-12 rounded-sm flex flex-col justify-between">
                <div>
                  {/* Tag Superior Muito Discreta */}
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-8">[ CLIENT PORTAL ]</div>
                  
                  {/* H2 Serifado com Peso Fino/Normal Elegante */}
                  <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[40px] font-normal text-white leading-tight mb-6">
                    O cliente acompanha tudo sem ligar para o escritório.
                  </h2>
                  
                  {/* Parágrafo de Corpo Fino e Cinza */}
                  <p className="text-[14px] leading-relaxed text-zinc-400 font-sans font-light mb-10">
                    Reduza drasticamente a carga operacional do seu time de atendimento. O Specter fornece canais de comunicação limpos e transparentes que traduzem os termos do processo para o cliente de forma simples.
                  </p>

                  {/* Lista de Recursos Refinada com Ícones Finos sem fundo */}
                  <div className="space-y-6 border-t border-zinc-900/60 pt-8">
                    
                    <div className="flex items-start gap-4">
                      {/* Ícone Ultra Fino */}
                      <Terminal className="w-4 h-4 text-white mt-1 flex-shrink-0" strokeWidth={1.25} />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-white font-sans">Portal White Label</span>
                        <span className="text-[12.5px] text-zinc-500 font-sans font-light mt-0.5">Seu logotipo, suas cores e seu domínio próprio de atendimento.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Sliders className="w-4 h-4 text-white mt-1 flex-shrink-0" strokeWidth={1.25} />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-white font-sans">App próprio</span>
                        <span className="text-[12.5px] text-zinc-500 font-sans font-light mt-0.5">Notificações push imediatas para o cliente de andamentos significativos.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <GitCommit className="w-4 h-4 text-white mt-1 flex-shrink-0" strokeWidth={1.25} />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-white font-sans">Linha do tempo simplificada</span>
                        <span className="text-[12.5px] text-zinc-500 font-sans font-light mt-0.5">Entendimento cronológico e visual das fases processuais.</span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Bloco 2: Governança */}
              <div className="bg-[#09090B] border border-zinc-900 p-8 sm:p-12 rounded-sm flex flex-col justify-between">
                <div>
                  {/* Tag Superior Muito Discreta */}
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-8">[ ENTERPRISE GOVERNANCE ]</div>
                  
                  {/* H2 Serifado com Peso Fino/Normal Elegante */}
                  <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[40px] font-normal text-white leading-tight mb-6">
                    Governança para operações jurídicas sérias.
                  </h2>
                  
                  {/* Parágrafo de Corpo Fino e Cinza */}
                  <p className="text-[14px] leading-relaxed text-zinc-400 font-sans font-light mb-10">
                    Controle total sobre revisões, acessos corporativos e a segurança dos dados. O Specter é desenhado para estruturas que demandam conformidade absoluta e auditoria ininterrupta de suas operações.
                  </p>

                  {/* Lista de Recursos Refinada com Ícones Finos sem fundo */}
                  <div className="space-y-6 border-t border-zinc-900/60 pt-8">
                    
                    <div className="flex items-start gap-4">
                      <Shield className="w-4 h-4 text-white mt-1 flex-shrink-0" strokeWidth={1.25} />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-white font-sans">Controle hierárquico</span>
                        <span className="text-[12.5px] text-zinc-500 font-sans font-light mt-0.5">Controle rigoroso de quem acessa cada base documental ou processo.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Check className="w-4 h-4 text-white mt-1 flex-shrink-0" strokeWidth={1.25} />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-white font-sans">Fluxo de aprovação</span>
                        <span className="text-[12.5px] text-zinc-500 font-sans font-light mt-0.5">Nenhuma peça é distribuída sem passar pelas etapas de validação interna.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Terminal className="w-4 h-4 text-white mt-1 flex-shrink-0" strokeWidth={1.25} />
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-white font-sans">Auditoria completa</span>
                        <span className="text-[12.5px] text-zinc-500 font-sans font-light mt-0.5">Rastreabilidade absoluta de todas as ações executadas no sistema.</span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. SEÇÃO: SEGURANÇA (Banner Largo - Estilo Print 3) */}
        <section id="seguranca" className="w-full bg-black border-t border-zinc-900 py-28 lg:py-36">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start mb-20">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#A1A1AA]/50 font-mono font-medium">Segurança e conformidade</p>
                {/* H2 Serifado de Alvo com peso normal */}
                <h2 className="mt-5 font-serif text-[40px] sm:text-[52px] md:text-[60px] font-normal leading-[1.05] tracking-[-0.02em] text-white">
                  <span className="block">Segurança e controles</span>
                  <span className="text-white/45 block mt-1">de nível empresarial.</span>
                </h2>
              </div>
              <p className="self-end text-[15px] sm:text-[16px] leading-[1.6] text-zinc-400 font-sans font-light">
                Specter atende aos mais altos padrões da indústria de segurança e conformidade. Incluímos todos os controles padrão que as equipes corporativas esperam: conformidade com a LGPD, criptografia de ponta a ponta, registros de auditoria e controle de acesso via OAB.
              </p>
            </div>

            {/* Grid de 4 Colunas (Círculos com Dupla Borda como no Print 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mt-16">
              
              {/* LGPD */}
              <div className="flex flex-col items-center text-center">
                <span className="relative flex h-24 w-24 items-center justify-center mb-6">
                  <span className="absolute inset-0 rounded-full border border-white/10"></span>
                  <span className="absolute inset-2 rounded-full border border-white/5"></span>
                  <Shield className="w-7 h-7 text-white/70" strokeWidth={1.25} />
                </span>
                <span className="font-serif text-[20px] font-normal tracking-[-0.01em] text-white">LGPD</span>
                <span className="mt-2 max-w-[22ch] text-[13px] leading-[1.55] text-zinc-500 font-sans font-light">
                  Aderência total à Lei Geral de Proteção de Dados.
                </span>
              </div>

              {/* Criptografia */}
              <div className="flex flex-col items-center text-center">
                <span className="relative flex h-24 w-24 items-center justify-center mb-6">
                  <span className="absolute inset-0 rounded-full border border-white/10"></span>
                  <span className="absolute inset-2 rounded-full border border-white/5"></span>
                  <Lock className="w-7 h-7 text-white/70" strokeWidth={1.25} />
                </span>
                <span className="font-serif text-[20px] font-normal tracking-[-0.01em] text-white">Criptografia</span>
                <span className="mt-2 max-w-[22ch] text-[13px] leading-[1.55] text-zinc-500 font-sans font-light">
                  Criptografia de ponta a ponta em trânsito e repouso de dados.
                </span>
              </div>

              {/* Controle de Acesso */}
              <div className="flex flex-col items-center text-center">
                <span className="relative flex h-24 w-24 items-center justify-center mb-6">
                  <span className="absolute inset-0 rounded-full border border-white/10"></span>
                  <span className="absolute inset-2 rounded-full border border-white/5"></span>
                  <Sliders className="w-7 h-7 text-white/70" strokeWidth={1.25} />
                </span>
                <span className="font-serif text-[20px] font-normal tracking-[-0.01em] text-white">Controle de Acesso</span>
                <span className="mt-2 max-w-[22ch] text-[13px] leading-[1.55] text-zinc-500 font-sans font-light">
                  Controle hierárquico rígido de permissões e chaves.
                </span>
              </div>

              {/* Infraestrutura nacional */}
              <div className="flex flex-col items-center text-center">
                <span className="relative flex h-24 w-24 items-center justify-center mb-6">
                  <span className="absolute inset-0 rounded-full border border-white/10"></span>
                  <span className="absolute inset-2 rounded-full border border-white/5"></span>
                  <Cpu className="w-7 h-7 text-white/70" strokeWidth={1.25} />
                </span>
                <span className="font-serif text-[20px] font-normal tracking-[-0.01em] text-white">Infraestrutura nacional</span>
                <span className="mt-2 max-w-[22ch] text-[13px] leading-[1.55] text-zinc-500 font-sans font-light">
                  Hospedagem em território nacional com redundância local de dados.
                </span>
              </div>

            </div>

            {/* Frase Destaque */}
            <div className="border-t border-zinc-900 pt-16 mt-20 text-center">
              <p className="text-[15px] sm:text-[16px] text-zinc-400 max-w-xl leading-relaxed font-normal font-serif mx-auto">
                O Specter não substitui o advogado. Amplifica sua capacidade operacional.
              </p>
            </div>
          </div>
        </section>

        {/* 9. SEÇÃO CONCEITO: SUITS */}
        <section 
          ref={suitsRef}
          id="manifesto" 
          className="w-full relative py-48 overflow-hidden border-t border-zinc-900 bg-black"
        >
          {/* Imagem de Fundo com Efeito Parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="/suits_bg.png" 
              alt="Suits Building" 
              className="absolute w-full h-[140%] min-h-[140%] object-cover opacity-100 pointer-events-none left-0 will-change-transform"
              style={{
                top: '-20%',
                transform: `translate3d(0, ${suitsOffsetY}px, 0)`
              }}
            />
            {/* Overlay Escuro com opacidade alta */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] z-10"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-20 flex flex-col items-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A1A1AA]/55 mb-6">
              [ Suits Legacy Concept ]
            </div>
            
            {/* Texto sobreposto com peso normal e espaçamento clássico */}
            <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed mb-6 max-w-3xl font-serif">
              Inspirado por uma das maiores séries jurídicas da história. A série Suits apresentou ao mundo uma advocacia orientada por estratégia, velocidade e excelência. O Specter nasceu inspirado nessa visão.
            </p>
            <p className="text-base sm:text-xl text-white font-normal leading-relaxed max-w-3xl font-serif">
              Mas a inspiração termina na ficção. A execução acontece no mundo real.
            </p>
          </div>
        </section>

        {/* 10. CTA FINAL */}
        <section id="solicitar-demonstracao" className="w-full bg-[#000000] border-t border-zinc-900 py-32 text-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-650 mb-6">
              [ Próximo Passo ]
            </div>
            
            {/* CTA Centralizado Serifado Fino/Médio */}
            <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-6 max-w-3xl leading-snug">
              O futuro da advocacia não será definido por quem trabalha mais. Será definido por quem opera melhor. Conheça o Specter.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <a 
                href="mailto:contato@specter.ia.br?subject=Solicitação de Demonstração - Specter"
                className="bg-white hover:bg-zinc-200 text-black text-sm font-semibold px-8 py-4 rounded-md transition-all duration-200 uppercase tracking-wider text-center font-sans"
              >
                Solicitar demonstração
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-20 bg-black">
        <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_2.4fr]">
            <a aria-label="Specter — início" href="/">
              <span className="font-serif text-[120px] font-normal leading-none tracking-[-0.04em] text-white">S</span>
            </a>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 text-xs text-zinc-500">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-4 font-mono font-medium">Plataforma</h4>
                <ul className="flex flex-col gap-3 font-sans font-light">
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#plataforma">Ross</a></li>
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#plataforma">Harvey</a></li>
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#plataforma">Louis</a></li>
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#plataforma">Saul</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-4 font-mono font-medium">Empresa</h4>
                <ul className="flex flex-col gap-3 font-sans font-light">
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#manifesto">Manifesto</a></li>
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#clientes">Clientes</a></li>
                  <li><a className="text-zinc-400 hover:text-white transition-colors" href="#seguranca">Segurança</a></li>
                </ul>
              </div>

              <div className="col-span-2">
                <h4 className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-4 font-mono font-medium">ZAKA</h4>
                <p className="text-zinc-500 leading-relaxed max-w-xs font-sans font-light">
                  Inteligência artificial jurídica personalizada para escritórios de advocacia e equipes jurídicas líderes em todo o mundo.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="font-serif text-[18px] font-normal tracking-tight text-white">Specter</span>
              <span className="text-zinc-800">|</span>
              <span>© 2026 ZAKA. Todos os direitos reservados.</span>
            </div>
            <div className="flex items-center gap-6 font-sans font-light">
              <a href="#termos" className="hover:text-zinc-300 transition-colors">Termos de Uso</a>
              <a href="#privacidade" className="hover:text-zinc-300 transition-colors">Privacidade</a>
              <a href="#lgpd" className="hover:text-zinc-300 transition-colors">LGPD</a>
              <a href="#ajuda" className="hover:text-zinc-300 transition-colors">Central de Ajuda</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
