
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../Store/cart-context'
import { useContext, useState } from 'react'
import CartItem from './CartItem'
import CheckOut from './Checkout'
const Cart = props => {
    const cartCtx = useContext(CartContext)
    const [isChcekout, setIsCheckout] = useState(false)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }
    const CartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }
    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => {
        return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={CartItemAddHandler.bind(null, item)}></CartItem>
    })}</ul>
    return <Modal onClick={props.hideCart}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isChcekout && <CheckOut onCancel={props.hideCart} />}
        {!isChcekout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.hideCart}>close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
    </Modal>
}

export default Cart