import { useRef } from 'react'
import './itemCard.css'

export default function ItemCard({ item }: {
    item: Item
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    return (
        <li className='itemCard'>
            <img
                loading='lazy'
                src={item.imgUrl}
                width={100}
            />
            <div>
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>
            <button onClick={() => dialogRef.current?.showModal()}>
                Details
            </button>
            <dialog className='details' ref={dialogRef}>
                <div>
                    <img
                        loading='lazy'
                        src={item.imgUrl}
                        width={100}
                    />
                    <button onClick={() => dialogRef.current?.close()}>
                        Cancel
                    </button>
                    <button onClick={() => dialogRef.current?.close()}>
                        Confirm ('mod later')
                    </button>
                </div>
            </dialog>
        </li>
    )
}