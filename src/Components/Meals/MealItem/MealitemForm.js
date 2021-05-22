import { useRef, useState } from 'react';
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
const MealItemform = props => {
    const[amountIsValid,setAmountIsValid] = useState(true)
    const submitHandler = e => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value
        const enteredAmountNum = +enteredAmount
        if(enteredAmount.trim().length == 0 || enteredAmountNum < 1 ||enteredAmountNum > 5){
           setAmountIsValid(false)
            return 
        }
        props.onAddToCart(enteredAmountNum)
    }
    const amountInputRef = useRef();
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" 
        ref={amountInputRef}
        input={{
            id: "Amount_" + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} ></Input>
        <button>+ Add</button>
        {!amountIsValid && <p>please enter valid amount between 1 to 5</p>}
    </form>
}
export default MealItemform