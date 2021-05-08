import Cookie from 'js-cookie'

function isAuthenticateWithJwt() {
    const token = Cookie.get('token')

    return !!token
}

export default isAuthenticateWithJwt