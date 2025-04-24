
import httpJson from '../infra/httpJson';

export const login = (username, password) => httpJson.post('/api/auth/login', {username, password});

export const changePassword = (newPassword) => httpJson.post('/api/auth/change-password', {newPassword});
