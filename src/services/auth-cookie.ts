import Cookies from 'js-cookie';

const setAuthToken = (token:string) => {
    Cookies.set('access_token', token, {
        expires: 1, // in days
        secure: false, // set to true in production with HTTPS
        sameSite: 'Lax',
    });
}


const getAuthToken = ():string | null => {
    return Cookies.get('access_token') ?? null
}

const removeAuthToken = () => {
    Cookies.remove('access_token')
}

export {getAuthToken, setAuthToken, removeAuthToken}