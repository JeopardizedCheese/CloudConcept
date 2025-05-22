// test-groq-key.js
require('dotenv').config();
const Groq = require('groq-sdk');

async function testGroqKey() {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    console.log('Testing Groq API key...');
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: "Say hello!" }
      ],
      model: "llama3-70b-8192",
      max_tokens: 10
    });

    console.log('Success! Groq says:', completion.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Please check your API key in the .env file');
  }
}

testGroqKey()