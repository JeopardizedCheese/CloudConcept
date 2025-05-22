// Features.jsx
import { Brain, Sparkles, CheckCircle } from 'lucide-react'

function Features() {
  return (
    <section
      id="features"
      className="w-full py-16 md:py-24 relative z-10 animate-fade-in-scroll"
      style={{ animationDelay: "200ms" }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          How CloudConcept Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-blue-500/50 shadow-glow transition-all duration-500 group animate-fade-in-slide">
            <div className="bg-blue-900/30 p-4 rounded-full w-fit mb-6 group-hover:bg-blue-800/40 transition-all duration-300 relative">
              <Brain className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              Our advanced AI analyzes your concept from multiple perspectives to provide balanced insights.
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-blue-500/50 shadow-glow transition-all duration-500 group animate-fade-in-slide" style={{ animationDelay: "100ms" }}>
            <div className="bg-blue-900/30 p-4 rounded-full w-fit mb-6 group-hover:bg-blue-800/40 transition-all duration-300 relative">
              <Sparkles className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Idea Generation</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              Generate new ideas and variations based on your initial concept with our AI assistant.
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-xl border border-blue-500/50 shadow-glow transition-all duration-500 group animate-fade-in-slide" style={{ animationDelay: "200ms" }}>
            <div className="bg-blue-900/30 p-4 rounded-full w-fit mb-6 group-hover:bg-blue-800/40 transition-all duration-300 relative">
              <CheckCircle className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Concept Validation</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              Test the strength of your ideas by seeing arguments from multiple perspectives.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features