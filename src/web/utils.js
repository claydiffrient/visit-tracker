import { Map } from 'immutable';

export function isAuthed (token = getToken(), parser = parseJWT) {
  if (token) {
    const params = parser(token);
    return Math.round(new Date().getTime() / 1000) <= params.exp;
  } else {
    return false;
  }
}

export function parseJWT (token = getToken(), aToB = window.atob) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(aToB(base64));
}

export function getUsername () {
  return parseJWT().username;
}

export function getUserId () {
  return parseJWT().id;
}

export function deleteToken () {
  window.sessionStorage.removeItem('visittracker');
}

export function getToken () {
  return window.sessionStorage.getItem('visittracker');
}

export function setToken (token) {
  window.sessionStorage.setItem('visittracker', token);
}

export function getUserState () {
  if (isAuthed()) {
    return Map({
      id: getUserId(),
      username: getUsername(),
      rawDetails: parseJWT()
    });
  } else {
    return false;
  }
}

/**
 * Use this method to configure the axios library as
 * it needs to be with interceptors etc.
 * @param  {Object} axiosLib The axios library
 * @return {Object}          The configured axios library
 */
export function configureAxios (axiosLib) {
  // Set the auth token if it's available
  axiosLib.interceptors.request.use((config, token = getToken()) => {
    // When logging in, there will be no need to set the Auth
    // headers
    if (config.url.indexOf('/auth/login') !== -1) {
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosLib.interceptors.response.use((response) => {
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response;
  });

  return axiosLib;
}

export function filterPeopleByLastVisit (state, months, upperLimit) {
  const today = new Date();
  const filtered = state.get('persons').filter((p) => {
    if (p.get('lastVisit')) {
      const lastVisitDate = new Date(p.get('lastVisit').get('date_visited'));
      const monthsBetween = today.getMonth() - lastVisitDate.getMonth()
             + (12 * (today.getFullYear() - lastVisitDate.getFullYear()));
      if (upperLimit) {
        return ((monthsBetween >= months) && (monthsBetween < upperLimit));
      } else {
        return (monthsBetween >= months);
      }

    } else {
      return false;
    }
  });
  return state.set('filteredPersons', filtered);
}
