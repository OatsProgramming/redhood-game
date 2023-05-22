import { memo, useRef } from 'react'
import './itemCard.css'
import DetailsDialog from '../Dialog/DetailsDialog/DetailsDialog'

const ItemCard = memo(function ({ item }: {
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
            <DetailsDialog 
                item={item}
                ref={dialogRef}
            />
        </li>
    )
})

export default ItemCard