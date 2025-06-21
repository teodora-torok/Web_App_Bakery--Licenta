import axios from "axios";

const URL_API= 'http://localhost:8080/api/products';

export const getProducts_List = async()=> {
    try{
        const response = await axios.get(URL_API);
        return response.data;
    } catch (error) {
        console.log('An Error occured while getting the list of products', error);
        throw error;
    }
}

export const getProduct_Details= async(product_id) => {
        try {
            const response = await axios.get(`${URL_API}/${product_id}`);
            return response.data;
        } catch(error) {
            console.log('An error occured while getting the product description', error);
            throw error;
        }

        //const response= await axios.get('http://localhost:8080/api/products'+product_id);

    }