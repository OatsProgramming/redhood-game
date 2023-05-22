import { useRef, useEffect } from 'react'
import './character.css'
import useCharacter from '../../lib/zustand/characterStore'

export default function Character() {
  const divRef = useRef<HTMLDivElement>(null)
  const { character, move, animation, changeAnimation, toStand, goHere, setAnimation, setCharacter, setCharPos } = useCharacter()

  // Renders x2 -> x4 keyup
  console.log('asd')
  useEffect(() => {
    const windowCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    setCharPos(windowCenter)
    setCharacter(divRef.current)
  }, [])

  useEffect(() => {
    // Set initial character location at the middle
    function handleMovements(e: PointerEvent | KeyboardEvent) {
      // Check if character is connected (Related to if dialog.open)
      if (
        !character ||
        e instanceof PointerEvent && e.target !== document.body
      ) return

      if (e instanceof KeyboardEvent) changeAnimation(e)
      else goHere(e)
    }

    // Prevent context for mobile on long press
    // function preventContext(e: MouseEvent) {
    //   console.log(e)
    //   e.preventDefault()
    // }

    window.addEventListener('keydown', handleMovements)
    window.addEventListener('keyup', toStand)
    document.body.addEventListener('pointerdown', handleMovements)
    // document.body.addEventListener('contextmenu', preventContext)
    return () => {
      window.removeEventListener('keydown', handleMovements)
      window.removeEventListener('keyup', toStand)
      document.body.removeEventListener('pointerdown', handleMovements)
      // document.body.removeEventListener('contextmenu', preventContext)
    }
  }, [character])

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
        src='/character2.png'
      />
    </div>
  )
}

