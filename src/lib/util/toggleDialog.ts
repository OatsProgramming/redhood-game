import { RefObject } from "react"

const cache = new Map()

/**
 * Toggles desired dialog and handles (dis/re)connection of character
 * to deal with movement
 * 
 * @param dialogRef 
 * @param character 
 * @param setCharacter 
 * @returns 
 */

export default function toggleDialog(
    dialogRef: RefObject<HTMLDialogElement>, 
    character: CharacterState['character'],
    setCharacter: CharacterAction['setCharacter'],
) {
    const dialog = dialogRef.current
    if (!dialog) return

    if (dialog.open) {
        // Reconnect character to allow movement
        const char = cache.get('current')
        setCharacter(char)
        cache.delete('current')

        dialog.close()
    } else {
        // Disconnect character to disable movement
        cache.set('current', character)
        setCharacter(null)

        dialog.showModal()
    }
    
}
