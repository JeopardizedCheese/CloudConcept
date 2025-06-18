// debate.js
const express = require('express');
const router = express.Router();
const { runDebate } = require('../services/debateService');

router.post('/', async (req, res) => {
    try {
        const { prompt, category, projectContext, mode = 'validation' } = req.body;
        
        // Validate mode
        if (mode !== 'validation' && mode !== 'generation') {
            return res.status(400).json({
                success: false,
                error: 'Invalid mode',
                message: 'Mode must be either "validation" or "generation"',
                code: 'VALIDATION_ERROR'
            });
        }
        
        console.log('Received debate request:', { prompt, category, mode });
        
        console.log('=== API ROUTE DEBUG ===');
        console.log('About to call runDebate...');

        const debateResult = await runDebate(prompt, category, projectContext, mode);

        console.log('Debate result structure: ', Object.keys(debateResult));
        console.log('Cross-examination structure', Object.keys(debateResult.crossExamination || {}))
        
        res.json({
            success: true,
            data: {
                ...debateResult,
                mode
            }
        });
    } catch (error) {
        console.error('Error in debate:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process debate',
            message: error.message
        });
    }
});

module.exports = router;