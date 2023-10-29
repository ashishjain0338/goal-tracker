import React, { useCallback, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './goal_node.css'
import { Handle, Position } from 'reactflow';


function GoalNode(props) {
    const [goalTitle, setgoalTitle] = useState(props.data.title);
    const [description, setDescription] = useState(props.description);
    const [width, setWidth] = useState(props.width)
    const [level, setLevel] = useState(props.level)

    useEffect(() => {
        if (width == undefined){
            console.log("Width Not provided, Setting to Default, 170")
            setWidth("230px")
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
        <div style={{ width:{width}}}>
            <Handle type="target" position={Position.Top} />
            <Card style={{ width:`${width}`}}>
                <Card.Body>
                    <Card.Title>
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className='title'>{goalTitle}</h4>
                            </div>
                            <div className='col-6' align="right">
                                <p className='status ellipsis'>In-Progress</p>
                            </div>

                        </div>

                    </Card.Title>
                    <hr style={{ margin: "0px", padding: "0px" }} />
                    <Card.Text className='goal-description multiline-ellipsis'>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <hr style={{ margin: "0px", padding: "0px" }} />

                    <div className='row'>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
                        </div>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
                        </div>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
                        </div>
                        <div className='col-6'>
                            <p className='ellipsis subtask'><span className="dot"></span>Subtask-1 abcderfg</p>
                        </div>
                    </div>
                </Card.Body>
                <hr style={{ margin: "0px", padding: "0px" }} />
                <Card.Footer className='goal-footer'>
                    <p className='ellipsis goal-footer' style={{ margin: "0px" }}>Completed-On: 31/10</p>
                </Card.Footer>
            </Card>
            <Handle type="source" position={Position.Bottom} />
        </div>

    );

}

export { GoalNode };