import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AI_MODELS } from '../api/services'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// StyledMarkdown component for formatting AI outputs
function StyledMarkdown({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold my-4 text-blue-400" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold my-3 text-blue-300" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold my-2 text-blue-200" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-base font-bold my-2 text-blue-200" {...props} />,
        p: ({ node, ...props }) => <p className="my-2 text-gray-300" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-2 text-gray-300" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-2 text-gray-300" {...props} />,
        li: ({ node, ...props }) => <li className="my-1" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-blue-200" {...props} />,
        code: ({ node, inline, ...props }) => 
          inline ? (
            <code className="bg-gray-700 px-1 rounded text-blue-200" {...props} />
          ) : (
            <pre className="bg-gray-800 text-gray-200 p-3 rounded my-2 overflow-auto">
              <code {...props} />
            </pre>
          ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function ResultsPage({ debateData, onReset }) {
  const navigate = useNavigate();

  // Agent colors matching your existing system
  const agentColors = {
    technicalExpert: '#4F46E5',
    marketAnalyst: '#10B981', 
    originalityAssessor: '#F59E0B',
    ethicalEvaluator: '#EF4444',
    orchestrator: '#8B5CF6'
  };

  const getAgentColor = (agentId) => agentColors[agentId] || '#6B7280';

  if (!debateData) {
    return <div>No debate data available</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Same background elements as landing page */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-[100px] animate-float-delayed"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {new Date(debateData.timestamp).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mode: {debateData.mode}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10 max-w-4xl">
        
        {/* Results Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            AI Debate Results
          </h1>
          <div className="inline-block px-6 py-3 rounded-lg bg-black/50 border border-blue-500/50 text-blue-300 font-medium tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <CheckCircle className="inline mr-2 h-4 w-4" />
            Analysis Complete
          </div>
        </div>

        {/* Results Content */}
        <div className="space-y-6 animate-fade-in-delayed">
          
          {/* Final Result Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              {debateData.mode === 'generation' ? 'Final Concept' : 'Final Synthesis'}
            </h2>
            <div className="prose prose-invert max-w-none">
              <StyledMarkdown content={debateData.finalConcept || debateData.finalSynthesis} />
            </div>
          </div>

          {/* Accordion Sections */}
          <Accordion type="multiple" className="space-y-4">
            
            {/* Initial Analyses */}
            <AccordionItem value="analyses" className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <AccordionTrigger className="text-xl font-semibold text-blue-400 px-6 py-4 hover:text-blue-300">
                {debateData.mode === 'generation' ? 'Agent Analyses' : 'Initial Analyses'}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  {Object.entries(debateData.agentAnalyses || debateData.initialAnalyses || {}).map(([agentId, data]) => (
                    <div key={agentId} className="border-l-4 pl-4" style={{ borderColor: getAgentColor(agentId) }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: getAgentColor(agentId) }}
                        >
                          {data.role[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{data.role}</h3>
                          <span className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-400">
                            {AI_MODELS[agentId]?.model || agentId}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <StyledMarkdown content={data.analysis} />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/*Debug*/}
            {console.log('Cross-examination data:', debateData.crossExamination)}
            {console.log('Traditional:', debateData.crossExamination?.traditional)}
            {console.log('Role-switch:', debateData.crossExamination?.roleSwitch)}
            <div style={{color: 'red', fontSize: '12px'}}>
              DEBUG: {JSON.stringify(Object.keys(debateData.crossExamination || {}), null, 2)}
            </div>

            {/* Cross-Examination */}
            {debateData.crossExamination && Object.keys(debateData.crossExamination).length > 0 && (
              <AccordionItem value="cross-exam" className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <AccordionTrigger className="text-xl font-semibold text-blue-400 px-6 py-4 hover:text-blue-300">
                  Cross-Examination Debate
                </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
      
            {/* Traditional Cross-Examination */}
            {debateData.crossExamination.traditional && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Traditional Cross-Examination</h3>
            <div className="space-y-6">
              {Object.entries(debateData.crossExamination.traditional).map(([interaction, data]) => {
                const [challenger, challenged] = interaction.split('_to_');
                const challengerData = debateData.agentAnalyses?.[challenger] || debateData.initialAnalyses?.[challenger];
                const challengedData = debateData.agentAnalyses?.[challenged] || debateData.initialAnalyses?.[challenged];
              
                return (
                  <div key={interaction} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: getAgentColor(challenger) }}
                      >
                        {challenger[0].toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-400">
                        {challengerData?.role || challenger} challenges {challengedData?.role || challenged}
                      </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 pl-4" style={{ borderColor: getAgentColor(challenger) }}>
                      <div className="text-sm font-medium text-gray-400 mb-1">Challenge:</div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <StyledMarkdown content={data.challenge} />
                      </div>
                    </div>
                    
                    <div className="border-l-4 pl-4" style={{ borderColor: getAgentColor(challenged) }}>
                      <div className="text-sm font-medium text-gray-400 mb-1">Response:</div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <StyledMarkdown content={data.response} />
                      </div>
                    </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Role-Switch Cross-Examination */}
      {debateData.crossExamination.roleSwitch && (
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Role-Switch Cross-Examination</h3>
          <div className="space-y-6">
            {Object.entries(debateData.crossExamination.roleSwitch).map(([interaction, data]) => {
              return (
                <div key={interaction} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs">
                      🎭
                    </div>
                    <span className="text-sm text-gray-400">
                      {data.originalRole} acting as {data.challengerRole}
                    </span>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="text-sm font-medium text-gray-400 mb-1">Role-Switch Challenge:</div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <StyledMarkdown content={data.challenge} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </AccordionContent>
  </AccordionItem>
)}

            {/* Generation Mode: Initial Concepts */}
            {debateData.mode === 'generation' && debateData.initialConcepts && (
              <AccordionItem value="concepts" className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <AccordionTrigger className="text-xl font-semibold text-blue-400 px-6 py-4 hover:text-blue-300">
                  Initial Concepts
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <StyledMarkdown content={debateData.initialConcepts} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

          </Accordion>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12 animate-fade-in-delayed-more">
          <Button
            onClick={() => {
                console.log('Button clicked!');
                console.log('About to call on reset function');
                onReset()
                 console.log('onReset called successfully!');
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none transition-all duration-500 hover:shadow-glow"
          >
            Start New Debate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;