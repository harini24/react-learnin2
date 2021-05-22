import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../Store/cart-context'
import { useContext,useEffect,useState } from 'react'
const HeaderCartButton = props => {
    const [btnHighlight,setButtonHighlight]=useState(false)
    const cartCtx = useContext(CartContext)
    const numberofCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    useEffect(()=>{
        if(cartCtx.items.length === 0){
            return;
        }
        setButtonHighlight(true)

        const timer = setTimeout(() => {
            setButtonHighlight(false)
        }, 300);
        return ()=>{
            clearTimeout(timer)
        }
    },[cartCtx.items])
    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberofCartItems}</span>
    </button>
}

export default HeaderCartButton