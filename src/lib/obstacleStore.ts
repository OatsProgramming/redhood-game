import { create } from "zustand";

const useObstacle = create<ObstacleState & ObstacleAction>()((set, get) => ({
    obstacle: null,
    collidedSide: 'left',
    checkCollision: (char, setCharPos, getCurrentPos) => {
        const charRect = char.getBoundingClientRect()
        const obsRect = get().obstacle?.getBoundingClientRect()!
        const collidedSide = get().collidedSide
        const currentCharPos = getCurrentPos()

        // Before collision detection, check which side the character was on
        // Tried during and after collision: does not work whatsoever. DO NOT ATTEMPT

        // Y-Axis
        if (charRect.bottom < obsRect.top) {
            collidedSide !== 'top' && set({ collidedSide: 'top' })
        } else if (charRect.top > obsRect.bottom) {
            collidedSide !== 'bottom' && set({ collidedSide: 'bottom' })

        // X-Axis
        } else if (charRect.right < obsRect.left) {
            collidedSide !== 'left' && set({ collidedSide: 'left' })
        } else if (charRect.left > obsRect.right) {
            collidedSide !== 'right' && set({ collidedSide: 'right' })
        }

        // Collision detection
        if (charRect.left < obsRect.right &&
            charRect.right > obsRect.left &&
            charRect.top < obsRect.bottom &&
            charRect.bottom > obsRect.top) {
            
            // Just bounce back user
            switch(collidedSide) {
                case 'top': {
                    setCharPos({ 
                        ...currentCharPos,
                        y: currentCharPos.y - 10
                    })
                    break;
                }
                case 'bottom': {
                    setCharPos({ 
                        ...currentCharPos,
                        y: currentCharPos.y + 10
                    })
                    break;
                }
                case 'left': {
                    setCharPos({ 
                        ...currentCharPos,
                        x: currentCharPos.x - 10
                    })
                    break;
                }
                case 'right': {
                    setCharPos({ 
                        ...currentCharPos,
                        x: currentCharPos.x + 10
                    })
                    break;
                }
            }
        }
    },
    // On init
    setObstacle: (obstacle) => set({ obstacle })
}))

export default useObstacle