// src/api/services.js
import apiClient from './index';
import config from '../config';
import { findRelevantProjects } from '../utils/dataUtils';

// Keep your original AI_MODELS definitions for reference and UI display
export const AI_MODELS = {
  technicalExpert: {
    model: "llama3:8b",
    provider: "ollama",
    role: "Technical Feasibility Expert"
  },
  marketAnalyst: {
    model: "groq-market-analyst", // Changed from gpt
    provider: "groq", // I hate you now gpt >:C
    role: "Market & Commercial Analyst"
  },
  originalityAssessor: {
    model: "mistral:7b-instruct",
    provider: "ollama",
    role: "Originality Assessor"
  },
  ethicalEvaluator: {
    model: "phi3:mini",
    provider: "ollama",
    role: "Ethical Evaluator"
  },
  orchestrator: {
    model: "deepseek", 
    provider: "deepseek", 
    role: "Orchestrator"
  }
};

// Main function to initiate debate - simplified to match current backend
export async function generateDebate(prompt, category = 'general', mode = 'validation') {
  try {
    // Use the findRelevantProjects utility from your existing code
    const projectContext = findRelevantProjects(prompt, category, 5);

    // Call the single debate endpoint
    const response = await apiClient.post(config.debateEndpoint, {
      prompt,
      category,
      mode,
      projectContext
    });
    
    return response.data;
  } catch (error) {
    console.error('Error generating debate:', error);
    throw error;
  }
}

// Function to check if the backend is available
export async function checkAPIHealth() {
  try {
    const response = await apiClient.get(config.healthEndpoint);
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    return { status: 'error' };
  }
}

// Keep this function from your original code
export async function getAvailableModels() {
  try {
    const response = await apiClient.get('/api/models');
    return response.data.models || [];
  } catch (error) {
    console.error('Error fetching available models:', error);
    return [];
  }
}