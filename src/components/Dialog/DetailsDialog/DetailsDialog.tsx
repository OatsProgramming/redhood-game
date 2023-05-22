import { RefObject, useState, ChangeEvent, PointerEvent, forwardRef, ForwardedRef, useEffect, useCallback, memo } from "react";
import './detailsDialog.css'
import useInventory from "../../../lib/zustand/inventoryStore";

const DetailsDialog = forwardRef(function (
    props: { item: Item }, 
    ref: ForwardedRef<HTMLDialogElement>
) {
    const { item } = props
    const dialog = (ref as RefObject<HTMLDialogElement>).current

    const [amnt, setAmnt] = useState(0)
    // const { inventory, addItem } = useInventory()

    // Renders x18 per Obstacle
    console.log('asd')
    // Drag
    const handleChange = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        const input = e.target
        console.log(input.value)
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

    return (
        <dialog className='details' ref={ref}>
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
                        <button onPointerDown={() => dialog?.close()}>
                            Cancel
                        </button>
                        <button onPointerDown={() => {
                            // addItem({ ...item, amnt })
                            // alert(inventory)
                        }}>
                            Confirm 
                        </button>
                    </div>
                </div>
            </dialog>
    )
})

export default DetailsDialog