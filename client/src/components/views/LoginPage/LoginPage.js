import Axios from 'axios';
import React,{ useState } from 'react'
import { Provider, useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';


function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitHendler = (e) => {
        e.preventDefault();

        let body = {
            email : Email,
            password : Password
        };

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/landing');
            } else {
                alert('Error');
            }
        })

    }

    return (
            <div style={{display:'flex', justifyContent : 'center', alignItems : 'center',
                width : '100%', height : '100vh'
            }}>
                <form style={{ display : 'flex', flexDirection : 'column'}}
                    onSubmit = { onSubmitHendler }
                >
                    <label htmlFor="">Email</label>
                    <input type="email" value={Email} onChange={ onEmailHandler }/>
                    <label htmlFor="">Password</label>
                    <input type="password" value={Password} onChange = { onPasswordHandler }/>
                    <br/>
                    <button>Login</button>
                </form>
            </div>
    )
}

export default LoginPage
