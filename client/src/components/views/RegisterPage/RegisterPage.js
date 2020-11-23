
import React,{ useState } from 'react'
import { Provider, useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';


function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const onNameHandler = (e) => {
        setName(e.target.value);
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmitHendler = (e) => {
        e.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('비밀번호를 다시 확인 해주세요.')
        }

        let body = {
            email : Email,
            password : Password,
            name : Name
        };

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push("/login");
            } else {
                alert("회원가입 실패");
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

            <label htmlFor="">Name</label>
            <input type="text" value={Name} onChange={ onNameHandler }/>

            <label htmlFor="">Password</label>
            <input type="password" value={Password} onChange = { onPasswordHandler }/>
            
            <label htmlFor="">Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange = { onConfirmPasswordHandler }/>
            <br/>
            <button>Join</button>
        </form>
    </div>
    )
}

export default RegisterPage
