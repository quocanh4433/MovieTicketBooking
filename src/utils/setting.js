import axios from "axios";

export const DOMAIN = "https://movienew.cybersoft.edu.vn";
export const GROUPID = "GP02";
export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
// export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMC8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDM1MDA4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0MzY0ODQwMH0.ufODEd--n4Nm91XfL2RnIB9E1_kvZ4Dy1dyDst3wKuE"
export const TOKEN_CYBERSOFT =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIyOC8wMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDYwMDY0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0NjE1NDAwMH0.Aojk9-Qo5B5whL6jc8aZ4IOCm1RF9MrUhORXCrWBwEA"



// Cấu hình interceptors cho axios (tất cả request gọi = axios đều được cấu hình) (1 dự án cấu hình một lần duy nhất)

export const http = axios.create({
    baseURL:'https://movienew.cybersoft.edu.vn',
    timeout:30000,
})

http.interceptors.request.use((config)=>{
    config.headers = {
        ...config.headers,
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
        'TokenCybersoft': TOKEN_CYBERSOFT, 
    }
    return config
}, (errors) => {
    return Promise.reject(errors)
})


