import Character from "./components/Character/Character";
import Obstacle from "./components/Obstacle/Obstactle";
import useObstacle from "./lib/zustand/obstacleStore";

export default function App() {
  return (
    <>
      <Character />
      <Obstacle />
    </>
  )
}