// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store/useStore';
import { shallow } from 'zustand/shallow';
import { InputNode } from '../../nodes/components/inputNode';
import { LLMNode } from '../../nodes/components/llmNode';
import { OutputNode } from '../../nodes/components/outputNode';
import { TextNode } from '../../nodes/components/textNode';
import { MathsNode } from '../../nodes/components/mathsNode';
import { PhysicsNode } from '../../nodes/components/physicsNode';
import { TranslateNode } from '../../nodes/components/translateNode';
import { DatabaseNode } from '../../nodes/components/databaseNode';
import { EmailNode } from '../../nodes/components/emailNode';
import { PythonNode } from '../../nodes/components/pythonNode';
import { ApiNode } from '../../nodes/components/apiNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  maths: MathsNode,
  physics: PhysicsNode,
  translate: TranslateNode,
  database: DatabaseNode,
  email: EmailNode,
  python: PythonNode,
  api: ApiNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
            <Background color="#c7d2fe" gap={gridSize} size={1} variant="dots" />
            <Controls className="bg-white border-violet-100 shadow-lg rounded-xl overflow-hidden" />
            <MiniMap
              nodeStrokeColor="#8b5cf6"
              nodeColor="#f5f3ff"
              maskColor="rgba(255, 255, 255, 0.6)"
              className="rounded-xl border border-violet-100 shadow-lg overflow-hidden"
            />
            </ReactFlow>
        </div>
        </>
    )
}
