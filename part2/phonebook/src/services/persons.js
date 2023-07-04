import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = 'https://47.115.221.254/api/persons'
// const baseUrl = 'https://www.mistysakura.top/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, create, update, del}