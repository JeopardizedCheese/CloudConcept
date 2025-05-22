const axios = require('axios')

async function testOllama() {
    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3:8b',
            prompt: 'Hello, this is a test. Respond briefly.',
            stream: false
        })

        console.log('Ollama response:', response.data.response)
    } catch (error) {
        console.error('Error calling Ollama:', error.message)
    }
}

testOllama()