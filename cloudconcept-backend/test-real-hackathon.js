// test-real-hackathon.js
const { runDebate, rankIdeas } = require('./src/services/debateService');

// Real project data from LabLab Custom GPTs 48 hours  Hackathon
const hackathonProjects = [
  {
    id: 1,
    name: "Radio Imaging and MusicGen Ai",
    description: "Radio Imaging and MusicGen AI, a pioneering Custum GPTs crafted for radio producers and music creators! This GPTs is a creative assistant both in audio and music production, harnessing the power of AI to address advanced real-world challenges in media production sectors. The primary goals for creating these custom GPTs are: 1. Innovation in Audio Production: To revolutionize radio imaging and music creation by integrating advanced AI capabilities, offering new, creative ways to produce audio content. 2. Simplification and Efficiency: To streamline the music and audio production process, making it more efficient and accessible for creators of all skill levels. 2. Diverse Creative Options: To provide a vast array of musical and audio possibilities, from generating music based on text prompts to offer novel radio imaging ideas, thereby enhancing creative freedom. 4. User Empowerment: To empower users with user-friendly guidance and the ability to build and run the system locally, catering to both novices and professionals. 5. Market Leadership in Audio AI: To position this GPTs as a leading tool in the field of AI-driven audio production, setting new standards for innovation and quality in the industry",
    category: "general",
    actualRank: "winner" // We'll use this for comparison later
  },
  {
    id: 2,
    name: "Peacefulness with Quran AI",
    description: "Peacefulness with Quran AI is an innovative project designed to blend the timeless wisdom of the Quran with the latest AI technology. This unique platform caters to individuals seeking spiritual guidance, emotional support, or deeper understanding of Islamic teachings. By inputting their feelings, questions, or topics of interest, users receive personalized, empathetic responses coupled with relevant Quranic verses. Each response is accompanied by a custom, Islamically-inspired image, enhancing the user's connection to the guidance. The AI strictly adheres to Islamic teachings, ensuring respect and authenticity in its interpretations. Its primary goal is to offer solace, clarity, and a positive, spiritually uplifting experience, while also serving as an educational tool about Islam's rich teachings. Peacefulness with Quran AI is a testament to how technology can be harmoniously integrated with religious and spiritual practices, offering a new dimension of engagement for the modern believer.",
    category: "general",
    actualRank: "runner-up"
  },
  {
    id: 3,
    name: "Bayesian GPT",
    description: "This GPT model functions as a Bayesian Reason Obsessed Scientist in the outlined scenario. Here's a breakdown of the tasks: 1. **Identifying Hypotheses and Evidence (H and E)**: The model first breaks down a problem into hypotheses (H) and evidence (E). This involves understanding the scenario and determining the key factors (hypotheses) and the available or needed information (evidence) to evaluate these hypotheses. The model confirms these choices with the user to ensure they align with the user's understanding and needs. 2. **Detailed Nuances and Research Questions**: The model then elaborates on H and E, diving into nuances and formulating research questions. These questions are designed to gather detailed insights, considering various aspects like timing, cost, location, risk, etc. The questions are structured to be answerable with a probability between 0 to 100%, facilitating a quantifiable assessment of each factor. The user is then asked to confirm these detailed aspects. 3. **Creating a Question-Answer Table**: A table is constructed to organize the questions and their corresponding answers. This table includes columns for the question, the estimated probability (0 to 100%), and a confidence value (50% to 99%) to reflect the model's certainty in each probability assessment. 4. **Research and Information Gathering**: The model conducts research using the Bing search engine, strategically breaking down questions into simpler queries to maximize the probability of finding relevant information. The model continues searching until it has sufficiently answered all the questions, or makes educated guesses where direct answers are not available. 5. **Populating the Table with Findings**: The table is updated with the findings from the research. Each entry includes the probability (0 to 100%) and an inferred confidence value (50 to 99%), reflecting the model's judgment based on the gathered information. 6. Do the calculations",
    category: "education",
    actualRank: "third place"
  },
  {
    id: 4,
    name: "Dogy AI",
    description: "As Dogy Companion, I am a specialized version of ChatGPT, designed to enhance the Dogy app by integrating features that assist dog owners in various aspects of dog care and lifestyle. My primary mission is to enrich the user experience by providing tailored information and advice on a wide range of topics, including finding dog-friendly locations, offering pet-friendly travel tips, suggesting mental stimulation activities for dogs, creating customized training plans, solving behavioral problems, and providing personalized advice on nutrition and wellness. My functionalities are diverse: Finding Dog-Friendly Places: I recommend dog-friendly parks, cafes, and stores, considering the user's location and preferences. Pet-Friendly Travel Tips: I provide guidance on traveling in cities with dogs, focusing on public transport rules and pet-friendly accommodations. Mental Stimulation Activities: I suggest games and activities tailored to a dog's breed and energy level. Customized Training Plans: I create training routines personalized for dogs' behavioral goals and needs. Behavioral Problem Solving: I offer solutions and advice for common dog behavioral issues. Personalized Advice Generation: I generate bespoke advice on dog care, focusing on various aspects such as behavior, training, nutrition, and overall wellness. Nutritional Guidance: I provide diet recommendations and feeding tips based on a dog's breed, age, and health. Do's and Don'ts Education: I educate owners on responsible dog ownership in urban settings, including laws and etiquette. My approach is user-friendly, inclusive, and safety-oriented, ensuring that the advice I provide is relevant, practical, and caters to a diverse range of dog owners. I integrate user feedback to continuously improve the service and encourage professional consultation for complex issues.",
    category: "medical",
    actualRank: "participant"
  },
  /*{
    id: 5,
    name: "Eat The Frog Assistant",
    description: `🌟 Welcome to "Eat the Frog" 🐸 - Your Personal Productivity Partner! 🌟 Are you struggling to tackle your to-do list? Feeling overwhelmed by tasks that seem too daunting to begin? Say hello to "Eat the Frog," a unique productivity chatbot designed to transform your day! 🐸 What is "Eat the Frog"? 🐸 Inspired by the famous "Eat the Frog" method, I'm here to guide you through the process of identifying and conquering your most challenging and impactful tasks each day. Think of me as your personal task-tracker, scheduler, and motivational coach, all rolled into one friendly bot! 🎯 My Mission: To make productivity approachable, manageable, and even enjoyable. I'll help you break down your daily tasks into bite-sized pieces, prioritize them effectively, and schedule them in a way that maximizes your energy and focus. 👍 Why Choose "Eat the Frog"? Personalized Task Management: I'm adept at understanding your tasks, deadlines, and priorities through natural language processing. Prioritization Guidance: I'll assist you in identifying your 'frog' - the most crucial, albeit challenging task - and guide you in tackling it head-on. Step-by-Step Breakdowns: No task is too big! I'll help you divide your tasks into smaller, more manageable sub-tasks for easier completion. Optimized Scheduling: I advise scheduling your 'frog' for the first part of your day and help you set reminders to keep you on track. Continuous Improvement: Through daily reflections and feedback, I'll adapt and fine-tune my guidance to suit your evolving productivity needs. 🌈 Experience a Productivity Transformation! With "Eat the Frog," you'll not only get things done but get them done efficiently and with a sense of accomplishment. Let's leap into productivity together, one task at a time! 🐸💪📅 app that monitors carbon footprint, suggests eco-friendly alternatives, and gamifies environmental conservation. Connects with IoT devices and provides community challenges.`,
    category: "general",
    actualRank: "participant"
  },
  {
    id: 6,
    name: "Eco Mentor",
    description: "Eco Mentor is a groundbreaking AI-powered platform focused on environmental education and sustainability. Aimed at fostering a deeper understanding of ecological concerns and promoting sustainable practices, the platform caters to individuals eager to make environmentally conscious choices. The core problem addressed is the gap in accessible, personalized environmental education and community involvement in sustainability initiatives. Eco Mentor offers a solution by integrating AI to deliver customized learning experiences, connecting users with local eco-friendly projects, and providing interactive challenges and tools for eco-conscious living. Unique features include a real-time impact visualization of users' eco-actions, a forum for sharing experiences, and AI assistance for eco-friendly shopping. The platform targets environmentally conscious individuals, educators, and students, making sustainability an engaging, collaborative journey.",
    category: "sustainability",
    actualRank: "participant"
  },
  {
    id: 7,
    name: "CogniSphere",
    description: `I. Introduction: CogniSphere is an avant-garde artificial intelligence framework, intricately designed to emulate human cognitive processes. Utilizing the distinctive "Branch, Solve, Merge" methodology, CogniSphere's GPTs (Generative Pre-trained Transformers) dissect, analyze, and synthesize information, effectively mirroring the complexities and nuances of human thought. This state-of-the-art system is set to revolutionize domains such as education, complex problem-solving, and human-computer interaction, offering an unmatched platform for cognitive exploration and comprehension. System Components: A. Logical Processing Unit (Branch Phase): - Role: Focuses on logical, analytical, and systematic thinking. - Technique: Diverges queries into logical components for comprehensive analysis. B. Creative Processing Unit (Solve Phase): - Role: Fosters intuitive, artistic, and imaginative thinking. - Technique: Addresses queries by delving into creative and novel solutions. C. Integrative Core (Merge Phase): - Role: Unifies logical and creative insights into a cohesive, coherent response. - Technique: Balances and integrates diverse outputs, maintaining context and coherence. Branch, Solve, Merge Method: Branch: Segregates incoming queries into distinct elements for specialized processing. Solve: Processes each element independently using either logical or creative modules. Merge: Seamlessly amalgamates the processed information, ensuring a holistic and contextually accurate response. Query Management System: Purpose: Preserves conversational context, augmenting responsiveness and comprehension. Technique: Weaves historical and current queries within the integrative core for continuity. `,
    category: "education",
    actualRank: "participant"
  },
  {
    id: 8,
    name: "AI-Custom-Meal-Planner",
    description: "Customized Meal Planner is a specialized assistant that creates personalized meal plans based on detailed inputs from the Meal Planner Form. The form includes diet type, dietary restrictions, daily calorie intake, total calorie count, macronutrient counts, physical details, and goals, along with a Detailed Recipe Description section. The GPT now formats meal plans in a structured table format, listing each day's meals with columns for Meal, Dish, Ingredients, Preparation, Calories, and macros (Protein, Carbs, Fats). This format provides a clear, organized presentation of the meal plan, including a total daily nutritional breakdown. When calorie intake and macronutrient balance aren't provided, the GPT calculates them based on the user's details and goals. The GPT aims to provide accurate, detailed, and helpful responses, and it advises consulting a healthcare professional for personalized advice.",
    category: "medical",
    actualRank: "participant"
  }*/
];

// Batch processing function
async function runBatchAnalysis(projects) {
  console.log(`\n🚀 Starting CloudConcept analysis of ${projects.length} hackathon projects...\n`);
  
  const results = [];
  
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    console.log(`\n--- Analyzing Project ${i + 1}/${projects.length}: ${project.name} ---`);
    
    try {
      // Format the project description as a hackathon idea prompt
      const prompt = `${project.name}: ${project.description}`;
      
      // Run through CloudConcept validation mode
      const debateResult = await runDebate(prompt, project.category, null, 'validation');
      
      // Store result with metadata
      results.push({
        projectId: project.id,
        projectName: project.name,
        category: project.category,
        actualRank: project.actualRank,
        debateResult: debateResult,
        analysisScore: extractScore(debateResult.finalSynthesis), // Helper function
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Completed analysis of ${project.name}`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error analyzing ${project.name}:`, error.message);
      results.push({
        projectId: project.id,
        projectName: project.name,
        category: project.category,
        actualRank: project.actualRank,
        debateResult: null,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  return results;
}

// Helper function to extract a rough "score" from the synthesis
function extractScore(synthesis) {
  if (!synthesis) return 0;
  
  // Simple scoring based on positive keywords in the synthesis
  const positiveWords = ['innovative', 'excellent', 'strong', 'promising', 'viable', 'outstanding', 'competitive', 'unique', 'valuable'];
  const negativeWords = ['challenging', 'difficult', 'limited', 'weak', 'concerning', 'risky', 'problematic'];
  
  let score = 50; // Base score
  
  positiveWords.forEach(word => {
    if (synthesis.toLowerCase().includes(word)) score += 5;
  });
  
  negativeWords.forEach(word => {
    if (synthesis.toLowerCase().includes(word)) score -= 3;
  });
  
  return Math.max(0, Math.min(100, score)); // Clamp between 0-100
}

// Ranking and comparison function
async function rankAndCompare(analysisResults) {
  console.log('\n🏆 Ranking projects and comparing with actual results...\n');
  
  // Filter out failed analyses
  const validResults = analysisResults.filter(result => result.debateResult !== null);
  
  if (validResults.length === 0) {
    console.log('❌ No valid analyses to rank');
    return;
  }
  
  try {
    // Prepare data for ranking
    const ideaResults = validResults.map(result => ({
      finalSynthesis: result.debateResult.finalSynthesis,
      projectName: result.projectName,
      actualRank: result.actualRank
    }));
    
    // Get CloudConcept's ranking
    const ranking = await rankIdeas(ideaResults);
    
    console.log('🎯 CloudConcept Ranking Results:');
    console.log('=====================================');
    console.log(ranking.ranking);
    console.log('=====================================\n');
    
    // Compare with actual results
    console.log('📊 Comparison with Actual Hackathon Results:');
    console.log('============================================');
    
    validResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result.projectName}`);
      console.log(`   CloudConcept Score: ${result.analysisScore}/100`);
      console.log(`   Actual Result: ${result.actualRank}`);
      console.log(`   Category: ${result.category}\n`);
    });
    

    calculateAccuracy(validResults, ranking);
    
  } catch (error) {
    console.error('❌ Error during ranking:', error.message);
  }
}


function calculateAccuracy(results, ranking) {
  const actualWinners = results.filter(r => r.actualRank === 'winner').map(r => r.projectName);
  const actualFinalists = results.filter(r => r.actualRank === 'finalist' || r.actualRank === 'runner-up').map(r => r.projectName);
  
  console.log('🎯 Accuracy Analysis:');
  console.log('====================');
  console.log(`Actual Winners: ${actualWinners.join(', ')}`);
  console.log(`Actual Finalists: ${actualFinalists.join(', ')}`);
  console.log('\nCloudConcept\'s prediction accuracy will be shown above in the ranking results.');
}

// Main execution function
async function runHackathonTest() {
  console.log('🚀 CloudConcept Hackathon Prediction Test');
  console.log('==========================================');
  console.log('Testing against LabLab Custom GPTs Hackathon data\n');
  
  try {
    // Step 1: Run batch analysis
    const analysisResults = await runBatchAnalysis(hackathonProjects);
    
    // Step 2: Rank and compare
    await rankAndCompare(analysisResults);
    
    // Step 3: Save results for demo
    const fs = require('fs');
    fs.writeFileSync('hackathon-test-results.json', JSON.stringify({
      testDate: new Date().toISOString(),
      totalProjects: hackathonProjects.length,
      successfulAnalyses: analysisResults.filter(r => r.debateResult !== null).length,
      results: analysisResults
    }, null, 2));
    
    console.log('\n✅ Test completed! Results saved to hackathon-test-results.json');
    console.log('📋 Use this data for your presentation demo!');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

// Export for use in other files
module.exports = { runHackathonTest, hackathonProjects };


if (require.main === module) {
  runHackathonTest();
}