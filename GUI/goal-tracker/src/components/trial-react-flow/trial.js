import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GoalNode } from '../goal-node/goal_node';
import './testFlow.js'
import { BigNodes, BigEdges } from './testFlow.js';
import { sameLvlPositioning } from './positioning';

const initialNodes = [
  { id: '1', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Life", goalState: "not-started" } },
  { id: '2', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-1", goalState: "completed" } },
  { id: '3', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-2", goalState: "in-progress" } },
  { id: '4', type: 'goalNode', position: { x: 600, y: 300 }, data: { title: "Goal-3", goalState: "terminated" } },
  { id: '5', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-4", goalState: "not-started" } },


];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },

];
const nodeTypes = { goalNode: GoalNode };



function Trial(props) {
  const [rfInstance, setRfInstance] = useState(null);
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log("Saving the Instance");
      console.log(flow)
      console.log(JSON.stringify(flow))
      localStorage.setItem("demo-flow", JSON.stringify(flow, null, 3));
    }
  }, [rfInstance]);

  const [nodes, setNodes, onNodesChange] = useNodesState(BigNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(BigEdges);
  // const { setViewport } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onClick = useCallback((event, node) => {console.log("element Clicked Params |", node); props.clickedNodeCallback(node)})
  function TestPositioningAlgo() {
    var data = JSON.parse(localStorage.getItem("demo-flow"));
    var dimensions = {
      "width": 250,
      "height": 250,
      "margin-w": 30,
      "margin-h": 60,
    }
    var flow = sameLvlPositioning(data, dimensions, [1]);

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      // setViewport({ x, y, zoom });
    }
  }

  // console.log(TestPositioningAlgo());
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button onClick={onSave}>Save</button>
      <button onClick={TestPositioningAlgo}>Position</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        onNodeClick={onClick}
      >
        <Controls />
        <MiniMap zoomable pannable/>
        <Background variant="dots" gap={12} size={1} />

      </ReactFlow>

    </div>

  );
}

export { Trial };