import { useRef, useEffect } from 'react'
import './character.css'
import useCharacter from '../../lib/zustand/characterStore'

export default function Character() {
  const divRef = useRef<HTMLDivElement>(null)
  const { character, move, animation, changeAnimation, toStand, goHere, setAnimation, setCharacter, setCharPos } = useCharacter()

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
      // Check if character is connected (dialog.open ?)
      if (!character) return

      if (e instanceof PointerEvent) goHere(e)
      else changeAnimation(e)
    }

    window.addEventListener('keydown', handleMovements)
    window.addEventListener('keyup', toStand)
    document.body.addEventListener('pointerdown', handleMovements)
    return () => {
      window.removeEventListener('keydown', handleMovements)
      window.removeEventListener('keyup', toStand)
      document.body.removeEventListener('pointerdown', handleMovements)
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

