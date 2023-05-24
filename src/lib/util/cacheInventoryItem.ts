/**
 * Stores previous item.amnt . Used to compare with new item.amnt when rerendering
 */
export const itemCache = new WeakMap<InventoryItem | Item, number>()

/**
 *  To cache item.amnt if item is an InventoryItem.
 *  This is to help with ItemCard memoization.
 * @param item 
 * @param inInventory 
 * @returns 
 */

export default function cacheInventoryItem(item: InventoryItem) {
    if (itemCache.has(item)) itemCache.delete(item)
    itemCache.set(item, (item as InventoryItem).amnt)
}
