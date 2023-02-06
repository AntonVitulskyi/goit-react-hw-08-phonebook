import axios from "axios";

const userHost = axios.create({
baseURL: 'https://connections-api.herokuapp.com/',
});

const authInterceptor = config => {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
}

userHost.interceptors.request.use(authInterceptor)

export const UserAPI = {
async register(formData){
const {data} = await userHost.post('users/signup', {...formData});
return await data;
},
async login(formData){
    const {data} = await userHost.post('users/login', {...formData});
    return await data;
},
async getUserDetailsRequest(){
    const {data} = await userHost.get('/users/current');
    return await data;
},
async userLogOutRequest(){
    const {data} = await userHost.post('/users/logout');
    return await data;
}
}

