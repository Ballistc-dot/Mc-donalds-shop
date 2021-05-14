import Cookies from 'js-cookie'

function isAuthenticateWithJwt() {
    const token = Cookies.get('token')
    console.log("hereaasa", token)
    return !!token
}

export default isAuthenticateWithJwt