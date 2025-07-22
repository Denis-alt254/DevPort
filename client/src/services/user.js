import API from "./api"

export const RegisterUser = async(data) => {
    const res = await API.post('/users/register', data);
    return res.data;
}

export const SignIn = async(data) => {
    const res = await API.post('/users/login', data);
    return res.data;
}

export const GetUser = async() => {
    const res = await API.get(`/users/me`);
    return res.data;
}

export const UpdateProfile = async(id, data) => {
    const res = await API.put(`/update-profile/${id}`, data);
    return res.data;
}

export const Follow = async(id, data) => {
    const res = await API.post(`/follow/${id}`, data);
    return res.data;
}

export const Followers = async(id) => {
    const res = await API.get(`/${id}/followers`);
    return res.data;
}

export const EndorseSkill = async(id, data) => {
    const res = await API.post(`/${id}/endorse`, data);
    return res.data;
}