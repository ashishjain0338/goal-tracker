import React, { useCallback,  useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
  } from 'reactflow';
import 'reactflow/dist/style.css';
import { GoalNode } from '../goal-node/goal_node';

const initialNodes = [
    {id: '1', type: 'goalNode', position: { x: 450, y: 0 }, data: { title: "Life" , describe: "abcdef"}},
    {id: '2', type: 'goalNode', position: { x: 0, y: 300 }, data: { title: "Goal-1" , describe: "abcdef"}},
    {id: '3', type: 'goalNode', position: { x: 300, y: 300 }, data: { title: "Goal-2" , describe: "abcdef"}},
    {id: '4', type: 'goalNode', position: { x: 600, y: 300}, data: { title: "Goal-3" , describe: "abcdef"}},
    {id: '5', type: 'goalNode', position: { x: 900, y: 300 }, data: { title: "Goal-4" , describe: "abcdef"}},
    

];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },

];
const nodeTypes = { goalNode: GoalNode };

  function Trial(){
    const [rfInstance, setRfInstance] = useState(null);
    const onSave = useCallback(() => {
        if (rfInstance) {
          const flow = rfInstance.toObject();
          console.log("Saving the Instance");
          console.log(flow)
          console.log(JSON.stringify(flow))
        //   localStorage.setItem(flowKey, JSON.stringify(flow));
        }
      }, [rfInstance]);
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={onSave}>Save</button>
          <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        
      </ReactFlow>
      
        </div>
        
      );
  }

export {Trial};