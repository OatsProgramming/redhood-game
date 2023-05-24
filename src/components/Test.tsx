import useCharStats from "../lib/zustand/charStatsStore";

export default function Test() {
    const { debuffSet, updateDebuff } = useCharStats()
    return (
        <>
            <h1 style={{
                border: '10px solid red',
                width: '100vw',
                color: 'black',
            }}>
                {JSON.stringify([...debuffSet])}
            </h1>
            <button onClick={() => updateDebuff('Hello', true)}>
                hello add
            </button>
            <button onClick={() => updateDebuff('Hello')}>
                hello sub
            </button>
            <button onClick={() => updateDebuff('world', true)}>
                world add
            </button>
            <button onClick={() => updateDebuff('world')}>
                world sub
            </button>
            <button onClick={() => updateDebuff('goodbye', true)}>
                goodbye add
            </button>
            <button onClick={() => updateDebuff('goodbye')}>
                goodbye sub
            </button>
        </>
    )
}