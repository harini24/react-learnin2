import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
const AvailableMeals = props => {
    const [meals, setmeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {

        const fetchMeals = async () => {
            // try {
            const response = await fetch('https://react-burger-builder-29b01-default-rtdb.firebaseio.com/meals.json')
            console.log(response)
            if (!response.ok) {
                throw new Error("something went wrong");
            }
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
            setIsLoading(false)
            // } catch (e) {
            //     console.log("error")
            //     setIsLoading(false)
            //     setHttpError(e.message)
            // }
        }

        fetchMeals().catch(e => {
            console.log("error")
            setIsLoading(false)
            setHttpError(e.message)
        })

        // try{
        //     fetchMeals()
        // }catch(e){
        //     setIsLoading(false)
        //     setHttpError(e.message)
        // }// does not work as it is a async function
    }, [])


    const mealsList = meals.map(meal => {
        return <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}></MealItem>
    })

    return <section className={classes.meals}>
        <Card>
            <ul>
                {!isLoading ? (!httpError ? mealsList : <p className={classes.mealsError}> {httpError}</p>) : <p className={classes.mealsLoading}>loading</p>}
            </ul>
        </Card>
    </section >
}

export default AvailableMeals