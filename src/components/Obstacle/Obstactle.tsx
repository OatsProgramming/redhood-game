import useObstacle from "../../lib/obstacleStore"
import { useEffect, useRef, useState } from "react"
import './obstacle.css'
import useCharacter from "../../lib/characterStore"

export default function Obstacle() {
    const divRef = useRef<HTMLDivElement>(null)
    const { checkCollision, setObstacle } = useObstacle()
    // const [isChanging, setIsChanging] = useState(false)
    const charStore = useCharacter()
    // useEffect(() => {
    //     function check() {

    //     }

    //     document.documentElement.addEventListener('pointerdown', check)
    //     return () => document.documentElement.removeEventListener('pointerdown', check)
    // }, [])

    useEffect(() => {
        
        setObstacle(divRef.current!)
        function something(e: KeyboardEvent | PointerEvent) {
            // Only care about character's movement
            if (e instanceof KeyboardEvent && !e.key.includes('Arrow')) return
            else if (e.target !== document.body) return
            else if (e instanceof PointerEvent) checkCollision(charStore, e)
            else checkCollision(charStore)
        }
        window.addEventListener('keydown', something)
        document.documentElement.addEventListener('pointerdown', something)
        return () => {
            window.removeEventListener('keydown', something)
            document.documentElement.removeEventListener('pointerdown', something)
        }
    }, [charStore.character, charStore.isGoing])
    return (
        <div className="container" ref={divRef}>
            <img 
            />
        </div>
    )
}