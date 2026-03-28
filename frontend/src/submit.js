import { useStore } from './store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const buildPipelinePayload = (nodes, edges) => ({
  nodes: nodes.map((node) => ({
    id: node.id,
    type: node.type,
    data: node.data ?? {},
  })),
  edges: edges.map((edge) => ({
    source: edge.source,
    target: edge.target,
  })),
});

const parseResponseBody = async (response) => {
  const responseText = await response.text();

  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { detail: responseText };
  }
};

const getErrorMessage = (response, payload) => {
  if (typeof payload?.detail === 'string' && payload.detail.includes('Cannot POST /pipelines/parse')) {
    return 'The React dev server did not proxy this request to FastAPI. Restart `npm start` after the proxy change and make sure the backend is running on port 8000.';
  }

  if (Array.isArray(payload?.detail)) {
    return payload.detail
      .map((detail) => detail.msg || JSON.stringify(detail))
      .join(', ');
  }

  if (typeof payload?.detail === 'string') {
    return payload.detail;
  }

  return `Request failed with status ${response.status}.`;
};

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    const payload = buildPipelinePayload(nodes, edges);

    try {
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const responseBody = await parseResponseBody(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(response, responseBody));
      }

      alert(`
Nodes: ${responseBody.num_nodes}
Edges: ${responseBody.num_edges}
Is DAG: ${responseBody.is_dag}
      `);
    } catch (error) {
      console.error('Pipeline submit failed:', error);
      if (error instanceof TypeError) {
        alert(
          'Could not reach the backend API. Make sure the FastAPI server is running, then restart the frontend dev server if you just changed the proxy.',
        );
        return;
      }

      alert(error.message || 'Something went wrong while submitting the pipeline.');
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded bg-violet-500 px-4 py-2 text-white hover:bg-violet-600"
      >
        Submit Pipeline
      </button>
    </div>
  );
};
