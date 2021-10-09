import { useEffect } from 'react';

export const useComponentDidMount = (callback) => {
    useEffect(() => {
        callback();
    }, []);
};