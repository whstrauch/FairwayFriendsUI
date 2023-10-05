import { API_URL } from "../Context/Vars"

const customFetch = (path, method="GET", data, token="") => {
    
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    if (data !== undefined) {
        options.body = JSON.stringify(data)
    }

    return fetch(`http://${API_URL}:5000/${path}`, options)
        .then(resp =>  {
            if (!resp.ok) {
                const error = new Error("Error1")
                error.status = resp.status
                return resp.text().then(res => {
                    
                    error.info = res
                    error.spot = "MAIN"
                    throw error
                })
            } return resp.json()})
}

export default customFetch