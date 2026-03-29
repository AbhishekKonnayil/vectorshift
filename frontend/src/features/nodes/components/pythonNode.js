import { Position } from 'reactflow';
import { createNode } from './nodeFactory';

export const PythonNode = createNode({
  title: 'Python',
  handles: [
    { type: 'target', position: Position.Left, id: 'input', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'output', style: { top: '50%' } },
  ],
  description: 'Execute custom Python script.'
});
