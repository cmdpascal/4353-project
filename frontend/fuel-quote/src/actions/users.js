import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    updateProfile
};

function login(username, password) {
    return dispatch => {
        console.log("user login ACTION!!")
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/profile');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    console.log("user logout ACTION!!")
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Success'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function updateProfile(username, profile) {
    return dispatch => {
        dispatch(request(profile));

        userService.updateProfile(username, profile)
            .then(
                user => { 
                    console.log("user after profile update", user);
                    dispatch(success(user));
                     history.push('/');
                    dispatch(alertActions.success('Success'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(profile) { return { type: userConstants.UPDATE_PROFILE_REQUEST, profile } }
    function success(user) { return { type: userConstants.UPDATE_PROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_PROFILE_FAILURE, error } }
}