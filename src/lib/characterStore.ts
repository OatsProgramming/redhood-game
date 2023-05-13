import { create } from 'zustand'

const useCharacter = create<CharacterState & CharacterAction>()((set, get) => ({
    character: null,
    animation: 'stand',
    move: { x: 0, y: 0 },
    isGoing: false,
    // If user is using keys to interact
    changeAnimation: (e) => {
        const div = get().character!
        const animation = get().animation
        const isGoing = get().isGoing

        // Get position while transitioning (if goHere() called first)
        // use computed to get current pos (el.style will give end result rather in btwn)
        const computedDiv = getComputedStyle(div)
        const currentPos: Position = {
            x: parseInt(computedDiv.left),
            y: parseInt(computedDiv.top),
        }

        div.style.setProperty('--duration', '200ms')

        let moveX = 0
        let moveY = 0

        // if goHere() called first, stop that animation
        if (isGoing) set({ isGoing: false, move: currentPos })
        // Determine the speed
        if (e.key.includes('Arrow')) {
            if (e.shiftKey) {
                // Prevent shift highlighting
                e.preventDefault()
                animation !== 'run' && set({ animation: 'run' })
                moveX = moveY = 15
            } else {
                animation !== 'walk' && set({ animation: 'walk' })
                moveX = moveY = 5
            }
        } else if (e.code === 'Space') {
            animation !== 'jump' && set({ animation: 'jump' })
        } 

        // Determine the direction
        switch (e.key) {
            // Turn off moveY for x-axis only direction
            // Toggle moveX direction
            case 'ArrowLeft': {
                moveY *= 0
                div.classList.add('turnLeft')
                if (moveX > 0) moveX *= -1
                break;
            }
            case 'ArrowRight': {
                moveY *= 0
                div.classList.remove('turnLeft')
                if (moveX < 0) moveX *= -1
                break;
            }
            // Turn off moveX for y-axis only direction
            // Toggle moveY direction
            case 'ArrowUp': {
                moveX *= 0
                if (moveY > 0) moveY *= -1
                break;
            }
            case 'ArrowDown': {
                moveX *= 0
                if (moveY < 0) moveY *= -1
                break;
            }
        }
        set(state => {
            const prev = state.move
            let x = prev.x + moveX
            let y = prev.y + moveY

            // Add in-game boundaries
            // Using clientWidth / clientHeight just in case of scrollbar present
            if (0 >= prev.x) {
                x = prev.x + 10
            } else if (document.documentElement.clientWidth - 20 <= prev.x) {
                x = prev.x - 10
            }

            if (0 >= prev.y) {
                y = prev.y + 10
            } else if (document.documentElement.clientHeight - 50 <= prev.y) {
                y = prev.y - 10
            }

            return ({ move: { x, y } })
        })
    },
    // If user wants to tap the screen
    goHere: (e) => {
        const div = get().character!

        const currentPos = {
            x: parseInt(div.style.left),
            y: parseInt(div.style.top)
        }
        // Not pageX | pageY: only care about client window
        const newPos = {
            x: e.clientX - div.offsetWidth / 2,
            y: e.clientY - div.offsetHeight / 2,
        }

        // Get the distance btwn current position and place of interest
        const distance = Math.sqrt(
            Math.pow((currentPos.x - newPos.x), 2)
            + Math.pow((currentPos.y - newPos.y), 2)
        )

        // To deal with how long the transition will be
        const durationPointer = (Math.round(distance * 10))
        div.style.setProperty('--duration', durationPointer + 'ms')

        // Determine which way the character should face
        const direction = currentPos.x - newPos.x
        if (direction > 0) div.classList.add('turnLeft')
        else div.classList.remove('turnLeft')

        // Start transition
        set({ animation: 'run', move: newPos, isGoing: true })

        // Schedule a separate macrotask to let goHere() be considered finished
        // This will help with setStates
        setTimeout(() => {
            set({ animation: 'walk' })
            setTimeout(() => {
                set({ animation: 'stand', isGoing: false })
            }, (durationPointer * (1 / 3)))
        }, (durationPointer * (2 / 3)))
    },
    // Neutral animation
    toStand: (e) => {
        if (e.key.includes('Arrow')) set({ animation: 'stand' })
    },
    setCharacter: (el) => set({ character: el }),
    setAnimation: (action) => set({ animation: action }),
    setInitPos: (init) => set({ move: init })
}))

export default useCharacter