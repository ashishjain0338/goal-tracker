import "./meta-data-view.css"
import React, { useState , useEffect, forwardRef, useImperativeHandle} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const MetaDataView =  forwardRef((props, ref) => {
    // const [rootAccess, setRootAccess] = useState(props.root);
    const [goalState, setGoalState] = useState(props.goalData);
    const [abc, setReRenderEvent] = useState(9)
    
    useImperativeHandle(ref, () => ({
        retrieveEditState(){
            // ("From Metadata, retrieving edit-state");
            return goalState;
        }
    }))

    
    useEffect(() => {
        console.log("use-effect after click called for Meta-View  |", props.goalData);
        setGoalState(props.goalData)
        var state = props.goalData.state
        var possibleStates = ["terminated", "not-started", "in-progress", "completed"]
        document.getElementById(state).selected = true
        console.debug("Clicked Node State ", state)
    }, [props.goalData]);

    function onFormChange(key, val){
        if (key == "state"){
            console.debug("State change Recognised | ", val)
        }
        var curState = goalState
        curState[key] = val
        setGoalState({...curState}) // Clone and then saving
    }


    return (
        <div className="meta-data">
            <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Status: </InputGroup.Text>
                    <Form.Select aria-label="Status" disabled={props.edited} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("state", e.target.value)}}>
                        {/* <option></option> */}
                        
                        <option value="in-progress" id="in-progress" >In Progress</option>
                        <option value="not-started" id="not-started">Not Started</option>
                        <option value="terminated" id="terminated">Terminated</option>
                        <option value="completed" id="completed">Completed</option>
                    </Form.Select>
                </InputGroup>

                <hr></hr>
                <div className="row">
                    <div className="col-lg-4">
                        <InputGroup className="mb-3">
                            <InputGroup.Text >Id</InputGroup.Text >
                            <Form.Control aria-describedby="basic-addon3" type="number"  value={goalState["id"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("id", e.target.value)}} disabled={props.root}/>
                        </InputGroup>
                    </div>
                    <div className="col-lg-4">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>X</InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon3" type="number" value={goalState["x"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("x", e.target.value)}} disabled={props.root}/>
                        </InputGroup>
                    </div>
                    <div className="col-lg-4">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Y</InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon3" type="number" value={goalState["y"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("y", e.target.value)}} disabled={props.root}/>
                        </InputGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Width : </InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon3" type="number" value={goalState["width"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("width", e.target.value)}} disabled={props.root}/>
                        </InputGroup>
                    </div>
                    <div className="col-lg-6">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Height : </InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon3" type="number" value={goalState["height"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("height", e.target.value)}} disabled={props.root} />
                        </InputGroup>
                    </div>
                </div>
                <hr></hr>
                <div className="row" style={{ fontSize: "0.9rem" }}>
                    <div className="col-lg-12">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Created-At</InputGroup.Text>
                            <Form.Control type="date" aria-describedby="basic-addon3" value={goalState["createdAt"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("createdAt", e.target.value)}} disabled={props.edited}/>
                        </InputGroup>
                    </div>
                    <div className="col-lg-12">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Started-At</InputGroup.Text>
                            <Form.Control type="date" aria-describedby="basic-addon3" value={goalState["startedAt"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("startedAt", e.target.value)}} disabled={props.edited}/>
                        </InputGroup>
                    </div>

                    <div className="col-lg-12">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Targetted-Start:</InputGroup.Text>
                            <Form.Control type="date" aria-describedby="basic-addon3" value={goalState["targetStart"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("targetStart", e.target.value)}} disabled={props.edited}/>
                        </InputGroup>
                    </div>
                    <div className="col-lg-12">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Completed-at</InputGroup.Text>
                            <Form.Control type="date" aria-describedby="basic-addon3" value={goalState["completedAt"]} onChange={(e) => {setReRenderEvent(e.target.value); onFormChange("completedAt", e.target.value)}} disabled={props.edited}/>
                        </InputGroup>
                    </div>
                </div>
            </Form>
        </div>
    )
})


export { MetaDataView }