import { Position } from 'reactflow';
import { createNode } from './components/nodeFactory';

export const MathsNode = createNode({
    title: 'Maths',
    handles: [
        {
            type: 'target',
            position: Position.Left,
            id: 'system',
            style: { top: `${100 / 3}%` },
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'prompt',
            style: { top: `${200 / 3}%` },
        },
        {
            type: 'source',
            position: Position.Right,
            id: 'response',
        },
    ],
    description: 'This is Maths.',
});
