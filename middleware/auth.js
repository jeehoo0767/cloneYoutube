const { User } = require('./models/User');

let auth = (req, res, next) => {
    //인증 처리를 하는 모듈
    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_authl;
    //토큰을 복호화 한 후 유저를 찾음.
    User.findByToken()
    //유저가 있으면 인증 ok, 유저가 있으면 인증 No

}

module.exports = { auth };