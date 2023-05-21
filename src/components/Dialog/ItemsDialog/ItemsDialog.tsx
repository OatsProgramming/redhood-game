import { ForwardedRef, forwardRef } from "react";
import './itemsDialog.css'
import ItemCard from "../../ItemCard/ItemCard";

const ItemsDialog = forwardRef(function (
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
                    <ItemCard key={item.name} item={item} />
                ))}
            </ul>
            <button className="closeBtn" onClick={handleModal}>
                Close
            </button>
        </dialog>
    )
})

export default ItemsDialog