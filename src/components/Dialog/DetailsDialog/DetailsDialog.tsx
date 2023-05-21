import { RefObject, useState, ChangeEvent, PointerEvent, forwardRef, ForwardedRef, useEffect } from "react";
import './detailsDialog.css'

const DetailsDialog = forwardRef(function (
    props: { item: Item }, 
    ref: ForwardedRef<HTMLDialogElement>
) {
    const dialog = (ref as RefObject<HTMLDialogElement>).current

    const { item } = props
    const [amnt, setAmnt] = useState(0)

    // Drag
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target
        setAmnt(Number(input.value))
    }

    // Button
    function handleClick(e: PointerEvent<HTMLButtonElement>) {
        const btn = e.target as HTMLButtonElement
        const value = Number(btn.textContent)
        setAmnt(state => state + value)
    }

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
                        <button onPointerDown={() => dialog?.close()}>
                            Confirm ('mod later')
                        </button>
                    </div>
                </div>
            </dialog>
    )
})

export default DetailsDialog