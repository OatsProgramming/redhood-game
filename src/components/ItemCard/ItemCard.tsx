import { lazy, memo } from 'react'
import './itemCard.css'
import isEqual from 'lodash/isEqual'
import isInventoryItem, { itemCache } from '../../lib/util/isInventoryItem'
const DetailsDialog = lazy(() =>
    import('../Dialog/DetailsDialog/DetailsDialog')
)

const ItemCard = memo(function ({ item, squareImg, rectImg, inInventory }: {
    item: Item | InventoryItem,
    squareImg: string,
    rectImg: string,
    inInventory?: true
}) {

    return (
        <li className='itemCard' style={{
            backgroundImage: `url(${squareImg})`
        }}>
            <img
                src={item.imgUrl}
                width={100}
            />
            <div className='info'>
                <p>{item.name}</p>
                {
                    isInventoryItem(item, inInventory) ?
                    <p>Currently: {item.amnt}</p> : <p>Cost: {item.price}</p>
                }
            </div>
            <DetailsDialog item={item} rectImg={rectImg} inInventory={inInventory ?? false} />
        </li>
    )
}, (prevProps, nextProps) => {
    const { inInventory, item } = nextProps

    // Compare by amnt
    if (inInventory) {
        const prevAmnt = itemCache.get(item)
        const nextAmnt = (item as InventoryItem).amnt
        return prevAmnt === nextAmnt
    }

    // Otherwise compare by props
    return isEqual(prevProps, nextProps)
})

export default ItemCard