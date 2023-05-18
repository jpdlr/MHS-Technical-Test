import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5023/api/CustomersList',
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
  getAllCustomers() {
    return this.execute('get', '/')
  },
  getAllCustomersForGroomer(data) {
    return this.execute('post', '/groomer', data)
  },
  createCustomer(data) {
    return this.execute('post', '/', data)
  },
  updateCustomer(id, data) {
    return this.execute('put', `/${id}`, data)
  },
  deleteCustomer(id) {
    return this.execute('delete', `/${id}`)
  }
}