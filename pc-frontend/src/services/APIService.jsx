const APIService = () => {
    const APIENDPOINT = 'https://chinnisanjay2504.pythonanywhere.com'
    // const APIENDPOINT = 'http://localhost:8000'
    const makeRequest = async (url, method = 'GET', data = null, headers = {}) => {
        try {
            const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            };

            if (data) {
            options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error during ${method} ${url}:`, error);
            throw error;
        }
    };

    const fetchCategories = () => {
        const url = `${APIENDPOINT}/inventory/categories`;
        return makeRequest(url, 'GET');
    };
    const fetchProducts = (category = 'ALL') => {
        category.replace('/','')
        const url = `${APIENDPOINT}/inventory/products?list=${category}`;
        return makeRequest(url, 'GET');
    };
    return {
        fetchCategories,
        fetchProducts  
    };
};

export default APIService;