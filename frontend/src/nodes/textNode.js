import { useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './components/baseNode';
import { extractVariables } from './utils/extractVariables';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textValue = data?.text ?? '';

  const variables = useMemo(() => extractVariables(textValue), [textValue]);

  const handleChange = (event) => {
    const el = event.target;

    // auto resize
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';

    const value = el.value;

    updateNodeField(id, 'text', value);
    updateNodeField(id, 'variables', extractVariables(value));
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[
        ...variables.map((v, i) => ({
          type: 'target',
          position: Position.Left,
          id: `${id}-${v}`,
          style: {
            top: `${(i + 1) * (100 / (variables.length + 1))}%`,
          },
        })),
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    >
      <textarea
        value={textValue}
        onChange={handleChange}
        placeholder="Enter text with {{variables}}"
        className="nodrag nopan w-full min-h-[80px] resize-none rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200"
      />

      {/* Variable preview */}
      {variables.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 text-xs">
          {variables.map((v) => (
            <span key={v} className="bg-violet-100 px-2 py-1 rounded">
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};