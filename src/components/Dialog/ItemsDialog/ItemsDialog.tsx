import { memo, useCallback, useEffect, useRef, useState } from "react";
import './itemsDialog.css'
import ItemCard from "../../ItemCard/ItemCard";
import useCharacter from "../../../lib/zustand/characterStore";

export default function ItemsDialog({ items, isCharNear }: {
    items: Item[],
    isCharNear: boolean
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { character, setCharacter } = useCharacter()
    const [charHolder, setCharHolder] = useState<HTMLDivElement | null>(null)

    const handleModal = useCallback(function () {
        const dialog = dialogRef.current
        if (!dialog || !isCharNear) return

        if (dialog.open) {
            // Reconnect character to allow movement
            setCharacter(charHolder)
            setCharHolder(null)
            dialog.close()
        } else {
            // Disconnect character to disable movement
            setCharHolder(character)
            setCharacter(null)
            dialog.showModal()
        }
    }, [dialogRef.current?.open, isCharNear])
    

    useEffect(() => {
        function interactModal(e: KeyboardEvent) {
            const dialog = dialogRef.current
            if (e.code !== 'KeyQ' || !dialog) return
            else if (isCharNear) handleModal()
        }

        window.addEventListener('keydown', interactModal)
        return () => {
            window.removeEventListener('keydown', interactModal)
        }
    }, [isCharNear])

    return (
        <dialog ref={dialogRef} className="itemsDialog">
            <ul>
                {items.map(item => (
                    <ItemCard key={item.name} item={item} />
                ))}
            </ul>
            <button className="closeBtn" onClick={handleModal}>
                Close
            </button>
        </dialog>
    )
}

