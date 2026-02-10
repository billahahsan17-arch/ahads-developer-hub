import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Terminal, Bug, Zap, ShieldAlert, RefreshCw, Cpu, Activity } from 'lucide-react';
import { analyzeSystemError, logToBlackBox } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  diagnosis: string;
  isAnalyzing: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    diagnosis: '',
    isAnalyzing: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CRITICAL_SYSTEM_FAILURE:', error, errorInfo);
    
    // Auto-log to Black Box
    const stack = errorInfo.componentStack || 'No stack trace';
    logToBlackBox(
        `CRITICAL UI CRASH: ${error.toString()}\nStack: ${stack.substring(0, 200)}...`, 
        ['SYSTEM', 'CRASH', 'REACT'], 
        'CRITICAL'
    );

    this.setState({ errorInfo });
  }

  private handleDiagnosticUplink = async () => {
    const { error, errorInfo } = this.state;
    if (!error) return;

    this.setState({ isAnalyzing: true });

    const errorPayload = `
      ERROR: ${error.toString()}
      STACK: ${errorInfo?.componentStack || 'No stack trace available'}
    `;

    try {
      const diagnosis = await analyzeSystemError(errorPayload);
      this.setState({ diagnosis, isAnalyzing: false });
    } catch (err) {
      this.setState({ 
        diagnosis: "Neural link timeout. Atlas could not reach the diagnostic server.", 
        isAnalyzing: false 
      });
    }
  };

  private handleSystemReboot = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {/* Background Ambient Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <MotionDiv 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative z-10 w-full max-w-3xl bg-slate-900/80 border border-red-500/30 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Header / Alarm UI */}
            <div className="bg-red-950/20 border-b border-red-500/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tighter text-white">System Safe Mode</h1>
                  <p className="text-red-400 text-[10px] font-mono uppercase tracking-widest">Protocol: Error_Capture_Active</p>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end font-mono text-[10px] text-slate-500">
                <span className="text-emerald-500 flex items-center gap-1"><Activity className="w-3 h-3"/> DIAGNOSTICS LOGGED</span>
                <span>UPLINK: ACTIVE</span>
              </div>
            </div>

            {/* Error Detail */}
            <div className="p-8">
              <div className="bg-black/40 border border-slate-800 rounded-lg p-5 mb-8 overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                        <Terminal className="w-3 h-3" /> Exception Payload
                    </div>
                    <div className="text-[9px] text-slate-600 font-mono">
                        Automatically saved to Black Box
                    </div>
                </div>
                
                <div className="max-w-full overflow-hidden">
                  <div className="max-h-40 overflow-y-auto custom-scrollbar">
                    <code className="text-red-300 text-xs font-mono break-all leading-relaxed block">
                      {this.state.error?.toString()}
                    </code>
                    {this.state.errorInfo && (
                      <div className="mt-4 pt-4 border-t border-slate-800/50 text-slate-600 text-[9px] font-mono leading-tight whitespace-pre-wrap opacity-60 group-hover:opacity-100 transition-opacity">
                        {this.state.errorInfo.componentStack}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Grid */}
              <AnimatePresence mode="wait">
                {!this.state.diagnosis ? (
                  <MotionDiv 
                    key="actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <button 
                      onClick={this.handleDiagnosticUplink}
                      disabled={this.state.isAnalyzing}
                      className="group flex items-center justify-center gap-3 py-4 bg-white text-slate-950 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-slate-200 active:scale-95 disabled:opacity-50"
                    >
                      {this.state.isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Atlas Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Bug className="w-4 h-4 group-hover:animate-bounce" />
                          <span>Debug with Atlas</span>
                        </>
                      )}
                    </button>
                    <button 
                      onClick={this.handleSystemReboot}
                      className="flex items-center justify-center gap-3 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm uppercase tracking-widest border border-slate-700 transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      System Reboot
                    </button>
                  </MotionDiv>
                ) : (
                  <MotionDiv 
                    key="diagnosis"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu className="w-16 h-16 text-blue-500" />
                      </div>
                      <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-xs uppercase tracking-widest">
                        <Bug className="w-4 h-4" /> Atlas Diagnostic Intelligence
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                        <ReactMarkdown>{this.state.diagnosis}</ReactMarkdown>
                      </div>
                    </div>
                    <button 
                      onClick={this.handleSystemReboot}
                      className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm uppercase tracking-widest border border-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" /> Apply Fixes & Reboot
                    </button>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Footer */}
            <div className="bg-black/20 p-4 px-8 border-t border-slate-800 flex justify-between items-center font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                STATUS: UNSTABLE
              </div>
              <div>LOC: ATLAS_HUB_MAIN</div>
            </div>
          </MotionDiv>

          <p className="mt-8 text-slate-600 text-[10px] font-mono uppercase tracking-[0.3em]">
            Engineering Intelligence Layer v4.0 // Secured Connection
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
