// Terminal.jsx
import { MessageSquare, Zap, Shield, UserCheck  } from 'lucide-react'

function TerminalBox() {
  return (
    <section
      className="w-full py-16 md:py-24 relative z-10 animate-fade-in-scroll"
      style={{ animationDelay: "400ms" }}
    >
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 md:p-12 border border-gray-800 hover:border-blue-500 transition-all duration-500 hover:shadow-glow-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Explore Multiple Perspectives
              </h2>
              <p className="text-gray-300 mb-8">
                Our AI debate system helps you see all sides of an argument, providing balanced insights and challenging
                your assumptions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-blue-900/20 px-4 py-2 rounded-full hover:bg-blue-800/30 transition-colors">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <span>Real-time analysis</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-900/20 px-4 py-2 rounded-full hover:bg-blue-800/30 transition-colors">
                  <UserCheck className="h-5 w-5 text-blue-400" />
                  <span>Cross-Examination</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-900/20 px-4 py-2 rounded-full hover:bg-blue-800/30 transition-colors">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <span>Nuanced arguments</span>
                </div>
              </div>
            </div>
            
            {/* Terminal Window */}
            <div className="md:w-1/2 bg-gray-950 p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 hover:shadow-glow group">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-gray-500">debate-initialize.ai</div>
              </div>
              
              {/* Terminal Content */}
              <div className="font-mono text-sm text-gray-300">
                <div className="text-blue-400 mb-2">// Example AI Debate Workflow</div>
                <div className="mb-1">
                  <span className="text-green-400">Technical:</span> React + Node.js stack feasible for MVP.
                </div>
                <div className="mb-1">
                  <span className="text-red-400">Market:</span> Education tech has $350B global opportunity.
                </div>
                <div className="mb-1">
                  <span className="text-yellow-400">Ethics:</span> Data privacy requires GDPR compliance framework.
                </div>
                <div className="mb-1">
                  <span className="text-purple-400">Original:</span> Peer-to-peer model differentiates from competitors.
                </div>
                <div className="mb-1">
                  <span className="text-blue-400">Synthesis:</span> Concept viable with staged development approach.
                </div>
                <div className="terminal-prompt mt-3">
                  <span className="text-gray-500">$</span>
                  <span className="terminal-text ml-2">Synthesizing the final result</span>
                  <span className="terminal-cursor"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TerminalBox