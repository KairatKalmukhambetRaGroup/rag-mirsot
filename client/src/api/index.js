import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/', validateStatus: function (status) { return true } });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// PUBLIC
export const addVisitor = (data) => API.post('/visitors', data);

// PAGES
export const fetchPageByName = (name) => API.get(`/pages/${name}`);
export const fetchPages = () => API.get(`/pages`);
export const fetchTexts = (names) => API.get(`/pages/text?names=${names}`);

// ADMIN
export const login = (data) => API.post('/users/login', data);
export const fetchVisitors = () => API.get('/visitors');
export const fetchConsultationRequests = () => API.get('/consultations/new');