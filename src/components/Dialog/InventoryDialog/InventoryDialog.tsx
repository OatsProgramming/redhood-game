import { useEffect, useRef } from "react";
import './inventoryDialog.css'
import useInventory from "../../../lib/zustand/inventoryStore";
import toggleModal from "../../../lib/util/toggleDialog";
import useCharacter from "../../../lib/zustand/characterStore";

export default function InventoryDialog() {
    const { inventory } = useInventory()
    const { character, setCharacter } = useCharacter()
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        function handleModal(e: KeyboardEvent) {
            if (e.code !== 'KeyE') return
            toggleModal(dialogRef, character, setCharacter)
        }

        window.addEventListener('keydown', handleModal)
        return () => window.removeEventListener('keydown', handleModal)
    }, [dialogRef.current])

    return (
        <dialog className="inventoryDialog" ref={dialogRef}>
            <div className="icons">
                <img className="armor"
                    src="https://i.imgur.com/aQW9JLJ.png"
                />
                <img className="ingestible"
                    src="https://i.imgur.com/tCMu33t.png"
                />
                <img className="gold"
                    src="https://i.imgur.com/11lpVgs.png"
                />
                <img className="bone"
                    src="https://i.imgur.com/qLY7kv1.png"
                />
            </div>
        </dialog>
    )
}

