import { Position } from 'reactflow';
import { createNode } from './nodeFactory';

export const DatabaseNode = createNode({
  title: 'Database',
  handles: [
    { type: 'target', position: Position.Left, id: 'query', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'result', style: { top: '50%' } },
  ],
  description: 'Query a database and return results.'
});
