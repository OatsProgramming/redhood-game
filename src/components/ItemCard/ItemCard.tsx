import { lazy, memo } from 'react'
import './itemCard.css'
import isEqual from 'lodash/isEqual'
import cacheInventoryItem, { itemCache } from '../../lib/util/cacheInventoryItem'
const DetailsDialog = lazy(() =>
    import('../Dialog/DetailsDialog/DetailsDialog')
)

const ItemCard = memo(function ({ item, squareImg, rectImg, inInventory, isSelling }: {
    item: Item | InventoryItem,
    squareImg: string,
    rectImg: string,
    inInventory?: true,
    isSelling?: boolean,
}) {
    if (inInventory || isSelling) cacheInventoryItem(item as InventoryItem)

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
                    inInventory || isSelling ?
                    <p>Currently: {(item as InventoryItem).amnt || 0}</p> 
                    : <p>Cost: {item.price}</p>
                }
            </div>
            <DetailsDialog 
                item={item} 
                rectImg={rectImg} 
                inInventory={inInventory ?? false} 
                isSelling={isSelling ?? false}
            />
        </li>
    )
}, (prevProps, nextProps) => {
    const { inInventory, isSelling, item } = nextProps

    // Compare by amnt if dealing with user related items
    if (inInventory || isSelling) {
        const prevAmnt = itemCache.get(item)
        const nextAmnt = (item as InventoryItem).amnt
        return prevAmnt === nextAmnt
    }
    // Otherwise compare by props
    return prevProps.item.name === nextProps.item.name
})

export default ItemCard