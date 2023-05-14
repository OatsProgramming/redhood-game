import useObstacle from "../../lib/obstacleStore"
import { useEffect, useRef } from "react"
import './obstacle.css'
import useCharacter from "../../lib/characterStore"

export default function Obstacle() {
    const divRef = useRef<HTMLDivElement>(null)
    const { checkCollision, setObstacle } = useObstacle()
    const { character, setCharPos, getCurrentPos } = useCharacter()
    
    useEffect(() => {
        setObstacle(divRef.current!)
        function something() {
            checkCollision(character!, setCharPos, getCurrentPos)
        }
        window.addEventListener('keydown', something)
        return () => {
            window.removeEventListener('keydown', something)
        }
    }, [character])
    return (
        <div className="container" ref={divRef}>
            <img 
            />
        </div>
    )
}