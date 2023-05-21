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

type Line = {
    ptOne: Position,
    ptTwo: Position
}

type Intersect = {
    type: 'none' | 'intersecting' | 'parallel' | 'colinear',
    point?: Position
}

type ReqCSS = 'top' | 'left'
type RequiredStyles = Record<ReqCSS, string | number>  & {
    scale?: string
}

type Item = {
    name: string,
    description: string,
    imgUrl: string,
    price: number,
  }
  