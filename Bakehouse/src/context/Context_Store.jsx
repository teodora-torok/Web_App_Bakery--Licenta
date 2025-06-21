import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getProducts_List } from "../service/Products_Service";
import { addProductToCart, getDataFromCart, removeQuantityCart } from "../service/Cart_Service";

export const ContextStore= createContext(null);

export const ContextStoreProvider= (props) => {
 
    const [Products_List, setProducts_List] = useState([]);

    const [Product_Quantity, setProduct_Quantity] = useState({});
  
    
    const [token, set_Token]= useState("");

    const QuantityIncrease=  async (product_id) => {
        setProduct_Quantity((prev) => ({...prev, [product_id]: (prev[product_id] || 0)+1}));
        await addProductToCart(product_id, token);
    };

    const QuantityDecrease=  async (product_id) => {
        setProduct_Quantity((prev)=> ({...prev, [product_id]: prev[product_id]>0 ? prev[product_id]-1:0}));
        await removeQuantityCart(product_id, token);
    };

    const Deletefrom_Cart= (product_id)=> {
        setProduct_Quantity((prevQuantity)=> {
            const Quantity_Update= {...prevQuantity};
            delete Quantity_Update[product_id];
            return Quantity_Update;
        })
    }

    const CartLoading= async (token)=> {
        const items= await getDataFromCart(token);
        setProduct_Quantity(items);
    }

    const ValueOfContext = {
        Products_List,
        QuantityIncrease,
        QuantityDecrease,
        Product_Quantity,
        Deletefrom_Cart,
        token, 
        set_Token,
        setProduct_Quantity,
        CartLoading
    };

    useEffect(() => {
        async function DataLoading() {
            const data= await getProducts_List();
            setProducts_List(data);
            if(localStorage.getItem("token")) {
                set_Token(localStorage.getItem("token"));
                await CartLoading(localStorage.getItem("token"));
            }
        }
        DataLoading();
    }, [])



    return (
        <ContextStore.Provider value={ValueOfContext}>
            {props.children}
        </ContextStore.Provider>
    )
}

//api call to backend service to get the food