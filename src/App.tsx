import { useState, useRef, useEffect } from 'react'
import './App.css'

type AnimNames = 'stand' | 'walk' | 'run'

function App() {
  const [animation, setAnimation] = useState<AnimNames>('stand')
  const divRef = useRef<HTMLDivElement>(null)
  // Set initial character location at the middle
  const [move, setMove] = useState({
    x: document.documentElement.clientWidth / 2,
    y: document.documentElement.clientHeight / 2,
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
          moveX = moveY = 15
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
      setMove(prev => {
        // Add in-game boundaries
        let x = prev.x + moveX
        let y = prev.y + moveY

        // Using clientWidth / clientHeight just in case of scrollbar present
        if (0 >= prev.x) {
          x = prev.x + 10
        } else if (document.documentElement.clientWidth - 20 <= prev.x) {
          x = prev.x - 10
        }

        if (0 >= prev.y) {
          y = prev.y + 10
        } else if (document.documentElement.clientHeight - 50 <= prev.y) {
          y = prev.y - 10
        }

        return ({ x, y })
      })
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
