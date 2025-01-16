// import Axios, { AxiosInstance } from 'axios'

// const axios: AxiosInstance = Axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//   },
//   withCredentials: true,
//   withXSRFToken: true,
// })

// export default axios

import Axios, { AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true,
})

// Tambahkan interceptor untuk handle CSRF token
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 419) {
            // Jika token CSRF expired, ambil token baru
            await axios.get('/sanctum/csrf-cookie')
            // Retry request original
            return axios(error.config)
        }
        return Promise.reject(error)
    }
)

// Optional: Tambahkan interceptor untuk menangani token
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axios