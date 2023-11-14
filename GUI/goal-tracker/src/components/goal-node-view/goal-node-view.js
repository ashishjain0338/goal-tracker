import './goal-node-view.css';
import React, { useState, useEffect, useRef } from 'react';
import { GoalDescription } from './goal-description';
import { MetaDataView } from './meta-data-view';
import { SubTaskView } from './sub-task-view/sub-task-view';
import { Pen, Trash, Save, Lock, Unlock, PlusLg, XLg, BuildingAdd } from 'react-bootstrap-icons';
import axios from 'axios';
import structuredClone from '@ungap/structured-clone';
// import Floppy from 'react-bootstrap-icons';

function GoalNodeView(props) {
    const [showDescription, setShowDescription] = useState(false);
    const [showSubTask, setShowSubTask] = useState(true);
    const [showMetaData, setShowMetaData] = useState(false);
    const [rootAccess, setRootAccess] = useState(false);
    const [editState, setEditState] = useState(false);

    var defaultNode = {
        "title": "",
        "Description": {
            "desc": "",
            "motivation": ""
        }, "Meta-Data": {
            "state": "not-started",
            "id": -1,
            "x": 121,
            "y": 121,
            "height": 1121,
            "width": 11211,
            "createdAt": "1900-01-01",
            "startedAt": "1900-01-01",
            "targetStart": "1900-01-01",
            "completedAt": "1900-01-01",
        },
        "Subtask": {
            "order": [],
            "data": {}
        }

    }
    const [clickedNode, setClickedNode] = useState(defaultNode)
    const [serverSentNode, setServerSentNode] = useState("")
    const [descripitonUpdate, setDescriptionUpdate] = useState("")
    const [metaDataUpdate, setMetaDataUpdate] = useState("")
    const [subTaskUpdate, setSubTaskUpdate] = useState("")
    const childDescriptionRef = useRef(), childMetaDataRef = useRef(), subTaskRef = useRef()

    useEffect(() => {
        console.debug("use-effect after click called  |Clicked Node | ", props.node);
        if (props.node != "") {
            var nodeId = props.node.id
            axios({
                url: "http://localhost:8000/retrieve/single/" + nodeId + "/",
                method: "GET",
            }).then((res) => {
                console.debug('Server Response for (retrieve/single/)--> ', res);
                var data = res['data'];
                setServerSentNode(structuredClone(data))// Creating a deep-copy of data
                data['Meta-Data']['x'] = props.node.position.x;
                data['Meta-Data']['y'] = props.node.position.y;
                data['Meta-Data']['height'] = props.node.height;
                data['Meta-Data']['width'] = props.node.width;
                console.debug("Clicked Node-Data to Send ", data)
                setClickedNode(data)
                setDescriptionUpdate({ ...data["Description"] })
                setMetaDataUpdate({ ...data["Meta-Data"] })

            });

        }
    }, [props.node]);

    function getDisabledStatus(status) {
        if (status) {
            return ""
        } else {
            return "disabled"
        }
    }

    // When a tab is closing Call, Call for edited-values
    function retrieveEditedFields(newTabIndex) {
        // console.debug("Retieve Edited Feilds with ", showDescription, showSubTask, showMetaData)
        if (newTabIndex != 0 && showDescription) {
            var editDes = childDescriptionRef.current.retrieveEditState()
            setDescriptionUpdate(editDes);
            return { "key": "Description", "val": editDes }
        } else if (newTabIndex != 1 && showSubTask) {
            var subTaskDiff = subTaskRef.current.retrieveEditState()
            setSubTaskUpdate(subTaskDiff)
            return { "key": "SubTask", "val": subTaskDiff }
        } else if (newTabIndex != 2 && showMetaData) {
            var editMeta = childMetaDataRef.current.retrieveEditState()
            setMetaDataUpdate(editMeta)
            return { "key": "Meta-Data", "val": editMeta }
        }
    }

    function showComponent(compIndex) {
        /**
         * 0 : Description
         * 1 : Sub-Task
         * 2 : Meta-Data
         */
        var showfxn = [setShowDescription, setShowSubTask, setShowMetaData];
        if (editState) {
            retrieveEditedFields(compIndex);
        }

        for (var i = 0; i < 3; i++) {
            if (i == compIndex) {
                showfxn[i](true);
            } else {
                showfxn[i](false);
            }
        }

    }

    function compareEditAndCurrentState(curState, editState) {
        var out = []
        for (var key in curState) {
            // console.debug(key, curState[key], editState,curState[key] instanceof Object)
            if (key == "SubTask") {
                continue // SubTask Will be Handled Separatly
            }
            if (curState[key] instanceof Object) {
                if (editState[key] != undefined) {
                    var backtrack_val = compareEditAndCurrentState(curState[key], editState[key])
                    out = out.concat(backtrack_val)
                }

            } else if (curState[key] != editState[key]) {
                out.push([key, editState[key]])
            }

        }
        return out
    }

    /*
        Diff will be a dictionary of 
        {
        diffOptions: { "order": false, "updation": false, "deletion": false },
        order: order,
        subtaskData: subtaskData
        updatedTaskId: updatedTasks
        deletedTaskId: deletionTasks
      }
    */
    function getSubTaskDiff(diff) {
        console.debug("Subtask Diff ", diff)
        var order = undefined, udSubTask = {}
        if (diff.diffOptions["order"] || diff.diffOptions["updation"] || diff.diffOptions["deletion"]) {
            order = diff.order
            var newOrder = order.map((taskId, index) => {
                return [taskId, diff.subtaskData[taskId].title, diff.subtaskData[taskId].state]
            })
            order = JSON.stringify(newOrder)
            console.debug("Json order diff ", order)
        }


        if (diff.diffOptions["updation"]) {
            var updatedTasks = diff.updatedTaskId.map((taskId, index) => {
                var out = {}
                out["taskId"] = taskId
                out["datadict"] = diff.subtaskData[taskId]
                return out
            })
            udSubTask["update"] = updatedTasks
        }

        if (diff.diffOptions["deletion"]){
            udSubTask["delete"] = diff.deletedTaskId
        }

        if (Object.keys(udSubTask).length == 0) {
            udSubTask = undefined
        }
        return [order, udSubTask]

    }

    function handleSave() {
        setEditState(false);
        let choice = window.confirm("Do you want to save the current changes?");

        if (choice) {
            // Getting Edited-data
            console.debug("Before Edit-Data: ServerSentData: ", serverSentNode);

            var editedData = retrieveEditedFields(-1);
            var title = document.getElementById("goalTitle").innerHTML
            var editedNode = {
                "title": title,
                "Description": descripitonUpdate,
                "Meta-Data": metaDataUpdate,
                "SubTask": subTaskUpdate
            }
            console.debug(editedData)
            if (editedData["key"] != undefined) {
                editedNode[editedData["key"]] = editedData["val"]// To set that EditValue's Retrieved, when saveBtn is clicked (Since no tab is closed)
            }

            console.debug("After Edit-Data: EditedData: ", editedNode)
            var diff = compareEditAndCurrentState(serverSentNode, editedNode)
            // Getting SubTask Diff
            var [order, udSubTaskModel] = getSubTaskDiff(editedNode["SubTask"])
            console.debug("New Order ", order)
            if (order != undefined) {
                diff.push(["Subtask", order])
            }
            console.debug("Diff ", diff)

            axios({
                url: "http://localhost:8000/update/",
                method: "POST",
                data: {
                    "id": serverSentNode["Meta-Data"]["id"],
                    "diff": diff
                }
            }).then((res) => {
                if (res['data']['pass']) {
                    // alert('New Node Created with Id ' + res['data']['nodeId'] + '\nSelect the Node to Edit');
                    // window.location.href = "/";
                }
                else
                    alert('Something Terrible Happened, Error --> ' + res['data']['message']);
            });

            if (udSubTaskModel != undefined) {
                axios({
                    url: "http://localhost:8000/subtask/ud/",
                    method: "POST",
                    data: udSubTaskModel
                }).then((res) => {
                    if (res['data']['pass']) {
                        // alert('New Node Created with Id ' + res['data']['nodeId'] + '\nSelect the Node to Edit');
                        // window.location.href = "/";
                    }
                    else
                        alert('Something Terrible Happened, Error --> ' + res['data']['message']);
                });
            }
            console.debug("Axios end")
            window.location.href = "/";

        } else {
            alert("Your action has been terminated!!");
        }

    }


    function addNew() {
        let choice = window.confirm("This action would create new node (with default-values)\n If you want to Edit, Select the node from Flow-View-Area & edit\n Do You want to continue?");

        if (choice) {
            axios({
                url: "http://localhost:8000/create/",
                method: "GET",
            }).then((res) => {
                if (res['data']['pass']) {
                    alert('New Node Created with Id ' + res['data']['nodeId'] + '\nSelect the Node to Edit');
                    window.location.href = "/";
                }
                else
                    alert('Something Terrible Happened, Error --> ' + res['data']['message']);
            });

        } else {
            alert("Your action has been terminated!!");
        }
    }

    function deleteNode() {
        var nodeId = serverSentNode["Meta-Data"]["id"]
        let choice = window.confirm("Do you want to delete node with id: " + nodeId);

        if (choice) {
            axios({
                url: "http://localhost:8000/delete/" + nodeId + "/",
                method: "GET",
            }).then((res) => {
                if (res['data']['pass']) {
                    // alert('New Node Created with Id ' + res['data']['nodeId'] + '\nSelect the Node to Edit');
                    window.location.href = "/";
                }
                else
                    alert('Something Terrible Happened, Error --> ' + res['data']['message']);
            });

        } else {
            alert("Your action has been terminated!!");
        }
    }

    function AddNewSubtask() {
        let choice = window.confirm("This action would create New-SubTask\nDo You want to continue?");

        if (choice) {

            axios({
                url: "http://localhost:8000/subtask/create/" + serverSentNode["Meta-Data"]["id"],
                method: "GET",
            }).then((res) => {
                if (res['data']['pass']) {
                    alert('New Task Created with Id ' + res['data']['taskId'] + '\nSelect the Task to Edit');
                    window.location.href = "/";
                }
                else
                    alert('Something Terrible Happened, Error --> ' + res['data']['message']);
            });

        } else {
            alert("Your action has been terminated!!");
        }
    }

    // { console.log("NodeView-Called", props.node) }
    return (
        <div style={{ overflowY: "scroll", height: "100vh" }}>
            {/* <p>{clickedNode}</p> */}
            {/* <p>{JSON.stringify(props.node)}</p> */}
            <div style={{ float: "right" }}>
                {
                    editState ?
                        <button className='btn btn-light ' onClick={handleSave} data-toggle="tooltip" title="Save"><Save /></button> :
                        <button className='btn btn-light ' onClick={() => setEditState(true)} data-toggle="tooltip" title="Edit"><Pen /></button>
                }
                {
                    editState &&
                    <button className='btn btn-light' onClick={() => setRootAccess(!rootAccess)} data-toggle="tooltip" title={"Root Ascess " + getDisabledStatus(rootAccess)}>{rootAccess ? <Unlock /> : <Lock />}</button>
                }
                {
                    !editState && showSubTask &&
                    <button className='btn btn-light' onClick={AddNewSubtask} data-toggle="tooltip" title="SubTask Add"><BuildingAdd /></button>
                }
                {
                    editState ?
                        <button className='btn btn-light' data-toggle="tooltip" title="Cancel" onClick={() => setEditState(false)}><XLg /></button> :
                        <button className='btn btn-light' data-toggle="tooltip" title="Delete" onClick={deleteNode}><Trash /></button>
                }

                {
                    !editState &&
                    <button className='btn btn-light' onClick={addNew} data-toggle="tooltip" title="Add New"><PlusLg /></button>
                }

            </div>


            <h1 contentEditable={editState} style={{ padding: "5px" }} id="goalTitle">{clickedNode["title"]}</h1>
            <hr></hr>
            <div className='row'>
                <div className='col-lg-4 col-sm-12'>
                    <button className='btn btn-light' onClick={() => showComponent(0)}>Description</button>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <button className='btn btn-light' onClick={() => showComponent(1)}>Sub-Task</button>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <button className='btn btn-light' onClick={() => showComponent(2)}>Meta</button>
                </div>
            </div>
            <hr></hr>
            {showDescription && <GoalDescription ref={childDescriptionRef} edited={editState} goalData={clickedNode["Description"]} />}
            {showMetaData && <MetaDataView ref={childMetaDataRef} edited={getDisabledStatus(editState)} root={getDisabledStatus(rootAccess)} goalData={clickedNode["Meta-Data"]} />}
            {showSubTask && <SubTaskView ref={subTaskRef} subtasks={clickedNode["Subtask"]} />}
        </div>
    )
}
export { GoalNodeView }