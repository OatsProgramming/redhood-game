import { ForwardedRef, forwardRef } from "react";
import './dialog.css'

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
                    <li key={item.name}>
                        {item.name}
                    </li>
                ))}
            </ul>
            <button className="closeBtn" onClick={handleModal}>
                Close
            </button>
        </dialog>
    )
})

export default Dialog