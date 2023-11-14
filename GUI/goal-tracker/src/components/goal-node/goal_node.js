import React, { useCallback, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './goal_node.css'
import { Handle, Position } from 'reactflow';

/**
 * 
 * @param {*} goalStatus : String (in-progress)
 * @returns : String (In Progress)
 */
function getStateString(goalStatus) {
    var out = "";
    var nextCharToUpper = true;
    for (var i = 0; i < goalStatus.length; i++) {
        if (nextCharToUpper) {
            out += goalStatus[i].toUpperCase();
            nextCharToUpper = false;
        } else if (goalStatus[i] == "-") {
            out += " ";
            nextCharToUpper = true;
        }
        else {
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
    const [combSubtask, setCombinedSubtask] = useState(props.data.subtask)

    useEffect(() => {
        if (width == undefined) {
            console.info("Width Not provided, Setting to Default, 170")
            setWidth("230px")
        }
        if (goalState == undefined) {
            setgoalState("not-started");
        }
        // Combining elements of sub-tasks two times at once
        var temp = []
        for (var i = 0; i < props.data.subtask.length; i += 2) {
            var firstele = props.data.subtask[i]
            var secondele = undefined
            if (i + 1 < props.data.subtask.length) {
                secondele = props.data.subtask[i + 1]
            }
            temp.push([firstele, secondele])
        }
        setCombinedSubtask(temp)


    }, [props, width]);

    return (
        <div style={{ width: `${width}` }} className='testbg'>
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
                    {
                        // Item represents the array of  [[TAskId, Title, State] of first ele, [TAskId, Title, State] of second ele]
                        combSubtask.map((item, index) => {
                            if (item[1] == undefined) {
                                return (
                                    <div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <p className='ellipsis subtask'><span className={`dot bg-${item[0][2]}-dot`}></span>{item[0][1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <p className='ellipsis subtask'><span  className={`dot bg-${item[0][2]}-dot`} ></span>{item[0][1]}</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className='ellipsis subtask'><span  className={`dot bg-${item[1][2]}-dot`} ></span>{item[1][1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                    {/* <div className='row'>
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
                    </div> */}
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