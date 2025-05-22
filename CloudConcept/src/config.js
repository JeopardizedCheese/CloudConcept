const config = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    debateEndpoint: '/api/debate',
    healthEndpoint: '/api/health'
}

export default config