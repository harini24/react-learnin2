import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
const MealItemform = props => {

    return <form className={classes.form}>
        <Input label="Amount" input={{
            id:"Amount_"+props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }} ></Input>
        <button>+ Add</button>
        </form>
}
export default MealItemform