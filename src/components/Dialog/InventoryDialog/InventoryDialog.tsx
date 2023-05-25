import { useEffect, useRef, useState, PointerEvent, useCallback, useMemo } from "react";
import './inventoryDialog.css'
import useInventory from "../../../lib/zustand/inventoryStore";
import toggleModal from "../../../lib/util/toggleDialog";
import useCharMove from "../../../lib/zustand/charMoveStore";
import ItemCard from "../../ItemCard/ItemCard";
import useCardType from "../../../lib/zustand/cardTypeStore";

export default function InventoryDialog() {
    const { inventory } = useInventory()
    const { character, setCharacter } = useCharMove()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [category, setCategory] = useState<Category>('equipment')
    const { setInInventory } = useCardType()

    // useMemo since character movement rerenders components
    const showItems = useMemo(function () {
        return inventory.filter(item => item.category === category)
    }, [category])

    const handleCategory = useCallback(function (e: PointerEvent) {
        const img = e.target as HTMLImageElement
        setCategory(img.className as Category)
    }, [])

    useEffect(() => {
        function handleModal(e: KeyboardEvent) {
            if (e.code !== 'KeyE') return
            toggleModal(dialogRef, character, setCharacter)
            setInInventory(dialogRef)
        }

        window.addEventListener('keydown', handleModal)
        return () => window.removeEventListener('keydown', handleModal)
    }, [dialogRef.current])

    return (
        <dialog className="inventoryDialog" ref={dialogRef}>
            <div className="icons">
                <img
                    onPointerDown={handleCategory}
                    className="armor"
                    src="https://i.imgur.com/aQW9JLJ.png"
                    loading="lazy"
                />
                <img
                    onPointerDown={handleCategory}
                    className="ingestible"
                    src="https://i.imgur.com/tCMu33t.png"
                    loading="lazy"
                />
                <img
                    onPointerDown={handleCategory}
                    className="quest"
                    src="https://i.imgur.com/11lpVgs.png"
                    loading="lazy"
                />
                <img
                    onPointerDown={handleCategory}
                    className="material"
                    src="https://i.imgur.com/qLY7kv1.png"
                    loading="lazy"
                />
            </div>
            <div className="items">
                {showItems.length > 0 ? (
                    showItems.map(item => (
                        <ItemCard
                            key={item.name}
                            item={item}
                            squareImg='https://i.imgur.com/vkHFpib.png'
                            rectImg="https://i.imgur.com/yhXHKa8.png"
                        />
                    ))
                ) : (
                    <div className="empty">
                        <h2>Seems empty...</h2>
                        <img
                            loading="eager"
                            alt="empty icon"
                            src="https://static.thenounproject.com/png/5702323-200.png"
                        />
                    </div>
                )}
            </div>
        </dialog>
    )
}

