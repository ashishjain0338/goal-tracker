import React, { useCallback, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './goal_node.css'
import { Handle, Position } from 'reactflow';

/**
 * 
 * @param {*} goalStatus : String (in-progress)
 * @returns : String (In Progress)
 */
function getStateString(goalStatus){
    var out = "";
    var nextCharToUpper = true;
    for (var i = 0; i < goalStatus.length; i++){
        if (nextCharToUpper){
            out += goalStatus[i].toUpperCase();
            nextCharToUpper = false;
        }else if(goalStatus[i] == "-"){
            out += " ";
            nextCharToUpper = true;
        }
        else{
            out += goalStatus[i];
        }
        
    }
    return out;
}

function GoalNode(props) {
    const [goalTitle, setgoalTitle] = useState(props.data.title);
    const [description, setDescription] = useState(props.description);
    const [width, setWidth] = useState(props.width)
    const [level, setLevel] = useState(props.level)
    const [goalState, setgoalState] = useState(props.data.state)

    useEffect(() => {
        if (width == undefined){
            console.info("Width Not provided, Setting to Default, 170")
            setWidth("230px")
        }
        if (goalState == undefined){
            setgoalState("not-started");
        }

    }, [props, width]);

    // console.log("Node object: ",  props.data)
    // function getSubtask() {
    //     var return_rows = []
    //     for (var row = 0; row < 2; row++) {
    //         var columns = [];
    //         for (var col = 0; col < 2; col++) {
    //             columns += [
    //                 <div className='col-6' >
    //                     <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
    //                 </div >]
    //         }

    //         return_rows += [
    //             <div className='row'>
    //                 columns
    //             </div>
    //         ]
    //     }
    //     return return_rows;
    // }

    return (
        <div style={{ width:`${width}`}} className='testbg'>
            <Handle type="target" position={Position.Top} />
            <Card  >
                <Card.Body className={`bg-${goalState}`}>
                    <Card.Title>
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className='title'>{goalTitle}</h4>
                            </div>
                            <div className='col-6' align="right">
                                <p className='status ellipsis'>{getStateString(goalState)}</p>
                            </div>

                        </div>

                    </Card.Title>
                    <hr style={{ margin: "0px", padding: "0px" }} />
                    <Card.Text className='goal-description multiline-ellipsis'>
                        {props.data.description}
                    </Card.Text>
                    <hr style={{ margin: "0px", padding: "0px" }} />

                    <div className='row'>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot bg-in-progress-dot" ></span>Subtask-1 abcderfg</p>
                        </div>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot bg-not-started-dot"></span>Subtask-1 abcderfg</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot bg-completed-dot"></span>Subtask-1 abcderfg</p>
                        </div>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot bg-terminated-dot"></span>Subtask-1 abcderfg</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot bg-completed-dot"></span>Subtask-1 abcderfg</p>
                        </div>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot  bg-in-progress-dot"></span>Subtask-1 abcderfg</p>
                        </div>
                    </div>
                </Card.Body>
                <hr style={{ margin: "0px", padding: "0px" }} />
                <Card.Footer className='goal-footer testbg'>
                    <p className='ellipsis goal-footer' style={{ margin: "0px" }}>{props.data.footer}</p>
                </Card.Footer>
            </Card>
            <Handle type="source" position={Position.Bottom} />
        </div>

    );

}

export { GoalNode };