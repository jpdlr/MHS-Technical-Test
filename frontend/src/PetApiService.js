import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5023/api/PetsList',
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
  getAllPets() {
    return this.execute('get', '/')
  },
  getCustomerPets(data) {
    return this.execute('post', '/customer', data)
  },
  createPet(data) {
    return this.execute('post', '/', data)
  },
  updatePet(id, data) {
    return this.execute('put', `/${id}`, data)
  },
  deletePet(id) {
    return this.execute('delete', `/${id}`)
  }
}