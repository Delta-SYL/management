import axios from 'axios';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
import router from './router/index'
//import { response } from "express";
let loading

function startLoading() {
    loading = ElLoading.service({
        lock: true,
        text: "拼命加载中...",
        background:"rgba(0,0,0,0,7)"
    })
}

function endLoading() {
    loading.close()
}

axios.interceptors.request.use(config => {
    startLoading()
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    endLoading()
    ElMessage.error(error.response.data)
    const { status } = error.response
    if (status == 401) {
        ElMessage.error("token失效,请重新登录")
        localStorage.removeItem("eleToken")
        router.push('/login')
    }
    return Promise.reject(error)
})

export default axios