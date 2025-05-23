import axios from 'axios';


// const API = axios.create({ baseURL: 'http://localhost:5000/', validateStatus: function (status) { return true } });
const API = axios.create({ baseURL: 'http://89.219.32.:5000/', validateStatus: function (status) { return true } });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// PUBLIC
export const addVisitor = (data) => API.post('/visitors', data);
export const requestConsultation = (data) => API.post('/consultations', data);

// PAGES
export const fetchPageByName = (name) => API.get(`/pages/${name}`);
export const fetchPages = () => API.get(`/pages`);
export const fetchTexts = (names) => API.get(`/pages/text?names=${names}`);
export const updateText = (data) => API.patch('/pages/text', data);

// ADMIN
export const login = (data) => API.post('/users/login', data);
export const fetchVisitors = () => API.get('/visitors');
export const fetchConsultationRequests = () => API.get('/consultations/new');