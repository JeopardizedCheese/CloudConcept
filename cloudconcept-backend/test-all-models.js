const { modelHandlers } = require('./src/services/modelService')

async function testAllModels() {
    const testPrompt = "Briefly describe what makes a good hackathon project"

    console.log('Testing all Ollama models..\n')

    for (const [modelId, handler] of Object.entries(modelHandlers)) {
        if (modelId.includes('mock')) continue //Skip mocks

        console.log(`Testing ${modelId}...`)

        try {
            const response = await handler(testPrompt)
            console.log(`Response: ${response.substring(0, 100)}...\n`)
        } catch (error) {
            console.log(`Error: ${error.message}\n`)
        }
    }
}

testAllModels()