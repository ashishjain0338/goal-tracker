import './App.css';
import { NavBar } from './components/nav-bar/nav_bar'
import { Trial } from './components/trial-react-flow/trial';
import SplitPane from "react-split-pane";
import React, { useState } from 'react';
import { GoalNodeView } from './components/goal-node-view/goal-node-view';
import { HomePage } from './components/homepage/homepage';
import { logger } from './logger';

function App() {
  return (
    <div>
      <HomePage/>
      {/* <NavBar/> */}
      {/* <SplitPane className='split-pane'
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize={"70%"}
      >
        <div style={{ height: "100vh" }} >
          <button className='openRightPane' onClick={changeRightPaneWidth}>&lt;</button>
          <Trial clickedNodeCallback={setClickedNode} />
        </div>
        <div style={{ height: "100vh"}} className='rightPane'>
          <button className='closeRightPane'  onClick={changeRightPaneWidth}>&gt;</button>
          <GoalNodeView node={clickedNode} />
        </div>
      </SplitPane> */}
      {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/set_goal/" element={<SetGoal/>} />
            <Route path="/view_data/" element={<ViewData/>} />
            <Route path="/trend_plot/" element={<TrendPlot/>} />
        </Routes> */}
    </div>
  );
}
{/* <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
          </Switch>
        </div> */}
export default App;
