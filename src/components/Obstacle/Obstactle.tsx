import { CSSProperties, useCallback, useEffect, useRef, useState } from "react"
import useCharacter from "../../lib/zustand/characterStore"
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import './obstacle.css'
import textBubble from '../../assets/textBubble.json'
import charLocator from "../../lib/util/charLocator";
import keyCollision from "../../lib/util/keyCollision";
import pointerCollision from "../../lib/util/pointerCollision";
import Dialog from "../Dialog/Dialog";

export default function Obstacle({ image, style, items }: {
    image: string,
    items: Item[],
    // Don't mess with width or height: treat all objects present in window as paper cutouts
    // Use scale only for resizing; otherwise, will affect the collision borders
    style: RequiredStyles & Omit<CSSProperties, 'height' | 'width'>
}) {
    const charStore = useCharacter()

    const obsRef = useRef<HTMLDivElement>(null)
    const obsImgRef = useRef<HTMLImageElement>(null)
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    const [isCharNear, setIsCharNear] = useState(false)
    const [charHolder, setCharHolder] = useState<HTMLDivElement | null>(null)
    // Can't directly use .style for some reason (readonly)
    const [lottieClass, setLottieClass] = useState<'textBubble' | 'none'>('none')

    const handleModal = useCallback(function() {
        const dialog = dialogRef.current
        if (!dialog || !isCharNear) return

        if (dialog.open) {
            // Disconnect character to disable movement
            charStore.setCharacter(charHolder)
            setCharHolder(null)
            dialog.close()
        } else {
            // Reconnect character to allow movement
            setCharHolder(charStore.character)
            charStore.setCharacter(null)
            dialog.showModal()
        }
    }, [dialogRef.current?.open, isCharNear])

    // For collision
    useEffect(() => {
        // if (!dialogRef.current) return
        // setDialog(dialogRef.current)

        function collisionDetection(e: KeyboardEvent | PointerEvent) {
            if (!obsRef.current || !obsImgRef.current) return

            // Only care about character's movement
            else if (e.target !== document.body) return
            else if (e instanceof KeyboardEvent && !e.key.includes('Arrow')) return

            // Check if user is using taps for movement
            else if (e instanceof PointerEvent) {
                pointerCollision(charStore, e, obsImgRef.current)
            }

            // Or with the keys
            else keyCollision(charStore, obsRef.current!)
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
        if (charRect.bottom > obsRect.bottom) {
            char.style.zIndex = '1'
            obs.style.zIndex = '0'
        }
        // In front of char
        else {
            char.style.zIndex = '0'
            obs.style.zIndex = '1'
        }

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
            setLottieClass('textBubble')
            lottie.setDirection(1)
            lottie.playSegments([0, 22], true)
        } else {
            lottie.setDirection(-1)
            lottie.goToAndPlay(22, true)
        }

        function interactModal(e: KeyboardEvent) {
            const dialog = dialogRef.current
            if (e.code !== 'KeyQ' || !dialog) return
            else if (isCharNear && !dialog.open) handleModal()
        }

        window.addEventListener('keydown', interactModal)
        return () => {
            window.removeEventListener('keydown', interactModal)
        }
    }, [isCharNear])

    return (
        <div className="container" ref={obsRef} style={style}>
            <div className="shadow" />
            <Lottie
                className={lottieClass}
                lottieRef={lottieRef}
                animationData={textBubble}
                loop={false}
                // Prevent animation on initial load
                onDOMLoaded={() => lottieRef.current?.stop()}
                // Ensures that the animation gets to play then safely remove the element
                onComplete={() => !isCharNear && setLottieClass('none')}
            />
            <img
                ref={obsImgRef}
                className="obstacle"
                src={image}
            />
            <Dialog 
                ref={dialogRef}
                handleModal={handleModal}
                items={items}
            />
        </div>
    )
}