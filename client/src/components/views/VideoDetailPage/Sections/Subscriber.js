import Axios from 'axios'
import React, { useEffect, useState } from 'react'

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

    return (
        <div>
            <button
            style = {{
                backgroundColor: `${Subscribed ? '#CC0000' : '#AAAAAA'}`, border : 'none',
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick
            >
                {SubscribeNumber} {Subscribed ? 'subscribed' : 'subscribe'}
            </button>
        </div>
    )
}

export default Subscriber
