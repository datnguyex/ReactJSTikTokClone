import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    // console.log('value:', value);
    // console.log('debouncedValue: ', debouncedValue);
    useEffect(() => {
        const handler = setTimeout(() => {
            // console.log('haha');
            setDebouncedValue(value);
        }, delay);

        return () => clearInterval(handler);
    }, [value]);

    return debouncedValue;
}

export default useDebounce;
