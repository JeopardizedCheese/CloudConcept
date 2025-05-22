// test-debate.js
const axios = require('axios');

async function testDebate() {
  try {
    const response = await axios.post('http://localhost:3001/api/debate', {
      prompt: 'I need an idea for a note-taking education app',
      category: 'education',
      projectContext: {}
    });
    
    console.log('Debate result:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testDebate();