import { useEffect, useRef } from "react";
import './inventoryDialog.css'

export default function InventoryDialog() {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current

        function handleModal(e: KeyboardEvent) {
            if (e.code !== 'KeyE' || !dialog) return

            if (dialog.open) dialog.close()
            else dialog.showModal()

        }

        window.addEventListener('keydown', handleModal)
        return () => window.removeEventListener('keydown', handleModal)
    }, [dialogRef.current])

    return (
        <dialog className="inventoryDialog" ref={dialogRef}>
            <div>
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

