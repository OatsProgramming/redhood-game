import Character from "./components/Character/Character";
import Obstacle from "./components/Obstacle/Obstactle";
import { food, food2 } from "./lib/items";

export default function App() {
  return (
    <>
      <Character />
      <Obstacle
        items={food}
        image='/woodenCart.PNG'
       style={{
          top: '40vh',
          left: '25vh',
          scale: '2'
        }}
     />  
      
      <Obstacle
        items={food2}
        image='/woodenCart.PNG'
       style={{
          top: '80vh',
          left: '25vh',
          scale: '2'
        }}
     />
      
      <Obstacle
        items={food}
        image='/woodenCart.PNG'
        style={{
          top: '20vh',
          left: '2vh',
          scale: '1'
        }}
      />
     
    </>
  )
}