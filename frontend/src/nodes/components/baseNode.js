import { X } from 'lucide-react';
import { Handle } from 'reactflow';
import { useStore } from '../../store';

export const BaseNode = ({ id, title, handles = [], children }) => {
    const removeNode = useStore((state) => state.removeNode);

    return (
        <div className="min-w-[200px] rounded-xl border border-violet-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between rounded-t-xl bg-violet-100 px-3 py-2">
                <span className="text-sm font-semibold text-violet-900">{title}</span>

                {id && (
                    <button
                        onClick={() => removeNode(id)}
                        className="nodrag nopan flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:bg-violet-200"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="space-y-2 p-3 text-sm">
                {children}
            </div>

            {/* Handles */}
            {handles.map((handle, i) => (
                <Handle
                    key={i}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={handle.style}
                />
            ))}
        </div>
    );
};