import { CSSProperties } from "react";
import useCharStats from "../../lib/zustand/charStatsStore";
import './statsDisplay.css'

export default function StatsDisplay() {
    const { hp, maxHP, debuffSet } = useCharStats()
    const hpPercentage = (hp / maxHP) * 100
    const debuffList: string[] = []
    debuffSet.forEach(val => debuffList.push(val))

    return (
        <div className="stats">
            <div
                className="hp"
                style={{
                    "--hpPercentage": `${hpPercentage}%`
                } as CSSProperties}
            >
                <span>HP: {hp} / {maxHP}</span>
            </div>
            <div className="debuffs">
                Debuffs:
                {debuffList.map(debuff => (
                    <span key={debuff}>
                        {debuff}
                    </span>
                ))}
            </div>
        </div>
    )
}