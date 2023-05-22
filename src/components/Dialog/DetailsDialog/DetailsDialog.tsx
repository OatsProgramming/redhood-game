import { useState, ChangeEvent, PointerEvent, useCallback, useRef } from "react";
import './detailsDialog.css'
import useInventory from "../../../lib/zustand/inventoryStore";

export default function DetailsDialog ({ item }: {
    item: Item
}) {
    const [amnt, setAmnt] = useState(0)
    const { addItem, removeItem } = useInventory()
    const dialogRef = useRef<HTMLDialogElement>(null)

    // Drag
    const handleChange = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        const input = e.target
        setAmnt(Number(input.value))
    }, [])

    // Button
    const handleClick = useCallback(function (e: PointerEvent<HTMLButtonElement>) {
        const btn = e.target as HTMLButtonElement
        const value = Number(btn.textContent)
        setAmnt(state => {
            const newAmnt = state + value
            if (newAmnt < 0) return state
            return newAmnt
        })
    }, [])

    const handleRemoval = useCallback(function (e: PointerEvent<HTMLButtonElement>) {
        const btn = e.target as HTMLButtonElement
        const amnt = Number(btn.textContent)
        const inventoryItem: InventoryItem = {
            ...item,
            amnt
        }
        removeItem(inventoryItem)
    }, [])

    const handleModal = useCallback(function (){
        const dialog = dialogRef.current
        if (!dialog) return

        if (dialog.open) dialog.close()
        else dialog.showModal()
    }, [dialogRef.current])

    return (
        <>
            <button onPointerDown={handleModal}>
                Details
            </button>
            <dialog className='details' ref={dialogRef}>
                {/* Added detailsContainer: cant directly change display of dialog w/o it going haywire */}
                <div className='detailsContainer'>
                    <img
                        loading='lazy'
                        src={item.imgUrl}
                        width={100}
                        alt={item.name}
                    />
                    <div className='currentAmnt'>
                        Currently have:
                    </div>
                    <div className='description'>
                        {item.description}
                    </div>
                    <div className='drag'>
                        <p>Amount: {amnt}</p>
                        <p>Cost: {amnt * item.price}</p>
                        <label htmlFor="drag">Buy? (0 - 50)</label>
                        <input value={amnt} type="range" name="drag" min="0" max="50" onChange={handleChange} />
                        <div>
                            <button onPointerDown={handleClick}>
                                -1
                            </button>
                            <button onPointerDown={handleClick}>
                                +1
                            </button>
                        </div>
                    </div>
                    <div className='btnContainer'>
                        <button onPointerDown={handleModal}>
                            Cancel
                        </button>
                        <button onPointerDown={() => addItem({ ...item, amnt })}>
                            Confirm 
                        </button>
                        {/* Temporary: to test useInventory() */}
                        <button onPointerDown={handleRemoval}>
                            10
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

