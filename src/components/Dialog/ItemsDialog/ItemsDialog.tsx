import { useEffect, useRef } from "react";
import './itemsDialog.css'
import ItemCard from "../../ItemCard/ItemCard";
import charMove from "../../../lib/zustand/charMoveStore";
import toggleDialog from "../../../lib/util/toggleDialog";

export default function ItemsDialog({ items, isCharNear }: {
    items: Item[],
    isCharNear: boolean
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { character, setCharacter } = charMove()

    useEffect(() => {
        function interactModal(e: KeyboardEvent) {
            const dialog = dialogRef.current
            if (e.code !== 'KeyQ' || !dialog || !isCharNear) return
            toggleDialog(dialogRef, character, setCharacter)
        }

        window.addEventListener('keydown', interactModal)
        return () => {
            window.removeEventListener('keydown', interactModal)
        }
    }, [dialogRef.current?.open, isCharNear])

    return (
        <dialog ref={dialogRef} className="itemsDialog">
            <ul>
                {items.map(item => (
                    <ItemCard
                        key={item.name}
                        item={item}
                        squareImg="https://i.imgur.com/zpWAtja.png"
                        rectImg="'https://i.imgur.com/TTSJ7yA.png'"
                    />
                ))}
            </ul>
            <button className="closeBtn" onClick={() => toggleDialog(dialogRef, character, setCharacter)}>
                Close
            </button>
        </dialog>
    )
}

