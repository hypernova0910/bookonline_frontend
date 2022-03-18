import React, {useReducer, useEffect, useContext} from 'react';
import cartReducer from "./cartReducer";
import { AuthContext } from '../AuthProvider';

import CartService from '../../service/CartService'

export const CartContext = React.createContext(null);

export default ({ children }) => {
    const [customerId, dispatchCustomerId] = useContext(AuthContext)

    const [cart, dispatchCart] = useReducer(cartReducer, {
        "id": null,
        "customer": null,
        "cartBooks": [],
        "sum_money": 0
    });

    useEffect(() => {
        if(customerId > 0){
            CartService.getCartByCustomerId(customerId).then((res) => {
                //console.log(res.data)
                dispatchCart({type: "assign", cart: res.data})
            })
        }
        else{
            dispatchCart({type: "reset"})
        }
    }, [customerId])

    return (
        <CartContext.Provider value={[cart, dispatchCart]}>
            {children}
        </CartContext.Provider>
    );
};