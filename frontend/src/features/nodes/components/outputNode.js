import { Position } from 'reactflow';
import { createNode } from './nodeFactory';
import { useStore } from '../../pipeline/store/useStore';

const GenericOutputNode = createNode({
  title: 'Output',
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'value',
    },
  ],
});

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const outputName = data?.outputName || '';
  const outputType = data?.outputType || 'Text';

  return (
    <GenericOutputNode id={id} data={data}>
      <div className="flex flex-col gap-2">
        <input
          value={outputName}
          onChange={(e) => updateNodeField(id, 'outputName', e.target.value)}
          placeholder="Output name"
          className="w-full rounded bg-violet-50 border border-violet-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-violet-300"
        />

        <select
          value={outputType}
          onChange={(e) => updateNodeField(id, 'outputType', e.target.value)}
          className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-violet-300"
        >
          <option>Text</option>
          <option>File</option>
        </select>
      </div>
    </GenericOutputNode>
  );
};