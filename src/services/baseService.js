import Axios from "axios"
import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBERSOFT } from "../utils/setting.js"
// 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)

export class baseService {

    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'PUT',
            data: model,
            headers: { 
                "TokenCyberSoft": TOKEN_CYBERSOFT, 
                "Authorization": localStorage.getItem(ACCESS_TOKEN)
            },
        })
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: model,
            headers: { 
                "TokenCyberSoft": TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
            }
        })
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'GET',
            headers: { 
                "TokenCyberSoft": TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
            }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'DELETE',
            headers: { 
                "TokenCyberSoft": TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
            }
        })
    }
}