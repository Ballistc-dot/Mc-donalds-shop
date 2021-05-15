import Cookies from 'js-cookie'

function isAuthenticateWithJwt() {
    const token = Cookies.get('token')

    return !!token
}

export default isAuthenticateWithJwt