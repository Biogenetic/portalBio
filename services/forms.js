import htmlJson from '../infra/httpJson';

export const getForms = () =>  htmlJson.get('/api/forms/forms');

export const getDeclarations = () =>  htmlJson.get('/api/forms/declarations');

export const getDownloads = () =>  htmlJson.get('/api/forms/downloads');