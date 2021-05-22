import CartContect from './cart-context'
const CartProvider = props => {
    const addItemHandler = item => {

    }
    const removeItemHandler = id => {

    }
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    return <CartContect.Provider value={cartContext}>
        {props.children}
    </CartContect.Provider>
}
export default CartProvider