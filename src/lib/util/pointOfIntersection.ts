export default function pointOfIntersection(lineOne: Line, lineTwo: Line): Position | void {
    const {
        ptOne: {
            x: x1,
            y: y1
        },
        ptTwo: {
            x: x2,
            y: y2
        }
    } = lineOne
    const {
        ptOne: {
            x: x3,
            y: y3
        },
        ptTwo: {
            x: x4,
            y: y4
        }
    } = lineTwo

    const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (det === 0) {
        console.log('no')
        return
    }
    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / det
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / det
    return { x, y }
}