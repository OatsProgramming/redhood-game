/// <reference types="vite/client" />

type AnimNames = 'stand' | 'walk' | 'run' | 'jump'

type Position = { x: number, y: number }

type CharacterState = {
    character: HTMLDivElement | null,
    animation: AnimNames,
    move: Position,
    isGoing: boolean,
    firstTimer: number | null,
    secondTimer: number | null,
}

type CharacterAction = {
    changeAnimation: (e: KeyboardEvent) => void,
    toStand: (e: KeyboardEvent) => void,
    goHere: (e: PointerEvent) => void,
    setCharacter: (el: HTMLDivElement | null) => void,
    setAnimation: (action: AnimNames) => void,
    setCharPos: (pos: Position) => void,
    getCurrentPos: () => Position
}

type ObstacleState = {
    obstacle: HTMLDivElement | null,
    collidedSide: 'left' | 'right' | 'bottom' | 'top'
}

type ObstacleAction = {
    checkCollision: (
        char: HTMLDivElement, 
        setInitPos: (init: Position) => void, 
        getCurrentPos: () => Position
    ) => void,
    setObstacle: (obstacle: HTMLDivElement) => void,
}
