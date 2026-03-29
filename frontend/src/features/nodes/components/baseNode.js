import { X } from 'lucide-react';
import { Handle } from 'reactflow';
import { useStore } from '../../pipeline/store/useStore';

export const BaseNode = ({ id, title, handles = [], children }) => {
    const removeNode = useStore((state) => state.removeNode);

    return (
        <div className="group relative min-w-[220px] rounded-2xl border border-violet-100 bg-white p-0 shadow-lg shadow-violet-100/50 transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-200/60">
            
            {/* Glass effect behind node */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-200 to-indigo-200 opacity-0 blur transition duration-300 group-hover:opacity-20"></div>

            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50/50 to-white px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"></div>
                        <span className="text-sm font-bold tracking-wide text-slate-700">{title}</span>
                    </div>

                    {id && (
                        <button
                            onClick={() => removeNode(id)}
                            className="nodrag nopan flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="text-xs text-slate-600 transition-colors group-hover:text-slate-900">
                        {children}
                    </div>
                </div>
            </div>

            {/* Handles */}
            {handles.map((handle, i) => (
                <Handle
                    key={i}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={{
                        ...handle.style,
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#fff',
                        border: `2px solid ${handle.type === 'source' ? '#8b5cf6' : '#6366f1'}`,
                        boxShadow: '0 0 4px rgba(0,0,0,0.1)'
                    }}
                    className="transition-all duration-200 hover:!scale-150 hover:!border-violet-600 active:!bg-violet-600"
                />
            ))}
        </div>
    );
};