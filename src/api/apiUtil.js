import Axios from 'axios'

const middlewareURL = "http://localhost:8080"
const backendURL = "http://localhost:8000"

export const middlewareGet = async (route, config={}) => {
    const url = middlewareURL + route
    const res = await Axios.get(url, config)
    return res
}

export const middlewarePost = async (route, body, config={}) => {
    const url = middlewareURL + route
    const res = await Axios.post(url, body, config)
    return res
}

const backendGet = async (route, config={}) => {
    const url = backendURL + route
    const res = await Axios.get(url, config)
    return res
}

const backendPost = async (route, body, config={}) => {
    const url = backendURL + route
    const res = await Axios.post(url, body, config)
    return res
}

export const authBackendGet = async (route, config={}) => {
    try {
        const token = localStorage.getItem("jwtToken");
        const authConfig = {
            headers: { Authorization: `Bearer ${token}`},
            ...config
        }
        const url = backendURL + route
        const res = await Axios.get(url, authConfig)
        return res
    } catch (error) {
        console.error("There was a problem with the api operation:", error.message);
        alert("There was a problem with the api operation:", error.message);
    }
}

export const authBackendPost = async (route, body, config={}) => {
    const token = localStorage.getItem("jwtToken");
    const authConfig = {
        headers: { Authorization: `Bearer ${token}`},
        ...config
    }
    const url = backendURL + route
    const res = await Axios.post(url, body, authConfig)
    return res
}

export default {middlewareGet, middlewarePost, backendGet, backendPost, authBackendGet, authBackendPost}