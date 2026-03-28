from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodePayload(BaseModel):
    id: str
    type: str | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class EdgePayload(BaseModel):
    source: str
    target: str


class PipelineData(BaseModel):
    nodes: list[NodePayload] = Field(default_factory=list)
    edges: list[EdgePayload] = Field(default_factory=list)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    graph = {node.id: [] for node in data.nodes}

    for edge in data.edges:
        graph.setdefault(edge.source, []).append(edge.target)
        graph.setdefault(edge.target, [])

    visited = set()
    stack = set()

    def dfs(node_id: str) -> bool:
        if node_id in stack:
            return False

        if node_id in visited:
            return True

        visited.add(node_id)
        stack.add(node_id)

        for neighbor in graph.get(node_id, []):
            if not dfs(neighbor):
                return False

        stack.remove(node_id)
        return True

    is_dag = all(dfs(node_id) for node_id in graph)

    return {
        "num_nodes": len(data.nodes),
        "num_edges": len(data.edges),
        "is_dag": is_dag,
    }
