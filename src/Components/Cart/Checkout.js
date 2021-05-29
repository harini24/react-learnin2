import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const [formInputsvalidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })
    const name = useRef();
    const street = useRef();
    const postal = useRef();
    const city = useRef();

    const isEmpty = value => value.trim() === ''
    const isNotFiveChar = value => value.trim().length !== 5

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = name.current.value
        const enteredCity = city.current.value
        const enteredPostal = postal.current.value
        const enteredStreet = street.current.value

        const nameIsValid = !isEmpty(enteredName)
        const cityIsValid = !isEmpty(enteredCity)
        const streetIsValid = !isEmpty(enteredStreet)
        const postalIsValid = !isNotFiveChar(enteredPostal)

        setFormInputsValidity({
            name: nameIsValid,
            city: cityIsValid,
            street: streetIsValid,
            postal: postalIsValid
        })
        const formIsvalid = nameIsValid && cityIsValid && streetIsValid && postalIsValid

        if (!formIsvalid) {
            return
        }

        //sub,it cart Data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formInputsvalidity.name && classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={name} />
                {!formInputsvalidity.name && <p>please enter valid name</p>}
            </div>
            <div className={`${classes.control} ${!formInputsvalidity.street && classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={street} />
                {!formInputsvalidity.street && <p>please enter valid street</p>}
            </div>
            <div className={`${classes.control} ${!formInputsvalidity.postal && classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postal} />
                {!formInputsvalidity.postal && <p>please enter valid postal code</p>}
            </div>
            <div className={`${classes.control} ${!formInputsvalidity.city && classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={city} />
                {!formInputsvalidity.city && <p>please enter valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
        </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;