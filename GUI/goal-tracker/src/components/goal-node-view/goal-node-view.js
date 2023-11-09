import './goal-node-view.css';
import React, { useState } from 'react';
import { GoalDescription } from './goal-description';
import { MetaDataView } from './meta-data-view';

function GoalNodeView(props) {
    const [clickedNode, setClickedNode] = useState(props.node);
    const [showDescription, setShowDescription] = useState(false);
    const [showSubTask, setShowSubTask] = useState(false);
    const [showMetaData, setShowMetaData] = useState(true);

    function showComponent(compIndex) {
        /**
         * 0 : Description
         * 1 : Sub-Task
         * 2 : Meta-Data
         */
        var showfxn = [setShowDescription, setShowSubTask, setShowMetaData];
        for (var i = 0; i < 3; i++) {
            if (i == compIndex) {
                showfxn[i](true);
            } else {
                showfxn[i](false);
            }
        }

    }

    { console.log("NodeView-Called", props.node) }
    { console.log("NodeView-Called-Clicked Node", clickedNode) }
    return (
        <div style={{ overflowY: "scroll", height: "100vh" }}>
            {/* <p>{clickedNode}</p> */}
            {/* <p>{JSON.stringify(props.node)}</p> */}
            <h1>Goal-1</h1>
            <hr></hr>
            <div className='row'>
                <div className='col-lg-4 col-sm-12'>
                    <button className='btn btn-light' onClick={() => showComponent(0)}>Description</button>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <button className='btn btn-light' onClick={() => showComponent(1)}>Sub-Task</button>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <button className='btn btn-light' onClick={() => showComponent(2)}>Meta-Data</button>
                </div>
            </div>
            <hr></hr>
            {showDescription && <GoalDescription />}
            {showMetaData && <MetaDataView />}
        </div>
    )
}
export { GoalNodeView }