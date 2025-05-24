// GettingStarted.jsx
import { useState } from 'react'
import { ChevronDown, Play, Code, Zap, Trophy } from 'lucide-react'

function GettingStarted() {
  const [openItem, setOpenItem] = useState("step-1")

  const toggleItem = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId)
  }

  return (
    <section
      className="w-full py-16 md:py-24 relative z-10 animate-fade-in-scroll"
      style={{ animationDelay: "600ms" }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          How to Get Started
        </h2>

        <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-gray-800 divide-y divide-gray-800 hover:shadow-glow-subtle transition-all duration-500 overflow-hidden">
          {/* Step 1 */}
          <div className="group">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 hover:bg-gray-900/50 transition-colors ${
                openItem === "step-1" ? "text-blue-400" : "text-white"
              }`}
              onClick={() => toggleItem("step-1")}
              aria-expanded={openItem === "step-1"}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openItem === "step-1" ? "bg-blue-800/40" : "bg-blue-900/30"
                }`}>
                  <Play className="h-4 w-4 text-blue-400" />
                </div>
                <span className="font-medium text-lg">Sign Up and Create Your Project (We actually dont have sign up dont mind this)</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openItem === "step-1" ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openItem === "step-1" ? "animate-accordion-down" : "animate-accordion-up h-0"
              }`}
            >
              <div className="px-6 pb-4 text-gray-400">
                {/* Text for step 1 accordion box */}
                <div className="pl-10 border-l-2 border-blue-900/30 animate-content-fade-in">
                  <p className="mb-3">
                    Start by creating your account and setting up your first project. Our streamlined onboarding process makes it easy to get started in minutes.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Create your account with email or social login</li>
                    <li>Set up your project with a name and description</li>
                    <li>Invite team members to collaborate (optional)</li>
                  </ul>
                  {/* accordion box step 1 */}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 hover:bg-gray-900/50 transition-colors ${
                openItem === "step-2" ? "text-blue-400" : "text-white"
              }`}
              onClick={() => toggleItem("step-2")}
              aria-expanded={openItem === "step-2"}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openItem === "step-2" ? "bg-blue-800/40" : "bg-blue-900/30"
                }`}>
                  <Code className="h-4 w-4 text-blue-400" />
                </div>
                <span className="font-medium text-lg">Define Your Concept</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openItem === "step-2" ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openItem === "step-2" ? "animate-accordion-down" : "animate-accordion-up h-0"
              }`}
            >
              <div className="px-6 pb-4 text-gray-400">
                {/* Step 2 accordion box */}
                <div className="pl-10 border-l-2 border-blue-900/30 animate-content-fade-in">
                  <p className="mb-3">
                    Clearly articulate your idea or concept that you want to validate or expand upon. The more specific you are, the better results you'll get.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Write a concise description of your concept</li>
                    <li>Specify the problem your idea solves</li>
                    <li>Identify your target audience or market</li>
                  </ul>
                  {/* END */}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 hover:bg-gray-900/50 transition-colors ${
                openItem === "step-3" ? "text-blue-400" : "text-white"
              }`}
              onClick={() => toggleItem("step-3")}
              aria-expanded={openItem === "step-3"}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openItem === "step-3" ? "bg-blue-800/40" : "bg-blue-900/30"
                }`}>
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>
                <span className="font-medium text-lg">Generate Insights</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openItem === "step-3" ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openItem === "step-3" ? "animate-accordion-down" : "animate-accordion-up h-0"
              }`}
            >
              <div className="px-6 pb-4 text-gray-400">
                {/* PLACEHOLDER: Add your content for Step 3 here */}
                <div className="pl-10 border-l-2 border-blue-900/30 animate-content-fade-in">
                  <p className="mb-3">
                    Choose between Validation or Generation mode to get AI-powered insights on your concept. Our system will analyze your idea from multiple perspectives.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Select Validation mode to test the strength of your existing idea</li>
                    <li>Choose Generation mode to expand and explore new variations</li>
                    <li>Review the multi-perspective analysis provided by our AI</li>
                  </ul>
                  {/* END PLACEHOLDER */}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="group">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 hover:bg-gray-900/50 transition-colors ${
                openItem === "step-4" ? "text-blue-400" : "text-white"
              }`}
              onClick={() => toggleItem("step-4")}
              aria-expanded={openItem === "step-4"}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openItem === "step-4" ? "bg-blue-800/40" : "bg-blue-900/30"
                }`}>
                  <Trophy className="h-4 w-4 text-blue-400" />
                </div>
                <span className="font-medium text-lg">Refine and Implement</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openItem === "step-4" ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openItem === "step-4" ? "animate-accordion-down" : "animate-accordion-up h-0"
              }`}
            >
              <div className="px-6 pb-4 text-gray-400">
                {/* PLACEHOLDER: Add your content for Step 4 here */}
                <div className="pl-10 border-l-2 border-blue-900/30 animate-content-fade-in">
                  <p className="mb-3">
                    Use the insights to refine your concept and prepare for implementation. Our platform helps you track changes and improvements over time.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Incorporate feedback to strengthen your concept</li>
                    <li>Save different versions to track your progress</li>
                    <li>Export insights to share with your team or stakeholders</li>
                  </ul>
                  {/* END PLACEHOLDER */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GettingStarted