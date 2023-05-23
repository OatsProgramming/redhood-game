/// <reference types="vite/client" />
type AnimNames = 'stand' | 'walk' | 'run' | 'jump'

type Position = { x: number, y: number }

type CharMoveState = {
    character: HTMLDivElement | null,
    animation: AnimNames,
    move: Position,
    isGoing: boolean,
    firstTimer: number | null,
    secondTimer: number | null,
}

type CharMoveAction = {
    moveByKey: (e: KeyboardEvent) => void,
    toStand: (e: KeyboardEvent) => void,
    moveByPointer: (e: PointerEvent) => void,
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
type RequiredStyles = Record<ReqCSS, string | number> & {
    scale?: string
}

type Category = 'ingestible' | 'armor' | 'material' | 'quest'

type Item = {
    name: string,
    description: string,
    imgUrl: string,
    price: number,
    category: Category,
}

type InventoryItem = Item & {
    amnt: number
}

type InventoryStore = {
    inventory: InventoryItem[],
    addItem: (item: InventoryItem) => void,
    removeItem: (item: InventoryItem) => void
}