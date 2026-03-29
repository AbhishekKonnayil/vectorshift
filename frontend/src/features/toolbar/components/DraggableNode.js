import {
  ArrowRight,
  Cpu,
  ArrowLeft,
  Type,
  Plus,
  Zap,
  Globe,
  Database,
  Mail,
  Code,
  Share2
} from 'lucide-react';

const NODE_ICONS = {
  customInput: ArrowRight,
  llm: Cpu,
  customOutput: ArrowLeft,
  text: Type,
  maths: Plus,
  physics: Zap,
  translate: Globe,
  database: Database,
  email: Mail,
  python: Code,
  api: Share2,
};

export const DraggableNode = ({ type, label }) => {
  const Icon = NODE_ICONS[type] || Plus;

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${type} group flex cursor-grab flex-col items-center justify-center gap-2 rounded-xl border border-violet-100 bg-white px-4 py-3 transition-all duration-200 hover:border-violet-300 hover:shadow-md active:cursor-grabbing active:scale-95`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-violet-700">{label}</span>
    </div>
  );
};
  