import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";

function App() {
  const[cartIsShown,setCartIsShown] = useState(false)

  const showCartHandler=()=>{
    setCartIsShown(true)
  }

  const hideCartHandler=()=>{
    setCartIsShown(false)
  }
  return (
    <div>
     {cartIsShown && <Cart hideCart={hideCartHandler}/>}
     <Header showcart={showCartHandler}/>
     <main>
       <Meals/>
     </main>
    </div>
  );
}

export default App;
