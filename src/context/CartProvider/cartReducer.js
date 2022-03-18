export default function cartReducer(state, action) {
    const { cart } = action;
    switch (action.type) {
        case "assign":
            return cart
        
        case "reset":
            return {
                "id": null,
                "customer": null,
                "cartBooks": [],
                "sum_money": null
            }

        default:
            return state;
    }
    //return { user, role }
}