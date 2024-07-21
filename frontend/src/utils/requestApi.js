import axios from 'axios'



// log in with email & password
async function userLogin(email, password) {
    try {
        return await axios.post(`http://localhost:3001/api/v1/user/login`, { email, password });
    } catch (error) {
        return error.response
    }

}

// get user profile with token
async function userProfile(token) {
    // console.log('token', token);
    try {
        return await axios.post(`http://localhost:3001/api/v1/user/profile`,{}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        return error.response
    }
}
// Update the user's profile information.
async function updateUserProfile(user, token) {
    try {
        return await axios.put(`http://localhost:3001/api/v1/user/profile`, user, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        return error.response
    }
}
export { userLogin, userProfile, updateUserProfile }

