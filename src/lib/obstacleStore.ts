import { create } from "zustand";
import intersect2DSegs from "./util/doIntersect";

const useObstacle = create<ObstacleState & ObstacleAction>()((set, get) => ({
    obstacle: null,
    sideX: 'left',
    sideY: 'top',
    checkCollision: (charStore, e) => {
        // char, setCharPos, getCurrentPos, move
        const { character: char, setCharPos, getCurrentPos, move } = charStore
        let pointerPos = {} as Position
        if (e){
            pointerPos = {
                x: e.clientX,
                y: e.clientY
            }
        }

        if (!char) return

        const charRect = char.getBoundingClientRect()
        const obsRect = get().obstacle?.getBoundingClientRect()!
        // const collidedSide = get().
        const sideX = get().sideX
        const sideY = get().sideY
        const currentCharPos = getCurrentPos()

        const computedChar = getComputedStyle(char)
        const computedObs = getComputedStyle(get().obstacle!)

        // Before collision detection, check which side the character was on
        // Tried during and after collision: does not work whatsoever. DO NOT ATTEMPT


        // Note to self in the morning:
        // Possibility of being on the bottom right of the obsRect and so on
        // Do something about that when you get the chance
        // Y-Axis
        if (charRect.bottom < obsRect.top) {
            sideY !== 'top' && set({ sideY: 'top' })
        } else if (charRect.top > obsRect.bottom) {
            sideY !== 'bottom' && set({ sideY: 'bottom' })
        } else {
            sideY !== null && set({ sideY: null })
        }

        console.log(sideY)
        
        // X-Axis
        if (charRect.right < obsRect.left) {
            sideX !== 'left' && set({ sideX: 'left' })
        } else if (charRect.left > obsRect.right) {
            sideX !== 'right' && set({ sideX: 'right' })
        } else {
            sideX !== null && set({ sideX: null })
        }

        console.log(sideX)

        let charLine: Line = {
            ptOne: currentCharPos,
            ptTwo: pointerPos
        }

        console.log(charLine)
        let lineX: Line | null = null
        let lineY: Line | null = null

        if (sideX) {
            lineY = {
                ptOne: {
                    x: obsRect[sideX],
                    y: obsRect.top
                },
                ptTwo: {
                    x: obsRect[sideX],
                    y: obsRect.bottom
                }
            }
        }

        if (sideY) {
            lineX = {
                ptOne: {
                    x: obsRect.left,
                    y: obsRect[sideY]
                },
                ptTwo: {
                    x: obsRect.right,
                    y: obsRect[sideY]
                }
            }
        }
        
        const isIntersectingX = intersect2DSegs(charLine, lineX)
        const isIntersectingY = intersect2DSegs(charLine, lineY)

        console.log(isIntersectingX)
        console.log(isIntersectingY)

        if (isIntersectingX.type !== 'none') {
            setCharPos(isIntersectingX.point)
        } else if (isIntersectingY.type !== 'none') {
            setCharPos(isIntersectingY.point)
        }

    //     const intersectsHere = pointOfIntersection(
    //         {
    //             ptOne: {
    //                 x: parseInt(computedChar.left),
    //                 y: parseInt(computedChar.top)
    //             },
    //             ptTwo: {
    //                 x: move.x,
    //                 y: move.y
    //             }
    //         },
    //         lineTwo
    //     )
    //    const timerId = setTimeout(function tick() {
    //     let timerIdd
    //     if (!(charRect.left < obsRect.right &&
    //         charRect.right > obsRect.left &&
    //         charRect.top < obsRect.bottom &&
    //         charRect.bottom > obsRect.top)) {
    //             console.log('no')
    //             timerIdd = setTimeout(tick, 100)
    //             return
    //         }
    //         else {
    //             console.log('yes')
    //             clearTimeout(timerId)
    //             if (timerIdd) clearTimeout(timerIdd)
    //         }
    //    }, 100)
    // setTimeout(() => {

    // })
        // Just bounce back user

        // if (intersectsHere) {
        //     setCharPos(intersectsHere)
        //     return
        // }

        const rangeBuffer = 10
        // Collision detection
        if (!(charRect.left < obsRect.right + rangeBuffer &&
            charRect.right > obsRect.left - rangeBuffer &&
            charRect.top < obsRect.bottom + rangeBuffer &&
            charRect.bottom > obsRect.top - rangeBuffer)) return
        
        switch (sideX) {
            case 'left': {
                setCharPos({
                    ...currentCharPos,
                    x: currentCharPos.x - rangeBuffer
                })
                break;
            }
            case 'right': {
                setCharPos({
                    ...currentCharPos,
                    x: currentCharPos.x + rangeBuffer
                })
                break;
            }
            default: {
                break;
            }
        }
        switch (sideY) {
            case 'top': {
                setCharPos({
                    ...currentCharPos,
                    y: currentCharPos.y - rangeBuffer
                })
                break;
            }
            case 'bottom': {
                setCharPos({
                    ...currentCharPos,
                    y: currentCharPos.y + rangeBuffer
                })
                break;
            }
            default: {
                break;
            }
        }
    },
    // On init
    setObstacle: (obstacle) => set({ obstacle })
}))

export default useObstacle