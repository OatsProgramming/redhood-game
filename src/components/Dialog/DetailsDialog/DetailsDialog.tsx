import { useState, ChangeEvent, PointerEvent, useCallback, useRef, useMemo } from "react";
import './detailsDialog.css'
import useInventory from "../../../lib/zustand/inventoryStore";
import useCharStats from "../../../lib/zustand/charStatsStore";

export default function DetailsDialog({ item, rectImg, inInventory, isSelling }: {
    item: Item,
    rectImg: string,
    // To determine if dealing with InventoryItem or Item
    inInventory: boolean,
    isSelling: boolean
}) {
    const [amnt, setAmnt] = useState(0)
    const { coins, updateCoins, updateHP } = useCharStats()
    const { inventory, addItem, removeItem } = useInventory()
    const dialogRef = useRef<HTMLDialogElement>(null)

    const resaleRate = 0.75
    const itemCoins = isSelling ?
        // Round it to keep currency system simple (account for precision loss)
        Math.round(Math.round((item.price * resaleRate) * 10) / 10)
        : item.price
    
    // useMemo since character movement rerenders components
    const itemInInventory = useMemo(() => {
        return inventory.find(inventoryItem => inventoryItem.name === item.name)
    }, [inventory])

    // Determine if max will be based on user's inventory or user's current amnt of coins
    const dragMax = useMemo(() => {
        if (inInventory || isSelling) {
            return itemInInventory?.amnt ?? 0
        }
        // Account for possible precision loss
        let initDM = Math.round((coins / item.price) * 10) / 10
        return Math.round(initDM)
    }, [itemInInventory?.amnt, coins, isSelling, inInventory])
    
    // Drag
    const handleChange = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        const input = e.target
        setAmnt(Number(input.value))
    }, [dragMax])

    // Button
    const handleClick = useCallback(function (e: PointerEvent<HTMLButtonElement>) {
        // Limit is zero
        if (!dragMax) return

        const btn = e.target as HTMLButtonElement
        const value = Number(btn.textContent)
        const newAmnt = amnt + value

        // Make sure it doesnt go over or under the limit
        if (newAmnt < 0 || newAmnt > dragMax) return
        setAmnt(newAmnt)
    }, [dragMax, amnt])

    // Deal with whether user consumes or buys item
    const handleConfirm = useCallback(function () {
        const inventoryItem: InventoryItem = { ...item, amnt }

        // If dealing w/ InventoryItem type
        if (inInventory || isSelling) {
            if (!itemInInventory) return
            // If ingestible
            else if (inInventory && item.addHP) updateHP(amnt * item.addHP)
            // if selling
            else updateCoins(amnt * itemCoins)
            removeItem(inventoryItem)
        }

        // if dealing w/ Item type
        else {
            const cost = -(amnt * item.price)
            updateCoins(cost)
            addItem(inventoryItem)
        }

    }, [amnt, isSelling, inInventory])

    const handleModal = useCallback(function () {
        const dialog = dialogRef.current
        if (!dialog) return

        if (dialog.open) dialog.close()
        else dialog.showModal()
    }, [dialogRef.current])

    return (
        <>
            {/* Removed button to make it more neat */}
            <div className="clickable" onPointerDown={handleModal} />
            <dialog className='details' ref={dialogRef} style={{ backgroundImage: `url(${rectImg})` }}>
                {/* Added detailsContainer: cant directly change display of dialog w/o it going haywire */}
                <div className='detailsContainer'>
                    <img
                        loading='lazy'
                        src={item.imgUrl}
                        width={100}
                        alt={item.name}
                    />
                    <div className='currentAmnt'>
                        In inventory: {itemInInventory?.amnt ?? 0}
                    </div>
                    <div className='description'>
                        {item.description}
                    </div>
                    <div className='drag'>
                        <div>Amount: {amnt}</div>
                        {!inInventory &&
                            <div>
                                {isSelling ? 'Sell for' : 'Cost'}: {itemCoins}
                            </div>
                        }
                        {!inInventory && (
                            <label htmlFor="drag">
                                Max: {dragMax}
                            </label>
                        )}
                        <input
                            value={amnt}
                            type="range"
                            name="drag"
                            min="0"
                            max={dragMax}
                            onChange={handleChange}
                        />
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
                        <button onPointerDown={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

