import { useEffect } from 'react';

export const useComponentWillUnmount = (callback) => {
    useEffect(() => callback, []);
};