// test-full-debate.js - Updated version
const axios = require('axios');

async function testFullDebate() {
  try {
    console.log('Starting full debate test...\n');
    
    const response = await axios.post('http://localhost:3001/api/debate', {
      prompt: 'I want to build a note-taking app for students that helps identify knowledge gaps',
      category: 'education',
      projectContext: {}
    });
    
    console.log('Debate completed successfully!\n');
    
    // Show Initial Analyses
    console.log('=== INITIAL ANALYSES ===');
    Object.entries(response.data.data.initialAnalyses).forEach(([agent, data]) => {
      console.log(`\n${data.role}:`);
      console.log(data.analysis.substring(0, 300) + '...\n');
    });
    
    // Show Cross-Examination (THIS WAS MISSING!)
    console.log('\n=== CROSS-EXAMINATION ===');
    Object.entries(response.data.data.crossExamination).forEach(([interaction, data]) => {
      console.log(`\n${interaction}:`);
      console.log('Challenge:', data.challenge.substring(0, 200) + '...');
      console.log('Response:', data.response.substring(0, 200) + '...\n');
    });
    
    // Show Final Synthesis
    console.log('\n=== FINAL SYNTHESIS ===');
    console.log(response.data.data.finalSynthesis.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}


testFullDebate();