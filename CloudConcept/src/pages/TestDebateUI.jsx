import { useState } from 'react';
import { useDebate } from '../hooks/useDebate';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { CheckCircle, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import ResultsPage from '../components/ResultsPage';
import { useNavigate } from 'react-router-dom';

function TestDebateUI() {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('education');
  const { 
    loading, 
    error, 
    debateData, 
    progress, 
    mode, 
    startDebate, 
    toggleMode, 
    reset 
  } = useDebate();

  console.log('Reset function', reset)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await startDebate(prompt, category, mode);
  };

  const navigate = useNavigate();

  // If we have debate results, show the beautiful results page
  if (debateData) {
    return <ResultsPage debateData={debateData} onReset={reset} />;
  }

  // Otherwise show the input form
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden landing-page">
      {/* Same background elements as landing page */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-[100px] animate-float-delayed"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <header className="flex items-center justify-between p-6 relative z-10">
        <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
        >

        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
        </Button>
    </header>


      <div className="container mx-auto p-6 relative z-10 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            CloudConcept Debate
          </h1>
          <div className="inline-block px-6 py-3 rounded-lg bg-black/50 border border-blue-500/50 text-blue-300 font-medium tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Start your AI-powered idea assistant
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-delayed">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-blue-500/30 p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            
            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block mb-3 text-lg font-medium text-blue-300">Your Idea:</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                rows={4}
                placeholder="Describe your hackathon idea or concept here..."
                required
              />
            </div>

            {/* Category Select */}
            <div className="mb-6">
              <label className="block mb-3 text-lg font-medium text-blue-300">Category:</label>
              <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-lg text-white focus:border-blue-400 focus:ring-blue-400/20 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="education" className="bg-gray-800 text-white">Education</option>
                <option value="healthcare" className="bg-gray-800 text-white">Healthcare</option>
                <option value="fintech" className="bg-gray-800 text-white">Fintech</option>
                <option value="sustainability" className="bg-gray-800 text-white">Sustainability</option>
                <option value="general" className="bg-gray-800 text-white">General</option>
              </select>
            </div>

            {/* Mode Toggle */}
            <div className="mb-6">
              <label className="block mb-3 text-lg font-medium text-blue-300">Mode:</label>
              <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg inline-flex shadow-lg">
                <Toggle
                  pressed={mode === 'validation'}
                  onPressedChange={toggleMode}
                  disabled={loading}
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Validation
                </Toggle>
                <Toggle
                  pressed={mode === 'generation'}
                  onPressedChange={toggleMode}
                  disabled={loading}
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generation
                </Toggle>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none transition-all duration-500 hover:shadow-glow text-lg py-3"
              >
                {loading ? 'Processing...' : 'Run Debate'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {debateData && (
                <Button
                  type="button"
                  onClick={reset}
                  variant="outline"
                  className="border-blue-500/30 text-blue-300 hover:bg-blue-900/20 hover:border-blue-400"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg backdrop-blur-sm animate-fade-in">
            <div className="text-red-300 font-medium">Error: {error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-6 p-6 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.1)] animate-fade-in">
            <p className="mb-4 font-semibold text-blue-300 text-center">{progress}</p>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full animate-pulse w-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestDebateUI;