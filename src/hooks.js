import { useState } from 'react';
import uuid from "uuid";
import axios from 'axios';

const useFlip = (initialValue = false) => {
    const [isFlipped, setIsFlipped] = useState(initialValue);
    const flip = () => setIsFlipped(flipped => !flipped);
    return [isFlipped, flip];
};

const useAxios = (baseUrl, format = (data) => data) => {
    const [results, setResults] = useState([]);

    const addResult = (discriminant) => {
        if (typeof discriminant !== 'string') discriminant = '';
        const url = baseUrl + discriminant;
        axios.get(url)
            .then(({ data }) => {
                setResults(results => [...results, { ...format(data), id: uuid() }]);
            })
    };

    const clearResults = () => setResults([]);

    return [results, addResult, clearResults];
};

export { useFlip, useAxios };