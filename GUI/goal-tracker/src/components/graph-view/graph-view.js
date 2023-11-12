import "./graph-view.css"
import React, { useCallback, useState, useEffect } from 'react';
import { GoalNode } from "../goal-node/goal_node";

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
import axios from 'axios';



const nodeTypes = { goalNode: GoalNode };
function GraphView(props) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onClick = useCallback((event, node) => { props.clickedNodeCallback(node) })

    useEffect(() => {
        axios({
            url: "http://localhost:8000/retrieve/all/",
            method: "GET",
        }).then((res) => {
            var data = res['data'];
            console.debug("Server-response (retrieve/all/)", res)
            if (data['nodes']) {
                setNodes(res['data']['nodes'])
            }

        });

    }, []);


    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* <button onClick={onSave}>Save</button>
            <button onClick={TestPositioningAlgo}>Position</button> */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                // onConnect={onConnect}
                // onInit={setRfInstance}
                nodeTypes={nodeTypes}
                onNodeClick={onClick}
            >
                <Controls />
                <MiniMap zoomable pannable />
                <Background variant="dots" gap={12} size={1} />

            </ReactFlow>

        </div>
    )
}

export { GraphView }