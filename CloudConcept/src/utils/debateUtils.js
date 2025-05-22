//Debate

function formatProjectForPrompt(project) {
    return `
    TITLE: ${project.title}
    DESCRIPTION: ${project.short_description}
    TECHNOLOGIES: ${project.technologies ? project.technologies.join(', ') : 'N/A'}
    KEY INSIGHTS: ${project.full_description.substring(0, 300)}...
    `
}

export function createAgentPrompt(agent, userPrompt, projectContext) {
    const { projects, hasRelevantProjects } = projectContext

    let contextSection = ''

    if (hasRelevantProjects) {
        contextSection = `
        Here are similar projects from our data base that you should reference:
        ${projects.map(p => formatProjectForPrompt(p)).join('\n\n')}

        When analyzing this idea request, reference these projects specifically.
        Consider what worked well, what could be improved, and how the user's request
        could result in a project that builds upon or differentiates from these examples.
        `
    } else {
        contextSection = `
        No directly relevant projects were found in our database for this specific request.

        Please approach this from first principles by:
        1.Drawing on your general knowledge of the domain
        2.Considering fundamental problems in this space
        3.Applying design patterns from related fields
        4.Thinking about emerging technologies that could be applied
        5.Focusing on user needs and pain points

        Generate innovative solutions without being constrained by existing examples.
        `
    }

        return `
        ${agent.prompt}

        User is looking for a hackathon idea with this prompt: "${userPrompt}"

        ${contextSection}

        Provide a thoughtful analysis from your perspective as ${agent.role}
        `
}

export function processDebateResults(initialAnalyses, crossExamination, synthesis) {
    return {
        initialAnalyses: formatInitialAnalyses(initialAnalyses),
        crossExamination: formatCrossExamination(crossExamination),
        finalSynthesis: synthesis,
        timestamp: new Date().toISOString()
    }
}

function formatInitialAnalyses(analyses) {
    return Object.entries(analyses).map(([agentId, data]) => ({
        agentId,
        role: data.role,
        analysis: data.analysis,
        key_points: extractKeyPoints(data.analysis)
    }))
}

function formatCrossExamination(crossExam) {
    return Object.entries(crossExam).map(([interaction, data]) => ({
        interaction,
        challenge: data.challenge,
        response: data.response,
        resolved_points: extractResolvedPoints(data.response)
    }))
}

function extractKeyPoints(text) {
    const lines = text.split('\n')
    const keyPoints = []

    lines.forEach(line => {
        if (line.includes(':') || line.match(/^\d\./) || line.match(/^-/)) {
            keyPoints.push(line.trim())
        }
    })

    return keyPoints.slice(0, 5)
}

function extractResolvedPoints(text) {
    const resolutionKeywords = ['agreed', 'valid point', 'correct', 'will focus on']
    const lines = text.split('.')
    const resolved = []

    lines.forEach(line => {
        const lineLower = line.toLowerCase()
        if (resolutionKeywords.some(keyword => lineLower.includes(keyword))) {
            resolved.push(line.trim())
        }
    })

    return resolved
}

export function createDebateSummary(debateResults) {
    const { initialAnalyses, crossExamination, finalSynthesis } = debateResults
    
    return {
        total_perspectives: initialAnalyses.length,
        key_agreements: findAgreements(initialAnalyses),
        major_challenges: extractChallenges(crossExamination),
        final_recommendation: extractRecommendation(finalSynthesis),
        confidence_level: calculateConfidence(debateResults)
    }
}

//Find points of agreement between agents
function findAgreements(analyses) {
    const commonThemes = {}

    analyses.forEach(analysis => {
        analysis.key_points.forEach(point => {
            const theme = point.toLowerCase()
            commonThemes[theme] = (commonThemes[theme] || 0 ) + 1
        })
    })

    //Return themes mentioned by multiple agents
    return Object.entries(commonThemes)
    .filter(([theme, count]) => count > 1)
    .map(([theme]) => theme)
}

//Extract main challenges from cross-examination
function extractChallenges(crossExam) {
    return crossExam.map(item => ({
        challenge: item.challenge.substring(0, 100) + '...',
        was_resolved: item.resolved_points.length > 0
    }))
}

//Extract final recommendation from synthesis
function extractRecommendation(synthesis) {
    //Look for recommendation section in the synthesis
    const lines = synthesis.split('\n')
    const recStart = lines.findIndex(line => 
        line.toLowerCase().includes('recommend') ||
        line.toLowerCase().includes('final')
    )

    if (recStart !== -1) {
        return lines.slice(recStart, recStart + 3).join(' ')
    }

    return synthesis.substring(0,200) + '...'
}

//Calculate confidence level based on debate dynamics
function calculateConfidence(debateResults) {
    const { initialAnalyses, crossExamination } = debateResults
    let confidence = 0.7  //base confidence

    //Increase confidence if agents agree
    const agreements = findAgreements(initialAnalyses)
    confidence += agreements.length * 0.05

    //Decrease if many unresolved challenges
    const unresolvedChallenges = crossExamination.filter(
        item => item.resolved_points.length === 0
    ).length
    confidence -= unresolvedChallenges * 0.1

    //Keep it within 0-1 range
    return Math.max(0.3, Math.min(1, confidence))
}