import { useReducer } from 'react'
import CartContect from './cart-context'

const defaultCartState={
    items:[],
    totalAmount:0
}
const cartReducer=(state,action)=>{
    if(action.type==='ADD_CART_ITEM'){
    const updatedItems=state.items.concat(action.item)//given an entirely new array where as push edits existing one
    const updatedTotalAmount = state.totalAmount+action.item.price*action.item.amount
    console.log("in cartReducer",updatedItems)
    return {
        items:updatedItems,
        totalAmount:updatedTotalAmount
    }
    }
    return defaultCartState
}
const CartProvider = props => {

    const [cartState, dispatchCartACtion] = useReducer(cartReducer,defaultCartState)
    const addItemHandler = item => {
        console.log( " in CartProvider addItemHandler")
        dispatchCartACtion({type:'ADD_CART_ITEM', item:item})
    }
    const removeItemHandler = id => {
        dispatchCartACtion({type:'REMOVE_CART_ITEM', id:id})
    }
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    console.log(cartContext)
    return <CartContect.Provider value={cartContext}>
        {props.children}
    </CartContect.Provider>
}
export default CartProvider