import {
    checkIntersection,
    colinearPointWithinSegment
  } from 'line-intersect';

export default function intersect2DSegs(charLine: Line, line: Line | null) {
    if (!line) return { type: 'none' }
    const { ptOne: { x: x1, y: y1 }, ptTwo: { x: x2, y: y2}} = charLine
    const { ptOne: { x: x3, y: y3 }, ptTwo: { x: x4, y: y4}} = line

    const bool = checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
    return bool
}