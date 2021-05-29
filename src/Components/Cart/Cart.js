
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../Store/cart-context'
import React, { useContext, useState } from 'react'
import CartItem from './CartItem'
import CheckOut from './Checkout'
const Cart = props => {
    const cartCtx = useContext(CartContext)
    const [isChcekout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmitting, setDidSubmitting] = useState(false)
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

    const submitOrderhandler = async (userdata) => {
        setIsSubmitting(true)
        await fetch('https://react-burger-builder-29b01-default-rtdb.firebaseio.com/restaurantOrders.json', {
            method: "POST",
            body: JSON.stringify({ user: userdata, orderItems: cartCtx.items })
        })

        setIsSubmitting(false)
        setDidSubmitting(true)
        cartCtx.clearCart()
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => {
        return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={CartItemAddHandler.bind(null, item)}></CartItem>
    })}</ul>

    const cartModal = (<React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isChcekout && <CheckOut onConfirm={submitOrderhandler} onCancel={props.hideCart} />}
        {!isChcekout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.hideCart}>close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
    </React.Fragment>)

    const isSubmittingModalContent = <p>Sending Order data</p>
    const didSubmitModalContent = <p>Successfully sent the order</p>
    return <Modal onClick={props.hideCart}>
        {!isSubmitting && !didSubmitting && cartModal}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmitting && didSubmitModalContent}
    </Modal>
}

export default Cart