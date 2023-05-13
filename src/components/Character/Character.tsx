import { useRef, useEffect } from 'react'
import './character.css'
import useCharacter from '../../lib/characterStore'

export default function Character() {
  const divRef = useRef<HTMLDivElement>(null)
  const { move, animation, changeAnimation, toStand, goHere, setAnimation, setCharacter, setInitPos } = useCharacter()
  useEffect(() => {
    // Set initial character location at the middle
    const windowCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    setInitPos(windowCenter)

    setCharacter(divRef.current)

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

