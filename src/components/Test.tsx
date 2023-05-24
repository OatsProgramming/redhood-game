import useCharStats from "../lib/zustand/charStatsStore";

export default function Test() {
    const { coins, hp } = useCharStats()
    return (
        <>
            <h1 style={{
                border: '5px solid green',
                color: 'black',
            }}>
                COINS: { coins }
            </h1>
            <h1 style={{
                border: '5px solid red',
                color: 'black',
            }}>
                HP: { hp }
            </h1>
        </>
    )
}