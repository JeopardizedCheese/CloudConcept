// test-commercial-apis.js
const { modelHandlers } = require('./src/services/modelService');

async function testCommercialAPIs() {
  console.log('Testing Commercial APIs...\n');
  
  // Test DeepSeek
  try {
    console.log('Testing DeepSeek...');
    const deepseekResponse = await modelHandlers.deepseek(
      "Briefly explain what makes a good synthesis of multiple viewpoints."
    );
    console.log('DeepSeek Response:', deepseekResponse.substring(0, 200) + '...\n');
  } catch (error) {
    console.error('DeepSeek Error:', error.message, '\n');
  }
  
  // Test GPT-3.5
  /*try {
    console.log('Testing GPT-3.5 Turbo...');
    const gptResponse = await modelHandlers['gpt-3.5-turbo'](
      "Briefly analyze the market potential for a note-taking app."
    );
    console.log('GPT-3.5 Response:', gptResponse.substring(0, 200) + '...\n');
  } catch (error) {
    console.error('GPT-3.5 Error:', error.message, '\n');
    }*/
}

testCommercialAPIs()