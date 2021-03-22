import { ON_HOMEPAGE_MOUNTED, ON_HOMEPAGE_LOADING, ON_HOMEPAGE_DATA_FETCHED } from "../action-types/action.types"

export const onHomepageMounted = () => {
    return {
        type: ON_HOMEPAGE_MOUNTED
    }
};

export const onHomepageLoading = () => {
    return {
        type: ON_HOMEPAGE_LOADING
    }
};

export const onHomepageDataFetched = (homepageData) => {
    return {
        type: ON_HOMEPAGE_DATA_FETCHED,
        payload: homepageData
    }
};