import axios from "axios";

const URL_API= "http://localhost:8080/api/cart";

export const addProductToCart= async (product_id, token) => {
    try {
        await axios.post(URL_API, {productID: product_id}, {headers: {"Authorization": `Bearer ${token}`}});
    } catch (error) {
        console.error('An error occured while adding the data to the cart', error);
    }
}

export const removeQuantityCart= async (product_id, token) => {
    try {
        await axios.post(URL_API+"/remove", {productID: product_id}, {headers: {"Authorization": `Bearer ${token}`}});
    } catch (error) {
        console.error('An error occured while removing the product quantity from the cart', error);
    }
}

export const getDataFromCart= async (token) => {
    try {
        const response= await axios.get(URL_API, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.items;
    } catch (error) {
        console.error('An error occured while getting the data from the cart', error);
    }
}

export const clearCartItems= async (token, setProduct_Quantity) => {
    try {
        await axios.delete(URL_API, {
            headers: { Authorization: `Bearer ${token}`},
        });
        setProduct_Quantity({});
    } catch (error) {
        throw error;
    }
}