import { create } from "zustand";
import doIntersect from "../util/doIntersect";
import charLocator from "../util/charLocator";

const useObstacle = create<ObstacleState & ObstacleAction>()((set, get) => ({
    obstacle: null,
    obsImg: null,
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
            charRect.bottom < obsRect.bottom + rangeBuffer &&
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
    // Instead of checking for a collision when it occurs
    // Predict possible collisions 
    pointerCollision: (charStore: CharacterAction & CharacterState, e: PointerEvent) => {
        const { character: char, setCharPos, getCurrentPos } = charStore
        const obsImg = get().obsImg
        if (!char || !obsImg) return

        const obsImgRect = obsImg.getBoundingClientRect()
        const charRect = char.getBoundingClientRect()
        const { sideX, sideY } = charLocator(charRect, obsImgRect)

        let lineX: Line | undefined;
        let lineY: Line | undefined;
        const charLine: Line = {
            ptOne: getCurrentPos(),
            ptTwo: {
                x: e.clientX,
                y: e.clientY
            }
        }

        // User is either left or right of obstacle
        if (sideX) {
            // Check lines that go vertically
            lineY = {
                ptOne: {
                    x: obsImgRect[sideX],
                    y: obsImgRect.top
                },
                ptTwo: {
                    x: obsImgRect[sideX],
                    y: obsImgRect.bottom
                }
            }
        }

        // User is either top or bottom of obstacle
        if (sideY) {
            // Check lines that go horizontally
            lineX = {
                ptOne: {
                    x: obsImgRect.left,
                    y: obsImgRect[sideY]
                },
                ptTwo: {
                    x: obsImgRect.right,
                    y: obsImgRect[sideY]
                }
            }
        }
        
        // Looking out for an intersection for two sides of the obstacle:
        // If user is at a given distance, only has two sides of the obstacle when choosing
        const intersectionX = doIntersect(charLine, lineX)
        const intersectionY = doIntersect(charLine, lineY)

        if (intersectionX.point) {
            let y = (charRect.height / 100)
            if (sideY === 'top') y = -(charRect.height) - 10

            setCharPos({
                ...intersectionX.point,
                y: intersectionX.point.y + y
            })
        } else if (intersectionY.point) {
            let x = (charRect.width / 100)
            if (sideX === 'left') x *= -charRect.width - 30

            setCharPos({
                ...intersectionY.point,
                x: intersectionY.point.x + x
            })
        }
    },
    // On init
    setObstacle: (obstacle) => set({ obstacle }),
    setObsImg: (obsImg) => set({ obsImg })
}))

export default useObstacle