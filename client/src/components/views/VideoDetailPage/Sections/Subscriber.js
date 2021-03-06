import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Subscriber(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {

        let variable = {
            userTo : props.userTo
        }

        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if(response.data.success) {
                setSubscribeNumber(response.data.subscribeNumber);
            } else {
                alert('구독자 정보 가져오기 실패')
            }
        })

        let subscribedVariable = {
            userTo : props.userTo,
            userFrom : localStorage.getItem('userId')
        }
        
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response => {
            if(response.data.success) {
                setSubscribed(response.data.subscribed)
            } else {
                alert('정보 가져오기 실패')
            }
        })
    }, [])

    const onSubscribe = () => {
        let subscribeVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }
        if(Subscribed) {
            //구독 중이라면
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber -1);
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소 실패')
                }
            })
        } else {
            //구독이 아니라면
            Axios.post('/api/subscribe/Subscribe', subscribeVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber +1);
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 실패')
                }
            })
        }
    }

    return (
        <div>
            <button
            style = {{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, border : 'none',
                borderRadius: '4px', color: 'white', outline : 'none', cursor : 'pointer',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick = {onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'subscribed' : 'subscribe'}
            </button>
        </div>
    )
}

export default Subscriber
