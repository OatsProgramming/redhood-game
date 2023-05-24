import { create } from "zustand";

type CharStatsStore = {
    hp: number,
    debuffSet: Set<string>,
    coins: number,
    updateHP: (toBeAdded: number) => void,
    updateCoins: (toBeAdded: number) => void,
    updateDebuff: (debuff: string, toBeAdded?: true) => void,
}

const useCharStats = create<CharStatsStore>()((set) => ({
    hp: 100,
    debuffSet: new Set(),
    coins: 50_000,
    updateHP: (toBeAdded) => set(state => {
        const newHP = state.hp + toBeAdded

        // If inflicting damage and hp in the negatives
        if (newHP < 0) return { hp: 0 }
        return { hp: newHP }
    }),
    // Shouldnt have to worry about it going to the negatives
    updateCoins: (toBeAdded) => set(state => ({ coins: state.coins + toBeAdded })),
    updateDebuff: (debuff, toBeAdded) => set(state => {
        const prevSet = state.debuffSet
        const newSet = new Set<string>(prevSet)

        if (toBeAdded) newSet.add(debuff)
        else newSet.delete(debuff)
        
        return { debuffSet: newSet }
    })
}))

export default useCharStats