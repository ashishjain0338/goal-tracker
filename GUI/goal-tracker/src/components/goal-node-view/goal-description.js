import './goal-description.css';
import { forwardRef, useImperativeHandle } from 'react';

const GoalDescription = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        retrieveEditState(){
            console.debug("From Description, retrieving edit-state");
            var out = {
                "description": document.getElementById("description").innerHTML,
                "motivation": document.getElementById("motivation").innerHTML
            }
            return out;
        }
    }))

    return (
        <div>
            <p contentEditable={props.edited} style={{ margin: "5px", padding: "2%" }} id="description"> {props.goalData["description"]}</p>
            <hr />
            <p contentEditable={props.edited} style={{ margin: "5px", padding: "2%" }}  id="motivation"> {props.goalData["motivation"]}</p>
            <hr />
        </div>
    )
})

// function GoalDescription(props) {

//     function alertMe(){
//         alert("From Description Function")
//     }
//     return (
//         <div>
//             <p>Description</p>
//             <p contentEditable={props.edited} style={{ margin: "5px", padding: "2%" }}> {props.goalData["desc"]}</p>
//             <hr />
//             <p contentEditable={props.edited} style={{ margin: "5px", padding: "2%" }}  > {props.goalData["motivation"]}</p>
//             <hr />
//         </div>
//     )
// }

export { GoalDescription }