import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Popup from "./Popup";
import Card from 'react-bootstrap/Card';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { SubTaskNode } from "./sub-task-node";
import "./sub-task-view.css"


const SubTaskView = forwardRef((props, ref) => {


  const [subtaskPopUpShow, setSubtaskPopUpShow] = useState(false);
  const [order, setOrder] = useState(props.subtasks.order)
  const [subtaskData, setSubtaskData] = useState(props.subtasks.data)
  const [rerender, setReRender] = useState(true)
  const closesubtaskPopUp = () => setSubtaskPopUpShow(false);
  const [clickedSubtask, setClickedSubtask] = useState({})
  const [diffOptions, setdiffOptions] = useState({ "order": false, "updation": false, "deletion": false })
  const [updatedTasks, setUpdatedTasks] = useState([])
  const [deletionTasks, setDeletionTasks] = useState([])
  var [clickedTaskId, setClickedTaskId] = useState(undefined)
  // var testSubtask = ["terminated", "not-started", "in-progress", "completed"]

  useImperativeHandle(ref, () => ({
    retrieveEditState() {
      alert("From SubTask, retrieving edit-state");
      var data = {
        diffOptions: diffOptions,
        order: order,
        subtaskData: subtaskData,
        updatedTaskId: updatedTasks,
        deletedTaskId: deletionTasks
      }
      console.debug("Sending the SubTask Data ", data)
      return data;
    }
  }))

  useEffect(() => {
    console.debug("use-effect after click called (Subtasks)  |Subtask Tab | ", props.subtasks);
    setOrder(props.subtasks.order);
    setSubtaskData(props.subtasks.data);
  }, [props.subtasks]);

  Array.prototype.swapItems = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
  }

  function setDiffTrue(key) {
    if (diffOptions[key] == false) {
      var temp = diffOptions
      temp[key] = true
      setdiffOptions(temp)
    }
  }
  function moveUp(event, index) {

    console.debug("MoveUp Called for index: ", index)
    setDiffTrue("order")
    if (event.stopPropagation) event.stopPropagation();
    if (index != 0) {
      setOrder(order.swapItems(index, index - 1))
    }
    // Since, Swapping elements doesn't change the array-reference, so, to trigger a re-render event we use the below
    setReRender(!rerender)
  }

  function moveDown(event, index) {
    setDiffTrue("order")
    console.debug("MoveDown Called for index: ", index)
    if (event.stopPropagation) event.stopPropagation();
    if (index != order.length - 1) {
      setOrder(order.swapItems(index, index + 1))
    }
    // Since, Swapping elements doesn't change the array-reference, so, to trigger a re-render event we use the below
    setReRender(!rerender)
  }

  function fetchAndShowInPopUp(data, taskId) {
    console.debug("Component Clicked ", data)
    console.debug("Component Clicked TaskId", taskId)
    setClickedSubtask(data)
    setClickedTaskId(taskId)
    setSubtaskPopUpShow(true)
  }

  function saveSubtaskFromSubTaskNode(newData) {
    // console.debug("Saving from Main-menu called ", newData)
    // console.debug("Saving from Main-menu TaskId ", clickedTaskId)
    setDiffTrue("updation")
    var temp = subtaskData
    temp[clickedTaskId] = newData;
    setSubtaskData(temp)
    setUpdatedTasks([...updatedTasks, clickedTaskId])
    closesubtaskPopUp()
  }

  function deleteSubtaskFromSubTaskNode() {
    console.debug("Deleting TaskId : ", clickedTaskId)
    setDiffTrue("deletion")
    var temp = order
    const index = temp.indexOf(clickedTaskId);
    if (index > -1) { // only splice array when item is found
      temp.splice(index, 1); // 2nd parameter means remove one item only
    }
    setOrder(temp)
    setDeletionTasks([...deletionTasks, clickedTaskId])
    closesubtaskPopUp()
  }

  return (

    <div>
      {order.map((taskId, index) => (<SubTaskSummary onClick={fetchAndShowInPopUp} key={taskId} taskId={taskId}
        moveUpfxn={(event) => moveUp(event, index)} moveDownfxn={(event) => moveDown(event, index)}
        data={subtaskData[taskId]} />))}
      <Popup show={subtaskPopUpShow} onHide={closesubtaskPopUp} >
        <SubTaskNode data={clickedSubtask} onSave={saveSubtaskFromSubTaskNode} onDelete={deleteSubtaskFromSubTaskNode}></SubTaskNode>
      </Popup>
    </div>
  )
}
)

function SubTaskSummary(props) {
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

  // { console.debug(props) }
  return (

    <div className="subtask-summary-div" style={{ margin: "5px 0 5px 0" }} onClick={() => props.onClick(props.data, props.taskId)} >
      <Card >
        <Card.Body className={`bg-${props.data.state}`} style={{ filter: "brightness(110%)" }}>
          <Card.Title>
            <div className='row'>
              <div className='col-lg-9 col-md-6'>
                <h6 className='title'>{props.data.title}</h6>
              </div>
              <div className='col-lg-3 col-md-6' align="right">

                <p className='subtask-status subtask-ellipsis'>{getStateString(props.data.state)}</p>
                <button className="btn btn-light" style={{ padding: "0px", zIndex: "1" }} onClick={(event) => props.moveUpfxn(event)}><ArrowUp /></button>
                <button className="btn btn-light" style={{ padding: "0px" }} onClick={(event) => props.moveDownfxn(event)}><ArrowDown /></button>
              </div>

            </div>

          </Card.Title>
          <hr style={{ margin: "0px", padding: "0px" }} />
          <Card.Text className='goal-description subtask-multiline-ellipsis'>
            {props.data.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export { SubTaskView }