import { useEffect } from 'react';

export const useComponentDidMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, []);
};