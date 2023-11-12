import SplitPane from "react-split-pane";
import React, { useState } from 'react';
import { GoalNodeView } from "../goal-node-view/goal-node-view";
import { GraphView } from "../graph-view/graph-view";
import "./homepage.css"
import { Trial } from "../trial-react-flow/trial";

function HomePage() {
    const [clickedNode, setClickedNode] = useState("")

    function changeRightPaneWidth() {
        var closeBtnVisibility = document.getElementsByClassName('closeRightPane')[0].style.visibility
        if (closeBtnVisibility == "visible" || closeBtnVisibility == "") {
            // Closing the Right Pane  
            document.getElementsByClassName("Pane vertical Pane1")[0].style.width = "100%"; //Left-Pane
            document.getElementsByClassName('closeRightPane')[0].style.visibility = "hidden";
            document.getElementsByClassName('openRightPane')[0].style.visibility = "visible";
        } else {
            document.getElementsByClassName("Pane vertical Pane1")[0].style.width = "70%"; //Left-Pane
            document.getElementsByClassName('closeRightPane')[0].style.visibility = "visible";
            document.getElementsByClassName('openRightPane')[0].style.visibility = "hidden";
        }
    }

    return (
        <div>
            <SplitPane className='split-pane'
                split="vertical"
                minSize={100}
                maxSize={-100}
                defaultSize={"70%"}
            >
                <div style={{ height: "100vh" }} >
                    <button className='openRightPane' onClick={changeRightPaneWidth}>&lt;</button>
                    {/* <Trial clickedNodeCallback={setClickedNode} /> */}
                    <GraphView clickedNodeCallback={setClickedNode}/>
                </div>
                <div style={{ height: "100vh" }} className='rightPane'>
                    <button className='closeRightPane' onClick={changeRightPaneWidth}>&gt;</button>
                    <GoalNodeView node={clickedNode} />
                </div>
            </SplitPane>
        </div>
    )
}

export { HomePage }