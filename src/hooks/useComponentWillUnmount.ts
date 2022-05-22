import { useEffect } from 'react';

export const useComponentWillUnmount = (callback: () => void) => {
    useEffect(() => callback, []);
};