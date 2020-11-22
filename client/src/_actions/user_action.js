import axios from 'axios';

export function loginUser(dataTosubmit) {
    const request = Axios.post('/api/users/login', body)
        .then(response => {
            response.data;
        });

        return {
            type : "LOGIN_USER",
            payload: request
        }
}