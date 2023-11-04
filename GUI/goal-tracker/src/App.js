import './App.css';
import { NavBar } from './components/nav-bar/nav_bar'
import { Trial } from './components/trial-react-flow/trial';
import { GoalNode } from './components/goal-node/goal_node';
import SplitPane from "react-split-pane";
import React, { useCallback, useState } from 'react';


function App() {
  const [paneLeftWidth, setPaneLeftWidth] = useState("70%");

function changeRightPaneWidth(){
  console.log("Button Called ", paneLeftWidth)
  if (paneLeftWidth == "100%"){
    setPaneLeftWidth("70%");
    document.getElementsByClassName('closeRightPane')[0].style.visibility = "visible";
    document.getElementsByClassName('openRightPane')[0].style.visibility = "hidden";
  }else{
    setPaneLeftWidth("100%");
    document.getElementsByClassName('closeRightPane')[0].style.visibility = "hidden";
    document.getElementsByClassName('openRightPane')[0].style.visibility = "visible";
  }
  
  console.log(document.getElementsByClassName('closeRightPane')[0].style)
}

  return (
    <div>
      {/* <NavBar/> */}
      <SplitPane
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize={paneLeftWidth}
      >
        <div style={{ height: "100vh" }} >
        <button className='openRightPane' onClick={changeRightPaneWidth}>&lt;</button>
          <Trial />
         
        </div>
        <div style={{ height: "100vh"}} className='rightPane'>
          <button className='closeRightPane' onClick={changeRightPaneWidth}>&gt;</button>
        </div>
      </SplitPane>
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
