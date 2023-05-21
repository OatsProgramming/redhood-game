import { ForwardedRef, forwardRef } from "react";
import './dialog.css'
import FoodCard from "../ItemCard/ItemCard";

const Dialog = forwardRef(function (
    props: {
        items: Item[]
        handleModal: () => void,
    },
    ref: ForwardedRef<HTMLDialogElement>
) {
    const { handleModal, items } = props
    return (
        <dialog ref={ref} className="itemsDialog">
            <ul>
                {items.map(item => (
                    <FoodCard key={item.name} item={item} />
                ))}
            </ul>
            <button className="closeBtn" onClick={handleModal}>
                Close
            </button>
        </dialog>
    )
})

export default Dialog