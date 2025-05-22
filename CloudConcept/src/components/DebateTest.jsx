// src/components/DebateTest.jsx

//It's supposed to display the cross examination too, try and examine debateService.js

/*import React, { useState } from 'react';
import { useDebate } from '../hooks/useDebate';

function DebateTest() {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('general');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      startDebate(prompt, category, mode);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CloudConcept Debate Test</h1>
      
      <div className="mb-4 flex items-center gap-2">
        <div className="font-medium">Mode:</div>
        <button
          onClick={toggleMode}
          className={`px-3 py-1 rounded-md ${
            mode === 'validation'
              ? 'bg-blue-600 text-white'
              : 'bg-purple-600 text-white'
          }`}
        >
          {mode === 'validation' ? 'Validation' : 'Generation'}
        </button>
        <div className="ml-2 text-sm text-gray-500">
          {mode === 'validation' 
            ? 'Analyze and improve your idea' 
            : 'Generate new ideas from scratch'}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {mode === 'validation' 
              ? 'Your Idea' 
              : 'What kind of idea are you looking for?'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === 'validation'
                ? 'Describe your hackathon idea...'
                : 'I need an idea for a healthcare app...'
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="general">General</option>
            <option value="education">Education</option>
            <option value="medical">Medical</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Start Debate'}
          </button>
          
          {debateData && (
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              Reset
            </button>
          )}
        </div>
      </form>
      
      {progress && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center">
            <div className="mr-3 h-4 w-4 rounded-full bg-blue-600 animate-pulse"></div>
            <div>{progress}</div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          Error: {error}
        </div>
      )}
      
      {debateData && (
        <div className="border border-gray-200 rounded-md">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold">Debate Results</h2>
          </div>
          
          <div className="p-4">
            {mode === 'validation' ? (
              <>
                <h3 className="text-lg font-medium mb-2">Initial Analyses</h3>
                {Object.entries(debateData.initialAnalyses).map(([agentId, data]) => (
                  <div key={agentId} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="font-semibold">{data.role}</h4>
                    <p className="text-sm whitespace-pre-line">{data.analysis.substring(0, 300)}...</p>
                  </div>
                ))}
                
                <h3 className="text-lg font-medium mb-2 mt-6">Cross-Examination</h3>
                {Object.entries(debateData.crossExamination).map(([interaction, data]) => (
                  <div key={interaction} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="font-semibold">{interaction}</h4>
                    <div className="mt-2">
                      <div className="font-medium text-sm">Challenge:</div>
                      <p className="text-sm">{data.challenge.substring(0, 200)}...</p>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium text-sm">Response:</div>
                      <p className="text-sm">{data.response.substring(0, 200)}...</p>
                    </div>
                  </div>
                ))}
                
                <h3 className="text-lg font-medium mb-2 mt-6">Final Synthesis</h3>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md whitespace-pre-line">
                  {debateData.finalSynthesis.substring(0, 500)}...
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-2">Initial Concepts</h3>
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-md whitespace-pre-line">
                  {debateData.initialConcepts.substring(0, 500)}...
                </div>
                
                <h3 className="text-lg font-medium mb-2 mt-6">Expert Analyses</h3>
                {Object.entries(debateData.agentAnalyses).map(([agentId, data]) => (
                  <div key={agentId} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="font-semibold">{data.role}</h4>
                    <p className="text-sm whitespace-pre-line">{data.analysis.substring(0, 300)}...</p>
                  </div>
                ))}
                
                <h3 className="text-lg font-medium mb-2 mt-6">Final Concept</h3>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-md whitespace-pre-line">
                  {debateData.finalConcept.substring(0, 500)}...
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DebateTest;*/