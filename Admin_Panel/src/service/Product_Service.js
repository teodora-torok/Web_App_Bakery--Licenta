import axios from "axios";
const URL_API= 'http://localhost:8080/api/products';

export const add_product= async(Product_Data, Product_Image)=> {
    {/*api call, to send data to db*/}
    const form_data= new FormData();
    form_data.append('product', JSON.stringify(Product_Data));  
    form_data.append('file', Product_Image);

    try {
        await axios.post(URL_API, form_data, {headers: {"Content-Type": "multipart/form-data"}});
        
    } catch(error) {
        console.log('An error occured', error);
        throw error;
    }
}

export const getProduct_List= async()=> {
    try {
        const Product_Response= await axios.get(URL_API);
        
        return Product_Response.data;
    } catch(error) {
        console.log('An error occured while displaying the products.', error);
        throw error;
    }
}

export const delete_product= async(product_id) =>{
    try {
        const Product_Response= await axios.delete(URL_API+"/"+product_id);
        return Product_Response.status===204;
    } catch(error) {
        console.log('An error occured while displaying the products.', error);
        throw error;
    }
}



