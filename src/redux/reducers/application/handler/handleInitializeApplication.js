export default handleInitializeApplication = (state, action) => {
    state.applicationInitialized = true;
    state.loginRequired = action.payload.loginRequired;
    state.user = {
        isPresent: action.payload.isPresent,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        isLocked: action.payload.isLocked,
        details: action.payload.details
    };
};