"use client";

import ReactFlow, {
  Background,
  Node,
  Edge,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const baseNodeStyle = {
  padding: "6px 10px",
  borderRadius: "8px",
  fontSize: "10px",
  color: "#e5e7eb",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  width: 110,
  textAlign: "center" as const,
};

const nodes: Node[] = [
  {
    id: "l1",
    position: { x: 40, y: 40 },
    data: { label: "Task Input" },
    style: baseNodeStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "l2",
    position: { x: 40, y: 100 },
    data: { label: "Task Encoding" },
    style: baseNodeStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "l3",
    position: { x: 40, y: 160 },
    data: { label: "Multi-Head Attn" },
    style: {
      ...baseNodeStyle,
      boxShadow: "0 0 10px rgba(168,85,247,0.4)",
      border: "1px solid rgba(168,85,247,0.4)",
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "l4",
    position: { x: 40, y: 220 },
    data: { label: "Feed Forward" },
    style: baseNodeStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },

  {
    id: "r1",
    position: { x: 240, y: 80 },
    data: { label: "Task Output" },
    style: baseNodeStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "r2",
    position: { x: 240, y: 140 },
    data: { label: "Cross Attn" },
    style: {
      ...baseNodeStyle,
      boxShadow: "0 0 10px rgba(59,130,246,0.4)",
      border: "1px solid rgba(59,130,246,0.4)",
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "r3",
    position: { x: 240, y: 200 },
    data: { label: "Feed Backward" },
    style: baseNodeStyle,
  },
];

const edges: Edge[] = [
  { id: "e1", source: "l1", target: "l2", animated: true },
  { id: "e2", source: "l2", target: "l3", animated: true },
  { id: "e3", source: "l3", target: "l4", animated: true },

  { id: "e4", source: "r1", target: "r2", animated: true },
  { id: "e5", source: "r2", target: "r3", animated: true },

  {
    id: "bridge",
    source: "l3",
    target: "r2",
    animated: true,
    style: { stroke: "#a855f7" },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const TaskArchitecturePanel = () => {
  return (
    <div className="relative h-100 rounded-2xl border border-white/10 bg- shadow-[0_0_40px_rgba(99,102,241,0.08)] overflow-hidden">

      <div className="absolute top-4 left-6 text-xs tracking-widest text-white/40">
        TASK WORKFLOW
      </div>

      <div className="h-full pt-10 px-4">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          zoomOnScroll={false}
          panOnDrag={false}
          nodesDraggable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            gap={24}
            size={1}
            color="rgba(255,255,255,0.04)"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TaskArchitecturePanel;