import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

//요청 인터셉터(토큰 자동추가)
axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    error => Promise.reject(error)
)

//응답 인터셉터 (토큰 만료처리)
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;