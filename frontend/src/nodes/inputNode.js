import { Position } from 'reactflow';
import { BaseNode } from './components/baseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const currName = data?.inputName || '';
  const inputType = data?.inputType || 'Text';

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`,
        },
      ]}
    >
      <input
        value={currName}
        onChange={(e) =>
          updateNodeField(id, 'inputName', e.target.value)
        }
        placeholder="Input name"
        className="w-full rounded bg-violet-100 px-2 py-1"
      />

      <select
        value={inputType}
        onChange={(e) =>
          updateNodeField(id, 'inputType', e.target.value)
        }
        className="w-full rounded border px-2 py-1"
      >
        <option>Text</option>
        <option>File</option>
      </select>
    </BaseNode>
  );
};