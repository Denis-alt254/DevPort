import API from "./api"

export const GetAllProjects = async() => {
    return await API.get('/projects/');
}

export const GetProjectsByUser = async() => {
    return await API.get('/projects/user');
}

export const AddProject = async(data) => {
    const res = await API.post('/projects/add', data);
    return res.data;
}

export const EditProject = async(id, data) => {
    const res = await API.put(`/projects/edit/${id}`, data);
    return res.data;
}

export const DeleteProject = async(id) => {
    const res = await API.delete(`/projects/delete/${id}`);
}