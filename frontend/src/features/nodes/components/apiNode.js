import { Position } from 'reactflow';
import { createNode } from './nodeFactory';

export const ApiNode = createNode({
  title: 'API',
  handles: [
    { type: 'target', position: Position.Left, id: 'request', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'response', style: { top: '50%' } },
  ],
  description: 'Make an external API request.'
});
