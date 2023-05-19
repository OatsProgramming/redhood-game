import Character from "./components/Character/Character";
import Obstacle from "./components/Obstacle/Obstactle";
import useObstacle from "./lib/zustand/obstacleStore";

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
        style={{
          width: '220px',
          height: '220px',
          top: '20vh',
          left: '25vh',
        }}
      />
    </>
  )
}