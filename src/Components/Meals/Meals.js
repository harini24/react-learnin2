import { Fragment } from "react"
import AvailableMeals from "./AvailableMeals"
import MealsSummary from "./MealsSummary"

const meals = props => {
    return <Fragment>
    <MealsSummary/>
    <AvailableMeals></AvailableMeals>
    </Fragment>
}

export default meals