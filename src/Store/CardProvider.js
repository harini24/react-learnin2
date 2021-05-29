import { useReducer } from 'react'
import CartContect from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {

    if (action.type === 'ADD_CART_ITEM') {
        // const updatedItems=state.items.concat(action.item)//given an entirely new array where as push edits existing one
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(item => item.id == action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItem;
        let updatedItems;
        console.log("ADD_CART_ITEM", action)
        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }
        console.log("in cartReducer", updatedItems)
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE_CART_ITEM') {
        // const updatedItems=state.items.concat(action.item)//given an entirely new array where as push edits existing one
        console.log("ADD_CART_ITEM", action)
        const existingCartItemIndex = state.items.findIndex(item => item.id == action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price
        let updatedItem;
        let updatedItems;
        if (existingCartItem.amount > 1) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            }
            console.log(updatedItem)
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.filter(item => item.id != action.id)
        }
        console.log("in cartReducer", updatedItems)
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}
const CartProvider = props => {

    const [cartState, dispatchCartACtion] = useReducer(cartReducer, defaultCartState)
    const addItemHandler = item => {
        console.log(" in CartProvider addItemHandler")
        dispatchCartACtion({ type: 'ADD_CART_ITEM', item: item })
    }
    const removeItemHandler = id => {
        dispatchCartACtion({ type: 'REMOVE_CART_ITEM', id: id })
    }

    const clearcarthandler = () => {
        dispatchCartACtion({ type: 'CLEAR' })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearcarthandler
    }
    console.log(cartContext)
    return <CartContect.Provider value={cartContext}>
        {props.children}
    </CartContect.Provider>
}
export default CartProvider