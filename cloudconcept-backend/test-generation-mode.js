//test generation mode (PLEASE WORK PLEASE WORK :pray:)
const axios = require('axios');

async function testGenerationMode() {
  try {
    console.log('Testing generation mode...\n');
    
    const response = await axios.post('http://localhost:3001/api/debate', {
      prompt: 'I need an education app idea',
      category: 'education',
      mode: 'generation',
      projectContext: {}
    });
    
    console.log('Generation completed successfully!\n');
    
    // Show Initial Concepts
    console.log('=== INITIAL CONCEPTS ===');
    console.log(response.data.data.initialConcepts);
    
    // Show Agent Analyses
    console.log('\n=== AGENT ANALYSES ===');
    Object.entries(response.data.data.agentAnalyses).forEach(([agent, data]) => {
      console.log(`\n${data.role}:`);
      console.log(data.analysis.substring(0, 300) + '...\n');
    });
    
    // Show Final Concept
    console.log('\n=== FINAL CONCEPT ===');
    console.log(response.data.data.finalConcept.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testGenerationMode();