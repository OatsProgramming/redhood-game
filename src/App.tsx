import { useState, useRef, useEffect } from 'react'
import './App.css'

type AnimNames = 'stand' | 'walk' | 'run'

function App() {
  const [animation, setAnimation] = useState<AnimNames>('stand')
  const divRef = useRef<HTMLDivElement>(null)
  const [move, setMove] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    function changeAnimation(e: KeyboardEvent) {
      const div = divRef.current!
      let moveX = 0
      let moveY = 0

      // Determine the speed
      if (e.key.includes('Arrow')) {
        if (e.shiftKey) {
          animation !== 'run' && setAnimation('run')
          moveX = moveY = 10
        } else {
          animation !== 'walk' && setAnimation('walk')
          moveX = moveY = 5
        }
      }

      // Determine the direction
      switch(e.key) {
        // Turn off moveY for x-axis only direction
        // Toggle moveX direction
        case 'ArrowLeft': {
          moveY *= 0
          div.classList.add('turnLeft')
          if (moveX > 0) moveX *= -1
          break;
        }
        case 'ArrowRight': {
          moveY *= 0
          div.classList.remove('turnLeft')
          if (moveX < 0) moveX *= -1
          break;
        }
        // Turn off moveX for y-axis only direction
        // Toggle moveY direction
        case 'ArrowUp': {
          moveX *= 0
          if (moveY > 0) moveY *= -1
          break;
        }
        case 'ArrowDown': {
          moveX *= 0
          if (moveY < 0) moveY *= -1
          break;
        }
      }
      setMove(prev => ({
        x: prev.x + moveX,
        y: prev.y + moveY
      }))
    }

    // Neutral animation
    function toStand(e: KeyboardEvent) {
      if (e.key.includes('Arrow')) {
        setAnimation('stand')
      }
    }

    window.addEventListener('keydown', changeAnimation)
    window.addEventListener('keyup', toStand)
    return () => {
      window.removeEventListener('keydown', changeAnimation)
      window.removeEventListener('keyup', toStand)
    }
  }, [])


  return (
    <div className='main' ref={divRef} style={{ 
      left: `${move.x}px`, 
      top: `${move.y}px` 
    }}>
      <img
        className={animation}
        src='/character.png'
      />
    </div>
  )
}

export default App
