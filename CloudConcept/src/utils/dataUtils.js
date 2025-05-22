//Load the json files
import educationProjects from '../data/education_projects_full.json'
import medicalProjects from '../data/medical_projects_full.json'
import devpostProjects from '../data/devpost_projects.json'

export const projectDatabase = {
    education: educationProjects,
    medical: medicalProjects,
    general: devpostProjects
}

export function findRelevantProjects(userPrompt, category=null, limit=5) {
    let searchPool = []
    
    //If category is specified, search within that category
    if (category && category !== 'all') {
        searchPool = projectDatabase[category] || []
    } else {
        //search across all projects
        searchPool = [
            ...projectDatabase.education,
            ...projectDatabase.medical,
            ...projectDatabase.general
        ]
    }

    const scoredProjects = searchPool.map(project => {
        const score = calculateRelevanceScore(project, userPrompt)
        return { project, score }
    })


    //Sort by score then return the results at the top
    const topResults = scoredProjects
    .sort((a, b) => b.score - a.score) //an algorithm to sort in descending order (I stole it lmfao)
    .slice(0, limit)
    .map(item => item.project)

    return {
        projects: topResults,
        hasRelevantProjects: topResults.length > 0,
        relevanceScores: topResults.map(p => p.score)
    }
}

function calculateRelevanceScore(project, query) {
    const queryLower = query.toLowerCase()
    const queryTerms = queryLower.split(/\s+/)

    let score = 0

    const titleLower = project.title.toLowerCase()
    queryTerms.forEach(term => {
        if(titleLower.includes(term)) score += 3 //If title matches, score 3 since title has the most weight
    })

    const shortDescLower = project.short_description?.toLowerCase() || ''
    queryTerms.forEach(term => {
        if (shortDescLower.includes(term)) score += 2 //If short description matches, score 2 since second most weighted
    })

    const fullDescLower = project.full_description?.toLowerCase() || ''
    queryTerms.forEach(term => {
        if (fullDescLower.includes(term)) score += 1 //Full description has the least weight
    })

    //Check for project technologies (in case its available)
    if (project.technologies) {
        const techString = project.technologies.join(' ').toLowerCase()
        queryTerms.forEach(term => {
          if (techString.includes(term)) score += 2  
        })
    }

    return score
}

//Extract patterns and insights from projects
export function extractProjectPatterns(projects) {
    const patterns = {
        commonTechnologies: {},
        problemThemes: [],
        teamSizes: {},
        commonFeatures: []
    }

    projects.forEach(project => {
        //count technologies
        if (project.technologies) {
            project.technologies.forEach(tech => {
                if (tech) {
                    patterns.commonTechnologies[tech] = (patterns.commonTechnologies[tech] || 0) + 1
                }
            })
        }

        //Analyze problem themes
        if (project.full_description) {
            const themes = extractThemes(project.full_description)
            patterns.problemThemes.push(...themes)
        }
    })

    return patterns
}

function extractThemes(text) {
    //keyword extraction (simple version because I am an idiot)
    const keywords = [
        'education', 'healthcare', 'blockchain', 'AI', 'machine learning',
        'connectivity', 'accessibility', 'sustainability', 'community'
    ]

    const foundThemes = []
    const textLower = text.toLowerCase()

    keywords.forEach(keyword => {
        if (textLower.includes(keyword)) {
            foundThemes.push(keyword)
        }
    })

    return foundThemes
}

//Format projects for AI agent context
export function formatProjectsForContext(projects) {
    return projects.map(project => ({
        title: project.title,
        description: project.short_description,
        technologies: project.technologies || [],
        key_featyres: extractKeyFeatures(project.full_description)
    }))
}

function extractKeyFeatures(description) {
    const features = []
    const lines = description.split('\n')

    lines.forEach(line => {
        if (line.includes('•') || line.includes('-') || line.includes(':')) {
            features.push(line.trim())
        }
    })

    return features.slice(0,5)
}

//New function to generate context when no relevant projects exist
export function generateNoProjectContext(userPrompt, category) {
    return {
        message: "No directly relevant projects found in database",
        guidance: {
            approach: "Focus on first principles and domain knowledge",
            considerations: [
                "Current technological trends in the domain",
                "Common pain points in similar contexts",
                "Established design patterns that could be adapted",
                "Cross-domain innovations that might apply"
            ]
        },
        relatedDomains: suggestRelatedDomains(userPrompt, category)
    }
}

function suggestRelatedDomains(prompt, category) {
    const domainMap = {
        education: ["edtech", "e-learning", "teaching tools", "student engagement"],
        medical: ["healthcare", "telemedicine", "patient care", "health monitoring"],
        general: ["productivity", "collaboration", "automation", "user experience"]
    }

    return domainMap[category] || domainMap.general
}