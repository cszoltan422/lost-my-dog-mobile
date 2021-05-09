import { ON_APPLICATION_MOUNTED, ON_INITIALIZE_APPLICATION } from '../action-types/action.types'

export const onApplicationMounted = () => {
    return {
        type: ON_APPLICATION_MOUNTED
    }
};

export const onInitializeApplication = (applicationInitializer) => {
    return {
        type: ON_INITIALIZE_APPLICATION,
        payload: applicationInitializer
    }
};