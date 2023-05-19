import useObstacle from "../../lib/zustand/obstacleStore"
import { CSSProperties, useEffect, useRef } from "react"
import useCharacter from "../../lib/zustand/characterStore"
import Lottie from "lottie-react";
import './obstacle.css'
import textBubble from '../../../public/textBubble.json'

export default function Obstacle({ image, style }: {
    image: string,
    style: RequiredStyles & CSSProperties
}) {
    const charStore = useCharacter()
    const divRef = useRef<HTMLDivElement>(null)
    const lottieRef = useRef(null)
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
        const obs = divRef.current
        const char = charStore.character
        if (!char || !obs) return

        const obsRect = obs.getBoundingClientRect()
        const charRect = char.getBoundingClientRect()
        
        // Behind char
        if (charRect.bottom > obsRect.bottom) char.style.zIndex = '1' 
        // In front of char
        else char.style.zIndex = '0'

    }, [charStore.character, charStore.move])
    return (
        <div className="container" ref={divRef}>
            {/* <Lottie 
                lottieRef={lottieRef}
                animationData={textBubble}
                loop={false}
            /> */}
            <img
                className="obstacle"
                src={image}
            />
        </div>
    )
}