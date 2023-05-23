import { useState, ChangeEvent, PointerEvent, useCallback, useRef, useMemo } from "react";
import './detailsDialog.css'
import useInventory from "../../../lib/zustand/inventoryStore";

export default function DetailsDialog ({ item, rectImg, inInventory }: {
    item: Item,
    rectImg: string,
    inInventory: boolean
}) {
    const [amnt, setAmnt] = useState(0)
    const { inventory, addItem, removeItem } = useInventory()
    const dialogRef = useRef<HTMLDialogElement>(null)

    // useMemo since character movement rerenders components
    const itemInInventory = useMemo(function () {
        return inventory.find(inventoryItem => inventoryItem.name === item.name )
    }, [inventory])

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

    // Temporary
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
            {/* Removed button to make it more neat */}
            <div className="clickable" onPointerDown={handleModal} />
            <dialog className='details' ref={dialogRef} style={{ backgroundImage: `url(${rectImg})`}}>
                {/* Added detailsContainer: cant directly change display of dialog w/o it going haywire */}
                <div className='detailsContainer'>
                    <img
                        loading='lazy'
                        src={item.imgUrl}
                        width={100}
                        alt={item.name}
                    />
                    <div className='currentAmnt'>
                        In inventory: {itemInInventory ? itemInInventory.amnt : 0}
                    </div>
                    <div className='description'>
                        {item.description}
                    </div>
                    <div className='drag'>
                        <div>Amount: {amnt}</div>
                        <div>Cost: {amnt * item.price}</div>
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

