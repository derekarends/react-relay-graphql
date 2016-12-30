import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import createHashHistory from 'history/lib/createHashHistory';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

export default class AuthService {
  constructor() {
    let clientId = '27NNB9NTFCZ0sMOc1OxGm1cA4hF1miqV';
    let domain = 'thinkovator.auth0.com';

    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/#/dashboard',
        responseType: 'token',
      },
    });

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    browserHistory.replace('/#/dashboard');
  }

  login() {
    this.lock.show();
  }

  loggedIn() {
    return !!this.getToken();
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    history.push('/#/home');
  }
}
