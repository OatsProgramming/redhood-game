import { useState, useRef, useEffect } from 'react'
import './App.css'

type AnimNames = 'stand' | 'walk' | 'run' | 'jump'

function App() {
  const [animation, setAnimation] = useState<AnimNames>('stand')
  const divRef = useRef<HTMLDivElement>(null)
  // Set initial character location at the middle
  const [move, setMove] = useState({
    x: document.documentElement.clientWidth / 2,
    y: document.documentElement.clientHeight / 2,
  })

  useEffect(() => {
    const div = divRef.current!

    // If user is using keys to interact
    function changeAnimation(e: KeyboardEvent) {
      div.style.setProperty('--duration', '200ms')

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
      } else if (e.code === 'Space') {
        animation !== 'jump' && setAnimation('jump')
      }

      // Determine the direction
      switch (e.key) {
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
        let x = prev.x + moveX
        let y = prev.y + moveY
        
        // Add in-game boundaries
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

    // If user wants to tap the screen
    function goHere(e: PointerEvent) {
      const currentPos = {
        x: parseInt(div.style.left),
        y: parseInt(div.style.top)
      }
      // Not pageX | pageY: only care about client window
      const newPos = {
        x: e.clientX - div.offsetWidth / 2,
        y: e.clientY - div.offsetHeight / 2,
      }

      // Get the distance btwn current position and place of interest
      const distance = Math.sqrt(
        Math.pow((currentPos.x - newPos.x), 2)
        + Math.pow((currentPos.y - newPos.y), 2)
      )
      
      // To deal with how long the transition will be
      const durationPointer = (Math.round(distance * 10 / 1.5))
      div.style.setProperty('--duration', durationPointer + 'ms')
      
      // Determine which way the character should face
      const direction = currentPos.x - newPos.x
      if (direction > 0) div.classList.add('turnLeft')
      else div.classList.remove('turnLeft')

      // Start transition
      setAnimation('run')
      setMove(newPos)

      // Schedule a separate macrotask to let goHere() be considered finished
      // This will help with setStates
      setTimeout(() => {
        setAnimation('walk')
        setTimeout(() => setAnimation('stand'), (durationPointer * (1 / 3)))
      }, (durationPointer * (2 / 3)))
    }

    window.addEventListener('keydown', changeAnimation)
    window.addEventListener('keyup', toStand)
    document.documentElement.addEventListener('pointerdown', goHere)
    return () => {
      window.removeEventListener('keydown', changeAnimation)
      window.removeEventListener('keyup', toStand)
      document.documentElement.removeEventListener('pointerdown', goHere)
    }
  }, [])

  return (
    <div className='charBox'
      ref={divRef}
      onAnimationEnd={() => {
        if (animation === 'jump') setAnimation('stand')
      }}
      // Forgot what it was but doing this to prevent errors
      style={{
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
