import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { store } from './store/store'

export default function setup() {
    axios.interceptors.request.use(function(config) {
        return config
    }, function(err) {
        return Promise.reject(err)
    });
}