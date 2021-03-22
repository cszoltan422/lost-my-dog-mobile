export default handleHomepageDataFetched = (state, action) => {
    state.homepageInitialized = true;
    state.homepageLoading = false;
    state.homepageData = [...state.homepageData, ...action.payload];
}