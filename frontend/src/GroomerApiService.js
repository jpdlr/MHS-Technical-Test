import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:5023/api/groomer',
    json: true
})

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then(req => {
            return req.data
        })
    },
    getAllGroomers() {
        return this.execute('get', '/')
    },
    getGroomer(id, data) {
        return this.execute('get', `/${id}`, data)
    },
    createGroomer(data) {
        return this.execute('post', '/', data)
    },
    loginGroomer(data) {
        return this.execute('post', '/login', data)
    },
    updateGroomer(id, data) {
        return this.execute('put', `/${id}`, data)
    },
    deletePet(id) {
        return this.execute('delete', `/${id}`)
    }
}