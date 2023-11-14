import { useEffect, useState } from "react"
import { Pen, Trash, Save, Lock, Unlock, PlusLg, XLg, BuildingAdd } from 'react-bootstrap-icons';
import { InputGroup, Form } from "react-bootstrap";


function SubTaskNode(props) {
    const [editState, setEditState] = useState(false)
    const [abc, setReRenderEvent] = useState("")
    const [curState, setCurState] = useState(props.data)

    useEffect(() => {
        document.getElementById(props.data.state).selected = true
        setCurState(props.data)
    }, [props.data])

    function handleSave() {
        alert("This will save the subtask temporially, For Permanant use save button of main-menu")
        // setCurState(props.data)
        var possibleStates = ["terminated", "not-started", "in-progress", "completed"]
        var selectedState = "not-started"
        for (var i = 0; i < possibleStates.length; i++) {
            if (document.getElementById(possibleStates[i]).selected) {
                selectedState = possibleStates[i]
                break
            }
        }
        var newState = {
            title: document.getElementById("subTaskTitle").innerHTML,
            description: document.getElementById("description").innerHTML,
            motivation: document.getElementById("motivation").innerHTML,
            state: selectedState
        }
        props.onSave(newState)
    }

    function deleteNode() {
        let choice = window.confirm("Do you want to delete the task?");

        if (choice) {
            props.onDelete()
        } else {

        }
    }

    return (
        <div>

            <div className="row">
                <div className="col-lg-7">
                    <h1 contentEditable={editState} style={{ padding: "5px" }} id="subTaskTitle">{props.data.title}</h1>
                </div>
                <div className="col-lg-5">
                    <div className="row" style={{ float: "right" }}>
                        <div>
                            {
                                editState ?
                                    <button className='btn btn-light ' onClick={handleSave} data-toggle="tooltip" title="Save"><Save /></button> :
                                    <button className='btn btn-light ' onClick={() => setEditState(true)} data-toggle="tooltip" title="Edit"><Pen /></button>
                            }
                            {
                                editState ?
                                    <button className='btn btn-light' data-toggle="tooltip" title="Cancel" onClick={() => setEditState(false)}><XLg /></button> :
                                    <button className='btn btn-light' data-toggle="tooltip" title="Delete" onClick={deleteNode}><Trash /></button>
                            }
                        </div>
                    </div>
                    <div className="row" style={{ display: "block", float: "right", margin: "5px 0px 5px 0px" }}>
                        <div className="col-lg-12">
                            <Form.Select aria-label="Status" disabled={!editState}>
                                <option value="in-progress" id="in-progress" >In Progress</option>
                                <option value="not-started" id="not-started">Not Started</option>
                                <option value="terminated" id="terminated">Terminated</option>
                                <option value="completed" id="completed">Completed</option>
                            </Form.Select>
                        </div>

                    </div>

                </div>

            </div>
            <hr />
            <div>
                <p contentEditable={editState} style={{ margin: "5px", padding: "2%" }} id="description">{props.data.description}</p>
                <hr />
                <p contentEditable={editState} style={{ margin: "5px", padding: "2%" }} id="motivation"> {props.data.motivation}</p>
                <hr />
                <p style={{ color: "gray", float: "right" }}>Created-On : {props.data.createdAt} &emsp; &emsp;Edited-On: {props.data.editedAt}</p>
            </div>
        </div>
    )
}
export { SubTaskNode }