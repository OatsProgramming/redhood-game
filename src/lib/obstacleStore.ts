import { create } from "zustand";
import doIntersect from "./util/doIntersect";
import charLocator from "./util/charLocator";

const useObstacle = create<ObstacleState & ObstacleAction>()((set, get) => ({
    obstacle: null,
    keyCollision: (charStore) => {
        const { character: char, setCharPos, getCurrentPos } = charStore
        if (!char) return

        const charRect = char.getBoundingClientRect()
        const obsRect = get().obstacle?.getBoundingClientRect()!
        const { sideX, sideY } = charLocator(charRect, obsRect)
        const currentCharPos = getCurrentPos()
        const rangeBuffer = 15

        // Collision detection
        if (!(
            charRect.left < obsRect.right + rangeBuffer &&
            charRect.right > obsRect.left - rangeBuffer &&
            charRect.top < obsRect.bottom + rangeBuffer &&
            charRect.bottom > obsRect.top - rangeBuffer
        )) return

        // Determine the bounce back for collision
        let x = 0
        let y = 0
        switch (sideX) {
            case 'left': {
                x = -rangeBuffer
                break;
            }
            case 'right': {
                x = rangeBuffer
                break;
            }
        }
        switch (sideY) {
            case 'top': {
                y = -rangeBuffer
                break;
            }
            case 'bottom': {
                y = rangeBuffer
                break;
            }
        }

        setCharPos({
            x: currentCharPos.x + x,
            y: currentCharPos.y + y
        })
    },
    pointerCollision: (charStore: CharacterAction & CharacterState, e: PointerEvent) => {
        const { character: char, setCharPos, getCurrentPos } = charStore
        if (!char) return

        const obsRect = get().obstacle?.getBoundingClientRect()!
        const charRect = char.getBoundingClientRect()
        const { sideX, sideY } = charLocator(charRect, obsRect)

        let lineX: Line | undefined;
        let lineY: Line | undefined;
        const charLine: Line = {
            ptOne: getCurrentPos(),
            ptTwo: {
                x: e.clientX,
                y: e.clientY
            }
        }

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

        const intersectionX = doIntersect(charLine, lineX)
        const intersectionY = doIntersect(charLine, lineY)

        if (intersectionX.point) {
            setCharPos(intersectionX.point)
        } else if (intersectionY.point) {
            setCharPos(intersectionY.point)
        }
    },
    // On init
    setObstacle: (obstacle) => set({ obstacle })
}))

export default useObstacle