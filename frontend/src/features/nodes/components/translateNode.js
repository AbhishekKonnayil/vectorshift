import { Position } from 'reactflow';
import { createNode } from './nodeFactory';

export const TranslateNode = createNode({
  title: 'Translate',
  handles: [
    { type: 'target', position: Position.Left, id: 'text', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'translated', style: { top: '50%' } },
  ],
  description: 'Translate text from one language to another.'
});
