import useObstacle from "../../lib/zustand/obstacleStore"
import { CSSProperties, useEffect, useRef } from "react"
import useCharacter from "../../lib/zustand/characterStore"
import './obstacle.css'

export default function Obstacle({ image, style }: {
    image: string,
    style: RequiredStyles & CSSProperties
}) {
    const charStore = useCharacter()
    const divRef = useRef<HTMLDivElement>(null)
    const { keyCollision, pointerCollision, setObstacle } = useObstacle()

    useEffect(() => {
        setObstacle(divRef.current!)
        function collisionDetection(e: KeyboardEvent | PointerEvent) {
            // Only care about character's movement
            if (e instanceof KeyboardEvent && !e.key.includes('Arrow')) return
            else if (e.target !== document.body) return

            // Check if user is using taps for movement
            else if (e instanceof PointerEvent) {
                pointerCollision(charStore, e)
            }

            // Or with the keys
            else keyCollision(charStore)
        }

        window.addEventListener('keydown', collisionDetection)
        document.documentElement.addEventListener('pointerdown', collisionDetection)
        return () => {
            window.removeEventListener('keydown', collisionDetection)
            document.documentElement.removeEventListener('pointerdown', collisionDetection)
        }
    // Don't add charStore.move as a dependency here
    // Will constantly create add/removeEventListeners 
    }, [charStore.character])

    useEffect(() => {
        
    }, [charStore.move])
    return (
        <div className="container" ref={divRef} style={style}>
            <img
                src={image}
            />
        </div>
    )
}