import useObstacle from "../../lib/zustand/obstacleStore"
import { CSSProperties, HTMLProps, useEffect, useRef, useState } from "react"
import useCharacter from "../../lib/zustand/characterStore"
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import './obstacle.css'
import textBubble from '../../assets/textBubble.json'
import charLocator from "../../lib/util/charLocator";

export default function Obstacle({ image, style }: {
    image: string,
    // Don't mess with width or height: treat all objects present in window as paper cutouts
    // Use scale only for resizing; otherwise, will affect the collision borders
    style: RequiredStyles & Omit<CSSProperties, 'height' | 'width'>
}) {
    const charStore = useCharacter()
    const { keyCollision, pointerCollision, setObstacle } = useObstacle()

    const obsRef = useRef<HTMLDivElement>(null)
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    const [isCharNear, setIsCharNear] = useState(false)

    // For collision
    useEffect(() => {
        setObstacle(obsRef.current!)
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

    // Check if character is near
    useEffect(() => {
        const obs = obsRef.current
        const char = charStore.character
        if (!char || !obs) return

        const obsRect = obs.getBoundingClientRect()
        const charRect = char.getBoundingClientRect()

        // For 3D effect
        // Behind char
        if (charRect.bottom > obsRect.bottom) char.style.zIndex = '1'
        // In front of char
        else char.style.zIndex = '0'

        // For text bubble
        const buffer = 30
        const { sideX, sideY } = charLocator(charRect, obsRect)
        let isNearX: boolean;
        let isNearY: boolean;
        switch (sideX) {
            case 'left': {
                isNearX = (charRect.right > obsRect.left - buffer)
                break;
            }
            case 'right': {
                isNearX = (charRect.left < obsRect.right + buffer)
                break;
            }
            default: {
                // User can be on just one side 
                // If on sideY only, ignore this axis (set to true) 
                isNearX = true
            }
        }
        switch (sideY) {
            case 'top': {
                isNearY = (charRect.bottom > obsRect.top - buffer)
                break;
            }
            case 'bottom': {
                isNearY = (charRect.top < obsRect.bottom + buffer)
                break;
            }
            default: {
                // User can be on just one side 
                // If on sideX only, ignore this axis (set to true) 
                isNearY = true
            }
        }

        if (isNearX && isNearY) {
            !isCharNear && setIsCharNear(true)
        } else {
            isCharNear && setIsCharNear(false)
        }

    }, [charStore.character, charStore.isGoing, charStore.move])

    // Text bubble animation & modal
    useEffect(() => {
        const lottie = lottieRef.current
        if (!lottie) return

        if (isCharNear) {
            lottie.setDirection(1)
            lottie.playSegments([0, 22], true)
        } else {
            lottie.setDirection(-1)
            lottie.goToAndPlay(22, true)
        }

        function interactModal(e: KeyboardEvent) {
            const dialog = dialogRef.current
            if (e.code !== 'KeyQ' || !dialog) return
            if (isCharNear) {
                !dialog.open && dialog.showModal()
            }
        }

        window.addEventListener('keydown', interactModal)
        return () => {
            window.removeEventListener('keydown', interactModal)
        }
    }, [isCharNear])

    return (
        <div className="container" ref={obsRef} style={style}>
            <Lottie
                // Prevent animation on initial load
                onDOMLoaded={() => lottieRef.current?.stop()}
                className="textBubble"
                lottieRef={lottieRef}
                animationData={textBubble}
                loop={false}
            />
            <img
                className="obstacle"
                src={image}
            />
            <dialog ref={dialogRef}>
                <p>Greetings, one and all!</p>
                <form method="dialog">
                    <button>OK</button>
                </form>
            </dialog>
        </div>
    )
}