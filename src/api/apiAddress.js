// const API_URL = 'http://54.196.149.187:8000'; // Replace with your actual API address
// const API_URL = 'http://localhost:8000';
const API_URL = process.env.REACT_APP_BACKEND_BASE_URL
export default API_URL;
export const MIDDLEWARE_URL = process.env.REACT_APP_MIDDLEWARE_BASE_URL