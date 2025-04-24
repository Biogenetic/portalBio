
import htmlJson from '../infra/httpJson';
import { toQueryString } from '../infra/queryString';

export const getExams = (params) => htmlJson.get( `/api/exams/list?${toQueryString(params)}`);

export const getExamDetail = (codExam) => htmlJson.get( `/api/exams/detail?codExam=${codExam}`);

export const attachFile = (params) => htmlJson.post('/api/exams/attach-file', params);

export const resultByToken =(params) => htmlJson.post('/api/exams/token', params);

export const download = (params) => htmlJson.post('/api/exams/download', params);