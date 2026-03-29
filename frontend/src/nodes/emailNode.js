import { Position } from 'reactflow';
import { createNode } from './components/nodeFactory';

export const EmailNode = createNode({
  title: 'Email',
  handles: [
    { type: 'target', position: Position.Left, id: 'recipient', style: { top: '25%' } },
    { type: 'target', position: Position.Left, id: 'body', style: { top: '75%' } },
    { type: 'source', position: Position.Right, id: 'status', style: { top: '50%' } },
  ],
  description: 'Send an email to a recipient.'
});
