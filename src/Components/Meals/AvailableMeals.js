import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
const AvailableMeals = props => {
    const [meals, setmeals] = useState([])

    useEffect(() => {
        fetchMeals()
    }, [])

    const fetchMeals = async () => {
        const response = await fetch('https://react-burger-builder-29b01-default-rtdb.firebaseio.com/meals.json')
        const data = await response.json()
        const mealsList1 = []
        for (const meal in data) {
            const mealInfo = {}
            console.log(meal)
            mealInfo['id'] = meal
            mealInfo['name'] = data[meal].name
            mealInfo['description'] = data[meal].description
            mealInfo['price'] = data[meal].price
            mealsList1.push(mealInfo)
        }
        setmeals(mealsList1)
    }
    const mealsList = meals.map(meal => {
        return <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}></MealItem>
    })
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals