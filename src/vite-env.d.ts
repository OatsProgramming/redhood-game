/// <reference types="vite/client" />

type AnimNames = 'stand' | 'walk' | 'run' | 'jump'

type Position = { x: number, y: number }

type CharacterState = {
    character: HTMLDivElement | null,
    animation: AnimNames,
    move: Position,
    isGoing: boolean,
    timerId: number | null
}

type CharacterAction = {
    changeAnimation: (e: KeyboardEvent) => void,
    toStand: (e: KeyboardEvent) => void,
    goHere: (e: PointerEvent) => void,
    setCharacter: (el: HTMLDivElement | null) => void,
    setAnimation: (action: AnimNames) => void,
    setInitPos: (init: Position) => void,
    getCurrentPos: (el: HTMLDivElement) => Position
}