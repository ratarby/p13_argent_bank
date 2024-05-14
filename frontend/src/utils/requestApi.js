import axios from 'axios'


async function userLogin(email, password ) {
    
        // Endpoint
        const dataResponse = await axios.post(`http://localhost:3001/api/v1/user/login`, { email, password });
        if (dataResponse.status === 200) {
            return dataResponse.data.data; 
        } 
        if (dataResponse.status === 401) {
            return -1;
        }
        return null;
    }

async function userProfile(token) {

    const dataResponse = await axios.get(`http://localhost:3001/api/v1/user/profile`, {}, { headers: { Authorization: `Bearer ${token}` } });
    if (dataResponse.status === 200) {
        return dataResponse.data.data;
    }
    if (dataResponse.status === 403) {
        return -1;
    }
    return null;
}

async function updateUserProfile(user, token) {
    const dataResponse = await axios.put(`http://localhost:3001/api/v1/user/profile`, user, { headers: { Authorization: `Bearer ${token}` } });
    if (dataResponse.status === 200) {
        return dataResponse.data.data;
    }
    return null;
}

export { userLogin, userProfile, updateUserProfile }
