import { memo, useRef } from 'react'
import './itemCard.css'
import DetailsDialog from '../Dialog/DetailsDialog/DetailsDialog'
import isEqual from 'lodash/isEqual'

const ItemCard = memo(function ({ item, squareImg, rectImg}: {
    item: Item,
    squareImg: string,
    rectImg: string,
}) {
    return (
        <li className='itemCard' style={{
            backgroundImage: `url(${squareImg})`
        }}>
            <img
                loading='lazy'
                src={item.imgUrl}
                width={100}
            />
            <div>
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>
            <DetailsDialog item={item} rectImg={rectImg}/>
        </li>
    )
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))

export default ItemCard