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
        function something(e: KeyboardEvent | PointerEvent) {
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

        window.addEventListener('keydown', something)
        document.documentElement.addEventListener('pointerdown', something)
        return () => {
            window.removeEventListener('keydown', something)
            document.documentElement.removeEventListener('pointerdown', something)
        }
    }, [charStore.character])
    return (
        <div className="container" ref={divRef} style={style}>
            <img
                src={image}
            />
        </div>
    )
}