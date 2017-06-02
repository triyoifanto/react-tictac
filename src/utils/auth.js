//import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock'
//import history from './history';
import Relay from 'react-relay';
import CreateUser from '../mutations/CreateUser';
import SigninUser from '../mutations/SigninUser';

//from app in https://manage.auth0.com
const authDomain ='ifan.au.auth0.com'
const clientId='kCyPk5Pv2Y40EUXsm3VqWbSvfvRaTeyp'


class AuthService{
    constructor() {
		this.lock = new Auth0Lock(clientId, authDomain, {
			auth: {
				params: {
					scope: 'openid email'
				},
			},
		})

		this.showLock = this.showLock.bind(this)

		this.lock.on('authenticated', this.authProcess.bind(this))
	}

    authProcess = (authResult) => {
        let {
			email,
			exp
		} = authResult.idTokenPayload
		const idToken = authResult.idToken

		this.signinUser({
			idToken,
			email,
			exp
		}).then(
			success => success,
			rejected => {
				this.createUser({
					idToken,
					email,
					exp
				}).then()
			}
		)
    }

    showLock(){
        this.lock.show()
    }

    setToken = (authFields) => {
        let {
            idToken,
            exp
        } = authFields
        localStorage.setItem('isToken', idToken)
        localStorage.setItem('exp', exp * 1000)
    }

    isCurrent = () => {
        let expString = localStorage.getItem('exp');
        if(!expString) {
            localStorage.removeItem('idToken');
            return false
        }
        let now = new Date()
        let exp = new Date(parseInt(expString, 10)) // 10 is radix parameter
        if( exp < now ){
            this.logout()
            return false
        } else {
            return true
        }
    }

    getToken() {
        let idToken = localStorage.getItem('idToken')
        if( this.isCurrent() && idToken){
            return idToken
        } else{
            localStorage.removeItem('idToken')
            localStorage.removeItem('expires_at')
            return false
        }
    }

    logout = () => {
		localStorage.removeItem('idToken')
		localStorage.removeItem('exp')
		//location.reload()
	}
    
    createUser = (authFields) => {
		return new Promise( (resolve, reject) => {
			Relay.Store.commitUpdate(
				new CreateUser({
					email: authFields.email,
					idToken: authFields.idToken
				}), {
					onSuccess: (response) => {
						this.signinUser(authFields)
						resolve(response)
					},
					onFailure: (response) => {
						console.log('CreateUser error', response)
						reject(response)
					}
				}
			)
		})
	}

	signinUser = (authFields) => {
		return new Promise( (resolve, reject) => {
			Relay.Store.commitUpdate(
				new SigninUser({
					idToken: authFields.idToken
				}), {
					onSuccess: (response) => {
						this.setToken(authFields)
						resolve(response)
					},
					onFailure: (response) => {
						reject(response)
					}
				}
			)
		})
	}
}

const auth = new AuthService()

export default auth