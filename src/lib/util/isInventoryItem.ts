/**
 * Stores previous item.amnt . Used to compare with new item.amnt when rerendering
 */
export const itemCache = new Map<InventoryItem | Item, number>()

/**
 * To not only determine it's type, but to also cache item.amnt if inInventory.
 *  This is to help with ItemCard memoization.
 * @param item 
 * @param inInventory 
 * @returns 
 */

export default function isInventoryItem(item: Item | InventoryItem, inInventory?: true): item is InventoryItem {
    if (inInventory) {
        if (itemCache.has(item)) itemCache.delete(item)
        itemCache.set(item, (item as InventoryItem).amnt)
    }
    return inInventory ?? false
}
