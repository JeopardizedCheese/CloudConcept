// src/services/debateService.js
const { modelHandlers } = require('./modelService');

// Define our AI agents with their roles and perspectives
const agents = {
  technicalExpert: {
    modelId: 'llama3:8b',
    role: 'Technical Feasibility Expert',
    prompt: 'You are a technical feasibility expert. Analyze this idea and evaluate its technical implementation challenges, required technologies, and feasibility for a hackathon setting. Focus on what can realistically be built in 48 hours.'
  },
  marketAnalyst: {
    modelId: 'groq-market-analyst',
    role: 'Market & Commercial Analyst',
    prompt: 'You are a market analyst. Evaluate this idea\'s market potential, target audience, and competitive landscape. Identify what would make this commercially viable and how it could be differentiated.'
  },
  originalityAssessor: {
    modelId: 'mistral:7b-instruct',
    role: 'Originality Assessor',
    prompt: 'You are an originality assessor. Analyze how unique and innovative this idea is compared to existing solutions. Identify what makes this idea distinct or if it\'s too derivative.'
  },
  ethicalEvaluator: {
    modelId: 'phi3:mini',
    role: 'Ethical Evaluator',
    prompt: 'You are an Ethical Evaluator specializing in analyzing technology proposals and concepts. Your ONLY role is to identify and evaluate ethical concerns in the ideas presented to you.'
  },
  orchestrator: {
    modelId: 'deepseek',
    role: 'Orchestrator',
    prompt: 'You are the orchestrator. Synthesize the analyses from multiple expert perspectives into a cohesive recommendation. Balance technical feasibility, market potential, originality, and ethical considerations to provide a refined version of the original idea.'
  }
};

// Main function to run the debate
async function runDebate(userPrompt, category, projectContext, mode = 'validation') {
  console.log('Starting debate process...');
  console.log('User prompt:', userPrompt);
  console.log('Category:', category);
  
  try {

    if (mode === 'generation') {
      return await runGenerationMode(userPrompt, category, projectContext)
    } else {
      // Phase 1: Initial analyses from each expert
      const initialAnalyses = await runInitialAnalyses(userPrompt);
      
      // Phase 2: Cross-examination between experts
      const crossExamination = await runCrossExamination(initialAnalyses);
      
      // Phase 3: Final synthesis by the orchestrator
      const finalSynthesis = await generateFinalSynthesis(
        userPrompt, 
        initialAnalyses, 
        crossExamination
      );
      
      return {
        initialAnalyses,
        crossExamination,
        finalSynthesis,
        timestamp: new Date().toISOString()
      };

    }

  } catch (error) {
    console.error('Error in debate process:', error);
    throw error;
  }
}

async function runGenerationMode(userPrompt, category, projectContext) {
  console.log('\n--- Generation Mode ---');
  
  // Step 1: Orchestrator generates initial ideas
  console.log('Step 1: Generating initial concepts...');
  const orchestratorPrompt = `
${agents.orchestrator.prompt}

Mode: IDEA GENERATION

IMPORTANT OUTPUT INSTRUCTIONS:
1. Generate exactly 3 distinct, innovative ${category} concept ideas
2. For each concept, use this EXACT format for maximum clarity:

### [CONCEPT NAME]
**Summary:** One paragraph description
**Key Features:**
- Feature 1
- Feature 2
- Feature 3
**Target Audience:** Brief description of ideal users

3. Ensure each concept is:
- Addressing real user needs in "${userPrompt}"
- Technically feasible for a 48-hour hackathon
- Has clear market potential
- Provides unique value
- Considers ethical implications

4. Make each concept distinct from the others
5. Be concise but comprehensive - avoid unnecessary elaboration

Generate 3 ${category} concepts based on the user prompt: "${userPrompt}"
`;
  
  let initialConcepts;
  try {
    initialConcepts = await modelHandlers[agents.orchestrator.modelId](orchestratorPrompt);
    console.log('✓ Initial concepts generated');
  } catch (error) {
    console.error('Error generating initial concepts:', error);
    throw error;
  }
  
  // Step 2: Agents evaluate the concepts
  console.log('Step 2: Agent evaluation of concepts...');
  const agentAnalyses = {};
  
  // We'll ask each expert (except the orchestrator) for their evaluation
  for (const [agentId, agent] of Object.entries(agents)) {
    if (agentId === 'orchestrator') continue;
    
    const fullPrompt = `
${agent.prompt}

Mode: IDEA EVALUATION

The user is seeking new ideas in the ${category} domain with this prompt: "${userPrompt}"

The orchestrator has generated these initial concept ideas:

${initialConcepts}

As the ${agent.role}, analyze these concepts from your specialized perspective:

1. Evaluate the strengths and weaknesses of each concept
2. Suggest specific improvements or extensions
3. Identify potential challenges or risks
4. Provide specific insights relevant to your domain expertise

Focus your analysis on areas where your expertise can add the most value.
`;
    
    try {
      console.log(`Getting evaluation from ${agent.role}...`);
      const response = await modelHandlers[agent.modelId](fullPrompt);
      
      agentAnalyses[agentId] = {
        role: agent.role,
        analysis: response
      };
      
      console.log(`✓ Received evaluation from ${agent.role}`);
    } catch (error) {
      console.error(`Error with ${agent.role}:`, error);
      agentAnalyses[agentId] = {
        role: agent.role,
        analysis: `Error generating analysis: ${error.message}`
      };
    }
  }

  console.log('Step 3: Cross-examination between experts...');
  
  // Define the cross-examination interactions for generation mode
  const interactions = [
    { 
      challenger: 'technicalExpert', 
      challenged: 'marketAnalyst',
      question: 'How would you address the technical feasibility concerns for your preferred concept?'
    },
    { 
      challenger: 'marketAnalyst', 
      challenged: 'technicalExpert',
      question: 'Are there market considerations you may have overlooked in your technical analysis?'
    },
    { 
      challenger: 'originalityAssessor', 
      challenged: 'ethicalEvaluator',
      question: 'How might ethical considerations impact the innovation potential of these concepts?'
    },
    { 
      challenger: 'ethicalEvaluator', 
      challenged: 'originalityAssessor',
      question: 'Do any of the innovative aspects raise ethical concerns that should be addressed?'
    }
  ];
  
  const crossExamination = {};
  
  for (const interaction of interactions) {
    const { challenger, challenged, question } = interaction;
    
    try {
      console.log(`${agents[challenger].role} challenging ${agents[challenged].role}...`);
      
      // Create a challenge prompt specific to generation mode
      const challengePrompt = `
        You are the ${agents[challenger].role}.
        
        The ${agents[challenged].role} analyzed these concepts: 
        
        ${initialConcepts}
        
        Their analysis was: "${agentAnalyses[challenged].analysis}"
        
        ${question}
        
        Focus your challenge on specific aspects that could improve the final recommendation.
        Provide a brief critical analysis.
      `;
      
      const challenge = await modelHandlers[agents[challenger].modelId](challengePrompt);
      
      // Get response to the challenge
      const responsePrompt = `
        You are the ${agents[challenged].role}.
        
        The ${agents[challenger].role} challenges your analysis with: "${challenge}"
        
        Defend your position or acknowledge valid points and adjust your analysis.
        Be specific about which concept aspects you're discussing.
      `;
      
      const response = await modelHandlers[agents[challenged].modelId](responsePrompt);
      
      crossExamination[`${challenger}_to_${challenged}`] = {
        challenge,
        response
      };
      
      console.log(`✓ Completed exchange: ${challenger} <-> ${challenged}`);
    } catch (error) {
      console.error(`Error in cross-examination:`, error);
      crossExamination[`${challenger}_to_${challenged}`] = {
        challenge: `Error generating challenge: ${error.message}`,
        response: `Error generating response: ${error.message}`
      };
    }
  }

  
  
  // Step 4: Orchestrator refines the concepts
  console.log('Step 4: Refinement of concepts...');
  const analysesText = Object.entries(agentAnalyses)
    .map(([agentId, data]) => `${data.role}:\n${data.analysis}`)
    .join('\n\n');

  let crossExamText = ''
  if (Object.keys(crossExamination).length > 0) {
    crossExamText = "The agents also engaged in cross-examination debates:\n\n" +
    Object.entries(crossExamination)
    .map(([interaction, data]) => {
      const [challenger, challenged] = interaction.split('_to_');
      return `${agents[challenger].role} to ${agents[challenged].role}:\nChallenge: ${data.challenge}\nResponse: ${data.response}`
    }).join('\n\n');
  } else {
    crossExamText = "Note: No cross-examination data is available"
  }
  
  const refinementPrompt = `
${agents.orchestrator.prompt}

Mode: CONCEPT REFINEMENT

You previously generated these initial concept ideas:

${initialConcepts}

Our specialized agents have analyzed these concepts and provided feedback:

${analysesText}

${crossExamText}

Based on all expert feedback and insights, refine and develop the most promising concept into a detailed, comprehensive idea. If multiple concepts have merit, you may combine elements, but focus on creating ONE fully developed concept.

IMPORTANT: Structure your output carefully and prioritize content in this order:

1. Concept Name: A catchy, descriptive title (ESSENTIAL)
2. Problem Statement: What problem does this solve? (ESSENTIAL)
3. Solution Overview: A concise description of the solution (ESSENTIAL)
4. Key Features: 5-7 specific features that make this valuable (ESSENTIAL)
  - Use bullet points for clarity and brevity
  - Prioritize unique and differentiating features
5. Technical Implementation: How this could be built (IMPORTANT)
  - Focus on core technologies and frameworks
  - Use bullet points for implementation steps
6. Market Potential: Target audience and business model (IMPORTANT)
7. Differentiation: What makes this unique (INCLUDE IF SPACE PERMITS)
8. Ethical Considerations: Potential concerns and mitigations (INCLUDE IF SPACE PERMITS)

Be concise and focused. Use bullet points wherever possible to maximize information density.
Avoid unnecessary explanations or repetitive content.
If you must cut content due to length constraints, ensure all ESSENTIAL items are complete.

Present this as a cohesive, ready-to-implement idea that addresses the user's request: "${userPrompt}"
`;
  
  try {
    console.log('Generating final concept...');
    const finalConcept = await modelHandlers[agents.orchestrator.modelId](refinementPrompt);
    console.log('✓ Final concept generated');

    console.log('Step 3b: Role-switch cross-examination...');
    const roleSwitch = await runRoleSwitchCrossExamination(agentAnalyses);
    
    return {
      initialConcepts,
      agentAnalyses,
      finalConcept,
      crossExamination: {
        traditional: crossExamination,
        roleSwitch: roleSwitch
      },
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error generating final concept:', error);
    throw error;
  }
}


// Phase 1: Get initial analysis from each expert
async function runInitialAnalyses(userPrompt) {
  console.log('\n--- Phase 1: Initial Analyses ---');
  const analyses = {};
  
  // We'll ask each expert (except the orchestrator) for their initial thoughts
  for (const [agentId, agent] of Object.entries(agents)) {
    if (agentId === 'orchestrator') continue;
    
    const fullPrompt = `${agent.prompt}\n\nUser prompt: "${userPrompt}"\n\nProvide your detailed analysis.`;
    
    try {
      console.log(`Getting analysis from ${agent.role}...`);
      const response = await modelHandlers[agent.modelId](fullPrompt);
      
      analyses[agentId] = {
        role: agent.role,
        analysis: response
      };
      
      console.log(`✓ Received analysis from ${agent.role}`);
    } catch (error) {
      console.error(`Error with ${agent.role}:`, error);
      analyses[agentId] = {
        role: agent.role,
        analysis: `Error generating analysis: ${error.message}`
      };
    }
  }
  
  return analyses;
}

// Phase 2: Cross-examination between experts (added the role switch one)
async function runCrossExamination(initialAnalyses) {
  console.log('\n--- Phase 2: Cross-Examination ---');
  
  // Phase 2a: Traditional cross-examination
  const traditional = await runTraditionalCrossExamination(initialAnalyses);
  
  // Phase 2b: Role-switch cross-examination
  const roleSwitch = await runRoleSwitchCrossExamination(initialAnalyses);

  const result = { traditional, roleSwitch }
  console.log('=== DEBUG: runCrossExamination RETURNING ===');
  console.log('Result keys:', Object.keys(result));
  console.log('Traditional keys:', Object.keys(result.traditional || {}));
  console.log('RoleSwitch keys:', Object.keys(result.roleSwitch || {}));

  return result 
}

// Phase 2a: Traditional cross-examination (renamed from original runCrossExamination because yes)
async function runTraditionalCrossExamination(initialAnalyses) {
  console.log('\n--- Phase 2a: Traditional Cross-Examination ---');
  const crossExamination = {};
  
  // Define who challenges whom
  const interactions = [
    { 
      challenger: 'technicalExpert', 
      challenged: 'marketAnalyst',
      question: 'How technically feasible is this market approach?'
    },
    { 
      challenger: 'marketAnalyst', 
      challenged: 'technicalExpert',
      question: 'Does this technical implementation meet market needs?'
    },
    { 
      challenger: 'originalityAssessor', 
      challenged: 'ethicalEvaluator',
      question: 'Do the ethical constraints limit innovation potential?'
    },
    { 
      challenger: 'ethicalEvaluator', 
      challenged: 'originalityAssessor',
      question: 'Are there ethical concerns with this novel approach?'
    }
  ];
  
  for (const interaction of interactions) {
    const { challenger, challenged, question } = interaction;
    
    try {
      console.log(`${agents[challenger].role} challenging ${agents[challenged].role}...`);
      
      // Create a challenge prompt
      const challengePrompt = `
    You are the ${agents[challenger].role}.
    The ${agents[challenged].role} said: "${initialAnalyses[challenged].analysis}"

${question}
Provide a brief critical analysis.
      `;
      
      const challenge = await modelHandlers[agents[challenger].modelId](challengePrompt);
      
      // Get response to the challenge
      const responsePrompt = `
You are the ${agents[challenged].role}.
The ${agents[challenger].role} challenges your analysis with: "${challenge}"

Defend your position or acknowledge valid points and adjust your analysis.
      `;
      
      const response = await modelHandlers[agents[challenged].modelId](responsePrompt);
      
      crossExamination[`${challenger}_to_${challenged}`] = {
        challenge,
        response
      };
      
      console.log(`✓ Completed exchange: ${challenger} <-> ${challenged}`);
    } catch (error) {
      console.error(`Error in cross-examination:`, error);
    }
  }
  
  return crossExamination;
}

// Phase 2b: Role-switch cross-examination (NEW)
async function runRoleSwitchCrossExamination(initialAnalyses) {
  console.log('\n--- Phase 2b: Role-Switch Cross-Examination ---');
  const roleSwitchDebate = {};
  
  const pairs = [
    { agent1: 'technicalExpert', agent2: 'marketAnalyst' },
    { agent1: 'originalityAssessor', agent2: 'ethicalEvaluator' }
  ];
  
  for (const pair of pairs) {
    try {
      console.log(`Role-switch debate: ${agents[pair.agent1].role} ↔ ${agents[pair.agent2].role}...`);
      
      // Agent1 becomes Agent2 and challenges Agent2's analysis
      const prompt1 = `You are now temporarily adopting the role of a ${agents[pair.agent2].role}.
      
Looking at your colleague's analysis with fresh eyes:
"${initialAnalyses[pair.agent2].analysis}"

From this ${agents[pair.agent2].role} perspective, what concerns, risks, or overlooked factors do you identify? Be constructively skeptical - find genuine weak spots while staying realistic about the project's potential.`;
      
      // Agent2 becomes Agent1 and challenges Agent1's analysis
      const prompt2 = `You are now temporarily adopting the role of a ${agents[pair.agent1].role}.

Looking at your colleague's analysis with fresh eyes:
"${initialAnalyses[pair.agent1].analysis}"

From this ${agents[pair.agent1].role} perspective, what concerns, risks, or overlooked factors do you identify? Be constructively skeptical - find genuine weak spots while staying realistic about the project's potential.`;
      
      const challenge1 = await modelHandlers[agents[pair.agent1].modelId](prompt1);
      const challenge2 = await modelHandlers[agents[pair.agent2].modelId](prompt2);
      
      roleSwitchDebate[`${pair.agent1}_as_${pair.agent2}`] = { 
        challengerRole: agents[pair.agent2].role,
        originalRole: agents[pair.agent1].role,
        challenge: challenge1 
      };
      roleSwitchDebate[`${pair.agent2}_as_${pair.agent1}`] = { 
        challengerRole: agents[pair.agent1].role,
        originalRole: agents[pair.agent2].role,
        challenge: challenge2 
      };
      
      console.log(`✓ Completed role-switch: ${pair.agent1} ↔ ${pair.agent2}`);
      
    } catch (error) {
      console.error(`Error in role-switch for ${pair.agent1} ↔ ${pair.agent2}:`, error);
      roleSwitchDebate[`${pair.agent1}_as_${pair.agent2}`] = {
        challengerRole: agents[pair.agent2].role,
        originalRole: agents[pair.agent1].role,
        challenge: `Error generating role-switch challenge: ${error.message}`
      };
      roleSwitchDebate[`${pair.agent2}_as_${pair.agent1}`] = {
        challengerRole: agents[pair.agent1].role,
        originalRole: agents[pair.agent2].role,
        challenge: `Error generating role-switch challenge: ${error.message}`
      };
    }
  }
  
  return roleSwitchDebate;
}

// Phase 3: Generate final synthesis
async function generateFinalSynthesis(userPrompt, initialAnalyses, crossExamination) {
  console.log('\n--- Phase 3: Final Synthesis ---');
  
  const synthesisPrompt = `
${agents.orchestrator.prompt}

IMPORTANT OUTPUT INSTRUCTIONS:
1. Structure your response with clear headings and sections
2. Prioritize actionable recommendations and key insights
3. Use bullet points for features and implementation details
4. Be thorough but concise - focus on essential information
5. If limited by length, prioritize core concept and key improvements

User's original prompt: "${userPrompt}"

Initial analyses from experts:
${Object.entries(initialAnalyses).map(([id, data]) => 
  `${data.role}: ${data.analysis}`
).join('\n\n')}

Traditional cross-examination debates:
${crossExamination.traditional ? Object.entries(crossExamination.traditional).map(([interaction, data]) => 
  `Challenge: ${data.challenge}\nResponse: ${data.response}`
).join('\n\n') : 'No traditional cross-examination data available'}

Role-switch cross-examination insights:
${crossExamination.roleSwitch ? Object.entries(crossExamination.roleSwitch).map(([interaction, data]) => 
  `${data.originalRole} as ${data.challengerRole}: ${data.challenge}`
).join('\n\n') : 'No role-switch cross-examination data available'}

Based on all perspectives, traditional debates, and role-switched insights, provide a comprehensive final recommendation with these sections:
1. Final Recommendation: A refined version of the original idea with a catchy name (ESSENTIAL)
2. Key Insights from All Experts: Synthesized perspectives (ESSENTIAL)
3. Technical Feasibility: Implementation approach and technology stack (ESSENTIAL)
4. Market Potential: Target audience and differentiation (ESSENTIAL)
5. Implementation Plan: Specific steps to build the solution (IMPORTANT)
6. Potential Challenges: Technical, market, and ethical considerations (INCLUDE IF SPACE PERMITS)
`;
  
  try {
    console.log('Generating final synthesis...');
    const synthesis = await modelHandlers[agents.orchestrator.modelId](synthesisPrompt);
    console.log('✓ Final synthesis complete');
    return synthesis;
  } catch (error) {
    console.error('Error generating synthesis:', error);
    throw error;
  }
}

module.exports = { runDebate };