
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../Store/cart-context'
import { useContext } from 'react'
import CartItem from './CartItem'
const Cart = props => {
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length>0

    const cartItemRemoveHandler = id =>{

    }
    const CartItemAddHandler = item =>{

    }
    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => {
       return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onadd={CartItemAddHandler.bind(null,item)}></CartItem>
    })}</ul>
    return <Modal onClick={props.hideCart}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.hideCart}>close</button>
           {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart