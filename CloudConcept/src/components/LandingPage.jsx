import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { useState } from 'react'
import { Sparkles, CheckCircle, ArrowRight, CloudFog } from 'lucide-react'
import Features from './Features' // Import the Features component
import TerminalBox from "./TerminalBox"
import Footer from "./Footer"
import GettingStarted from "./GettingStarted"
import { useNavigate } from "react-router-dom"

function LandingPage() {
  const [mode, setMode] = useState('validation');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden landing-page">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-[100px] animate-float-delayed"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle bg-blue-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6 relative z-10">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <CloudFog className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-blue-500 blur-md opacity-50 group-hover:opacity-70 group-hover:scale-125 transition-all duration-300 rounded-full"></div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">
            CloudConcept AI
          </span>
        </div>
        
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Kickstart Your Hackathon Journey
          </h1>
          
          {/* Cool Subheading  */}
          <div className="mb-10">
            <span className="inline-block px-6 py-3 rounded-lg bg-black/50 border border-blue-500/50 text-blue-300 font-medium tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
                Your assistant for validating and refining hackathon concepts.
            </span>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-2 rounded-full mb-12 inline-flex animate-fade-in-delayed shadow-lg hover:shadow-glow-subtle transition-all duration-500">
          <Toggle
            pressed={mode === 'validation'}
            onPressedChange={() => setMode('validation')}
            className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-6 py-2 rounded-full transition-all duration-300"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Validation
          </Toggle>
          <Toggle
            pressed={mode === 'generation'}
            onPressedChange={() => setMode('generation')}
            className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-6 py-2 rounded-full transition-all duration-300"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generation
          </Toggle>
        </div>

        <Button 
          className="animate-fade-in-delayed-more py-6 px-8 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none transition-all duration-500 hover:shadow-glow group"
          onClick={() =>  navigate('/test')}
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </section>

      {/* Features Section */}
      <Features />

      {/*Terminal yayayayya*/}
      <TerminalBox />

      {/*Getting Started Accordion Box*/}
      <GettingStarted />

      {/*Footer page*/}
      <Footer />
    </div>
  );
}

export default LandingPage;