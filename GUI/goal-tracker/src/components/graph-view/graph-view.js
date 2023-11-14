import "./graph-view.css"
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { GoalNode } from "../goal-node/goal_node";

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    updateEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { sameLvlPositioning } from "./positioning";
// import 

const nodeTypes = { goalNode: GoalNode };
function GraphView(props) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [diff, setDiff] = useState({})
    const [serverSentState, setServerSentState] = useState({})
    const [reRender, setReRender] = useState(false)
    const onClick = useCallback((event, node) => { props.clickedNodeCallback(node) })
    // const onConnect = useCallback((params) => setEdges((eds) => {console.debug("From adding Edge"); addEdge(params, eds)}), [setEdges]);
    const edgeUpdateSuccessful = useRef(true);
    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        console.debug("deleting edge ", edge)
        var temp = diff
        if (temp["delete-edge"] == undefined) {
            temp["delete-edge"] = [[edge.source, edge.target]]
        } else {
            temp["delete-edge"] = [...temp["delete-edge"], [edge.source, edge.target]]
        }

        edgeUpdateSuccessful.current = true;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
        console.debug("Editing : ", oldEdge, newConnection)
        var temp = diff
        var data = {
            "old": {
                "src": oldEdge.source,
                "dst": oldEdge.target,
            },
            "new": {
                "src": newConnection.source,
                "dst": newConnection.target,
            }
        }
        if (temp["update-edge"] == undefined) {
            temp["update-edge"] = [data]
        } else {
            temp["update-edge"] = [...temp["update-edge"], data]
        }
        // setDiff([...diff, ["create-edge", params.source, params.target]]);
        setDiff(temp)
    }, []);


    function onConnectSave(params) {
        console.debug("calling on Edge-connect | ", params);
        setEdges(addEdge(params, edges));
        var temp = diff
        if (temp["create-edge"] == undefined) {
            temp["create-edge"] = [[params.source, params.target]]
        } else {
            temp["create-edge"] = [...temp["create-edge"], [params.source, params.target]]
        }
        // setDiff([...diff, ["create-edge", params.source, params.target]]);
        setDiff(temp)
    }

    useEffect(() => {
        axios({
            url: "http://localhost:8000/retrieve/all/",
            method: "GET",
        }).then((res) => {
            var data = res['data'];
            console.debug("Server-response (retrieve/all/)", res)
            if (data['nodes']) {
                setServerSentState(res['data']['nodes'])
                setNodes(res['data']['nodes'])
            }
            if (data['edges']) {
                console.debug("Setting edges ", data['edges'])
                setEdges(data['edges'])
            }

        });

    }, []);

    function getPositionDiff(intialState, editedState) {
        var positionDiff = {}
        for (var i = 0; i < intialState.length; i++) {
            var serverId = intialState[i].id, editedId = editedState[i].id;
            if (serverId != editedId) {
                alert("Server Send Id " + serverId + " and edited Id " + editedId + "are not same| Skipping")
                continue
            } else {
                var diff = []
                if (intialState[i].position.x != editedState[i].position.x) {
                    diff.push(["X", editedState[i].position.x])
                }
                if (intialState[i].position.y != editedState[i].position.y) {
                    diff.push(["Y", editedState[i].position.y])
                }
                // console.debug(Object.keys(diff).length)
                if (diff.length != 0) {
                    positionDiff[serverId] = diff
                }

            }
        }
        console.debug("Returning Position-Diff ", positionDiff)
        return positionDiff
    }

    function saveEdgesAndPosition() {
        console.debug("Before Saving| Server Sent nodes ", serverSentState)
        console.debug("Before Saving| Edited State ", nodes)
        var positionDiff = getPositionDiff(serverSentState, nodes)
        diff["position-nodes"] = positionDiff
        console.debug(diff);
        axios({
            url: "http://localhost:8000/edges/cud/",
            method: "POST",
            data: diff
        }).then((res) => {
            if (res['data']['pass']) {
                alert('State Saved');
                window.location.href = "/";
            }
            else
                alert('Something Terrible Happened, Error --> ' + res['data']['message']);
        });

    }

    function PositioningUsingBFS() {
        console.debug("Positioning using BFS")
        var dimensions = {
            "width": 250,
            "height": 250,
            "margin-w": 30,
            "margin-h": 60,
        }

        var graphData = {
            nodes: nodes,
            edges: edges,
        }

        var flow = sameLvlPositioning(graphData, dimensions, [0])// This will make changes on the same-reference
        setNodes(structuredClone(flow.nodes) || []);
        // setEdges(flow.edges || []);
    }

    function takeBackup(){
        axios({
            url: "http://localhost:8000/take-backup/",
            method: "GET",
        }).then((res) => {
            var data = res['data'];
            console.debug("Taking Backup ", data)
            if (data["pass"]){
                alert("Backup has been created")
            }
        });
    }
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* <button onClick={onSave}>Save</button>
            <button onClick={TestPositioningAlgo}>Position</button> */}
            <button className="btn btn-light" onClick={saveEdgesAndPosition}>Save State</button>
            <button className="btn btn-light" onClick={PositioningUsingBFS}>Automatic Position</button>
            <button className="btn btn-light" onClick={takeBackup}>Take Backup</button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnectSave}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onEdgeUpdate={onEdgeUpdate}
                snapToGrid
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