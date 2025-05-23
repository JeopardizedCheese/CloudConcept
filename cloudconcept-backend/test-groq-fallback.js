const { modelHandlers } = require('./src/services/modelService')

async function testFallbacks() {
    const testPrompt = "Test prompt for an AI model";

    console.log("Testing Llama3 fallback...");
    try {
        const result1 = await modelHandlers['llama3:8b'](testPrompt);
        console.log("✅ Llama3:", result1.substring(0, 100) + "...");
    } catch (e) {
        console.log("❌ Llama3 failed:", e.message)
    }

    console.log("\nTesting Mistral fallback...")
    try {
        const result2 = await modelHandlers['mistral:7b-instruct'](testPrompt);
        console.log("✅ Mistral:", result2.substring(0, 100) + "...");
    } catch (e) {
        console.log("❌ Mistral failed:", e.message);
    }

    console.log("\nTesting Phi3 fallback...");
    try {
        const result3 = await modelHandlers['phi3:mini'](testPrompt);
        console.log("✅ Phi3:", result3.substring(0, 100) + "...");
    } catch (e) {
        console.log("❌ Phi3 failed:", e.message)
    }
}

testFallbacks()