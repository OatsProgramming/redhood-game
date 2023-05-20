import Character from "./components/Character/Character";
import Obstacle from "./components/Obstacle/Obstactle";

// width: 220px;
// height: 220px;

// top: 20vh;
// left: 25vh;

// '/woodenCart.PNG'

export default function App() {
  return (
    <>
      <Character />
      <Obstacle
        image='/woodenCart.PNG'
        randomString="one"
        style={{
          top: '40vh',
          left: '25vh',
          scale: '2'
        }}
     />  
      
      <Obstacle
        image='/woodenCart.PNG'
        randomString="two"
        style={{
          top: '80vh',
          left: '25vh',
          scale: '2'
        }}
     />
      
      <Obstacle
        image='/woodenCart.PNG'
        randomString="three"
        style={{
          top: '20vh',
          left: '2vh',
          scale: '1'
        }}
      />
       
    </>
  )
}