import { useState, useEffect } from 'react';

const useIterables = (initialIterables) => {
    const [iterables, setIterables] = useState(initialIterables || []);

    useEffect(() => {
        setIterables(initialIterables || []);
    }, [initialIterables]);

    //Iterables handling
    const AddIterable = (newElement = '') => {
        setIterables([...iterables, newElement]);
    }
    const removeIterable = (index) => {
        const tempIterables = [...iterables];
        tempIterables.splice(index, 1);
        setIterables(tempIterables);
    }
    return {
        iterables,
        setIterables,
        AddIterable,
        removeIterable
    };
};

export default useIterables;