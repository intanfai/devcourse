// api/auth.js
import api from './axios';

export const login = (data) => api.post('/login', data);
