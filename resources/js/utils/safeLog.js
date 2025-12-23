// Disable console logs in production
if (import.meta.env.PROD) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
}

// Sanitize sensitive data before logging
export const safeLog = (message, data) => {
    if (import.meta.env.DEV) {
        const sanitized = sanitizeData(data);
        console.log(message, sanitized);
    }
};

const sanitizeData = (data) => {
    if (!data) return data;
    
    const sensitive = ['password', 'token', 'api_key', 'secret', 'authorization'];
    
    if (typeof data === 'object') {
        const cleaned = { ...data };
        
        for (const key in cleaned) {
            if (sensitive.some(s => key.toLowerCase().includes(s))) {
                cleaned[key] = '***HIDDEN***';
            } else if (typeof cleaned[key] === 'object') {
                cleaned[key] = sanitizeData(cleaned[key]);
            }
        }
        
        return cleaned;
    }
    
    return data;
};

export default safeLog;
