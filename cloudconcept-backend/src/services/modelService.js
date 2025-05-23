//Model service

require('dotenv').config()
const axios = require('axios')
const OpenAI = require('openai')

//Initialize DeepSeek client using OpenAI SDK
const deepseek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY 
})

//Initialize Groq
const Groq = require('groq-sdk')
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

//Simple structure
const modelHandlers = {

    //Local Ollama models
    'llama3:8b': async (prompt) => {
        try {
            console.log("Calling Llama3 model...")
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3:8b',
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    max_tokens: 1000
                }
            })
            return response.data.response
        } catch (error) {
            console.error('Error calling Llama3, falling back to Groq:', error)
            //Return mock response for testing if Ollama isnt actually running (No need now)
            //Throw an actual error
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are a technical feasibility expert analyzing hackathon ideas."
                        },
                        { role: "user", content: prompt}
                    ],
                    model: "llama-3-8b-8192",
                    temperature: 0.7,
                    max_tokens: 1000
                })
                return completion.choices[0].message.content
            } catch (fallbackError) {
                console.error('Groq fallback also failed:', fallbackError)
                throw error
            }
        }
    },

    'mistral:7b-instruct': async (prompt) => {
        try {
            console.log("Calling Mistral model...")
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'mistral:7b-instruct',
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    max_tokens: 1000
                }
            })
            return response.data.response
        } catch (error) {
            console.error('Error calling Mistral, falling back to Groq:', error)
            //Return mock response for testing if Ollama isnt actually running (No need now)
            //Throw actual error instead
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are an originality assessor analyzing the uniqueness of ideas."
                        },
                        { role: "user", content:prompt }
                    ],
                    model: "llama-3.3-70b-versatile",
                    temperature: 0.7,
                    max_tokens: 1000
                })
                return completion.choices[0].message.content
            } catch (fallbackError) {
                console.error('Groq fallback also failed: ', fallbackError)
                throw error
            }
        }
    },

    'phi3:mini': async (prompt) => {
        try {
            console.log("Calling Phi3 model...")
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'phi3:mini',
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    max_tokens: 500
                }
            })
            return response.data.response
        } catch (error) {
            console.error('Error calling Phi3, falling back to Groq:', error)
            //Return mock response for testing if Ollama isnt actually running (no need now)
            //Throw in an actual error
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are an ethical evaluator focused on education technology. Keep responses concise and under 500 words."
                        },
                        { role: "user", content: prompt}
                    ],
                    model: "llama3-8b-8192",
                    temperature: 0.7,
                    max_tokens: 500
                })
                return completion.choices[0].message.content
            } catch (fallbackError) {
                console.error('Groq fallback also failed:', fallbackError)
                throw error
            }
        }
    },
    
    //Mock commercial models

    //DeepSeek as orchestrator
    //Dear god please work for me
    'deepseek': async (prompt) => {
        try {
            console.log('Calling DeepSeek model...')

            if (!process.env.DEEPSEEK_API_KEY) {
                console.log('No DeepSeek API key found, using mock response')
                return `[DeepSeek Mock Response] Synthesis for: ${prompt}...`
            }

            const completion = await deepseek.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are an expert orchestrator synthesizing multiple perspectives into cohesive recommendations."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "deepseek-chat",
                temperature: 0.7,
                max_tokens: 4000,
                stream: false
            })

            return completion.choices[0].message.content
        } catch (error) {
            console.error('Error calling DeepSeek:', error.message)
            throw error
        }
    },

    //Groq market analyst (replacing gpt-3.5 turbo)
    'groq-market-analyst': async (prompt) => {
        try {
            console.log('Calling Groq for market analysis...')
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a market analyst specializing in evaluating startup ideas, market potential, and commercial viability. Provide detailed analysis of market opportunities, competition, and monetization strategies."
                    },
                    { role: "user", content: prompt}
                ],
                model: "llama3-70b-8192",
                temperature: 0.7,
                max_tokens: 1000
            })
            return completion.choices[0].message.content
        } catch (error) {
            console.error('Error calling Groq:', error.message)
            throw error
        }
    },

}

module.exports = { modelHandlers }