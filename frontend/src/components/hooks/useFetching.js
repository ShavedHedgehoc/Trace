import { useState } from 'react';

export const useFetching = (callback) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setIsLoading(true);            
            await callback();
            setError('');
        } catch (error) {
            setError(error.message);
            console.log(error.response.status)
        } finally {
            setIsLoading(false);
        }
    }
    return [fetchData, isLoading, error]
}

