import './App.css';
import {NavBar} from './components/nav-bar/nav_bar'
import { Trial } from './components/trial-react-flow/trial';
import { GoalNode } from './components/goal-node/goal_node';
function App() {
  
  
  return (
    <div>
      <NavBar/>
      {/* <div style={{marginLeft: '10px'}}>
      <GoalNode description="Goal Description"/>
      </div> */}
      
      <Trial/>

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
