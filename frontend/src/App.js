import { PipelineToolbar } from './features/toolbar/components/PipelineToolbar';
import { PipelineUI } from './features/pipeline/components/PipelineUI';
import { SubmitButton } from './features/pipeline/components/SubmitButton';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
