import { Position } from 'reactflow';
import { createNode } from './nodeFactory';
import { useStore } from '../../pipeline/store/useStore';

const GenericInputNode = createNode({
  title: 'Input',
  handles: [
    {
      type: 'source',
      position: Position.Right,
      id: 'value',
    },
  ],
});

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const currName = data?.inputName || '';
  const inputType = data?.inputType || 'Text';

  return (
    <GenericInputNode id={id} data={data}>
      <div className="flex flex-col gap-2">
        <input
          value={currName}
          onChange={(e) => updateNodeField(id, 'inputName', e.target.value)}
          placeholder="Input name"
          className="w-full rounded bg-violet-50 border border-violet-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-violet-300"
        />

        <select
          value={inputType}
          onChange={(e) => updateNodeField(id, 'inputType', e.target.value)}
          className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-violet-300"
        >
          <option>Text</option>
          <option>File</option>
        </select>
      </div>
    </GenericInputNode>
  );
};