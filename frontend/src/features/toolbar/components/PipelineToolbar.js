import { DraggableNode } from './DraggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="glass flex items-center gap-3 overflow-x-auto rounded-2xl p-4 no-scrollbar">
            <div className="mr-2 border-r border-violet-100 pr-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Nodes</span>
            </div>
            <div className="flex gap-3">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='maths' label='Maths' />
                <DraggableNode type='physics' label='Physics' />
                <DraggableNode type='translate' label='Translate' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='email' label='Email' />
                <DraggableNode type='python' label='Python' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};
