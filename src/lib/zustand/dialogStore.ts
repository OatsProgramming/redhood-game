import { create } from "zustand";

// Use this to see if it's open or not
// Better to use the element rather than state: 
// Using state -> dependency added for useEffect -> can cause issues
const useDialog = create<DialogStore>()((set) => ({
    dialog: null,
    setDialog: (dialog) => set({ dialog })
}))

export default useDialog