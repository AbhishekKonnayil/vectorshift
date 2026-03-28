import { Position } from 'reactflow';
import { BaseNode } from './components/baseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const outputName = data?.outputName || '';
  const outputType = data?.outputType || 'Text';

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    >
      {/* Name Input */}
      <input
        value={outputName}
        onChange={(e) =>
          updateNodeField(id, 'outputName', e.target.value)
        }
        placeholder="Output name"
        className="w-full rounded bg-violet-100 px-2 py-1 outline-none focus:ring-2 focus:ring-violet-200"
      />

      {/* Type Select */}
      <select
        value={outputType}
        onChange={(e) =>
          updateNodeField(id, 'outputType', e.target.value)
        }
        className="w-full rounded border border-violet-200 px-2 py-1 outline-none focus:ring-2 focus:ring-violet-200"
      >
        <option>Text</option>
        <option>File</option>
      </select>
    </BaseNode>
  );
};