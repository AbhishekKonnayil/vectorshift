import { useMemo, useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { createNode } from './components/nodeFactory';
import { extractVariables } from './utils/extractVariables';
import { useStore } from '../store';

const GenericTextNode = createNode({
  title: 'Text',
});

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textValue = data?.text ?? '';
  const textareaRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 220, height: 80 });

  const variables = useMemo(() => extractVariables(textValue), [textValue]);

  // Handle resizing based on content
  const adjustSize = () => {
    const el = textareaRef.current;
    if (!el) return;

    // Reset height to get true scrollHeight
    el.style.height = 'auto';
    el.style.width = 'auto';

    const newHeight = Math.max(80, el.scrollHeight);
    const newWidth = Math.max(220, el.scrollWidth);

    setDimensions({ width: newWidth, height: newHeight });
    el.style.height = `${newHeight}px`;
    el.style.width = `${newWidth}px`;
  };

  useEffect(() => {
    adjustSize();
  }, [textValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    updateNodeField(id, 'text', value);
    updateNodeField(id, 'variables', extractVariables(value));
  };

  const handles = useMemo(() => [
    ...variables.map((v, i) => ({
      type: 'target',
      position: Position.Left,
      id: v,
      style: {
        top: `${(i + 1) * (100 / (variables.length + 1))}%`,
      },
    })),
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
    },
  ], [variables]);

  return (
    <GenericTextNode id={id} data={data} handles={handles}>
      <div className="flex flex-col gap-1">
        <textarea
          ref={textareaRef}
          value={textValue}
          onChange={handleChange}
          placeholder="Enter text with {{variables}}"
          className="nodrag nopan min-h-[80px] min-w-[200px] resize-none overflow-hidden rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm outline-none transition-all duration-75 focus:ring-1 focus:ring-violet-300"
          style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
        />

        {variables.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
            {variables.map((v) => (
              <span key={v} className="bg-violet-100 text-violet-700 font-medium px-2 py-0.5 rounded-full border border-violet-200">
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </GenericTextNode>
  );
};