import { lazy } from "react";
import Character from "./components/Character/Character";
import InteractBtns from "./components/InteractBtns/InteractBtns";
import Obstacle from "./components/Obstacle/Obstactle";
import { food, food2 } from "./lib/items";

const InventoryDialog = lazy(() => 
  import('./components/Dialog/InventoryDialog/InventoryDialog')
)

export default function App() {
  return (
    <>
      <InteractBtns />
      <Character />
      <Obstacle
        items={food}
        image='/woodenCart.PNG'
        style={{
          top: '40vh',
          left: '25vw',
          scale: '2'
        }}
      />

      <Obstacle
        items={food2}
        image='/woodenCart.PNG'
        style={{
          top: '80vh',
          left: '25vw',
          scale: '2'
        }}
      />

      <Obstacle
        items={food}
        image='/woodenCart.PNG'
        style={{
          top: '20vh',
          left: '2vw',
          scale: '1'
        }}
      />
      <InventoryDialog />
    </>
  )
}