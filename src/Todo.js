import React from 'react'
import Update from './update.svg'
import Complete from './complete.svg'
import Delete from './delete.svg'
import Enter from './enterarrow.svg'
// Export
export default function Todo({dispatch, todo, ACTIONS, setMsg}) {
    // Set Deleting STATE
    const [deleting, setDeleting] = React.useState(false);
    const [textValue, setTextValue] = React.useState(todo.todo);
    const [show, setShow] = React.useState(false);

    // ADD ZERO FUNCTION
    const addZero = (num) => {
        // if is lower to 10 add 0 otherwise do nothing
        return (parseInt(num, 10) < 10 ? '0' : '') + num;
    }
    // SET DATE
    let date = new Date(todo.id);
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let newDate = addZero(dd) + '/' + addZero(mm) + '/' + +yy
    
    // IsDeleting styles
    let del = {
        opacity: 0
    }
    // Is Complete Style
    let isComplete = {
        color: todo.complete ? 'grey': '#fff',  
        // textDecoration: todo.complete ? 'line-through' : ''
    }

    // Handle Delete
    const handleDelete = (id)=>{
        // Set is Deleting to True
        setDeleting(true);
        // console.log(deleting)
        // Dispatch
        setTimeout(()=>{
            dispatch({type: ACTIONS.DELETE_TODO, payload:{id:id}})
        }, 1500) 
    }
    // Handle Complete
    const handleComplete = ()=>{
        // Dispatch
        dispatch({type: ACTIONS.COMPLETE_TODO, payload:{id:todo.id}});
    }
    // Handle Update
    const handleUpdate = ()=>{
        setShow(!show)
    
    }
    // Handle Submit
    const handleSubmit = (e)=>{
    console.log('Submited')
    // Prevent default
    e.preventDefault();
    // Check name length
   // Check todo name length
    if(todo.length > 60){
    
        return setMsg(`Todo name length ${todo.length} too long, max 60.`)
    }
    if(todo.length === 0){
        
        return setMsg(`Todo name length ${todo.length} too short, min 5.`)
    }
    if(todo.length <= 4){
    
        return setMsg(`Todo name length ${todo.length} too short, min 5.`)
    }
    // Dispatch
    dispatch({type: ACTIONS.UPDATE_TODO, payload:{id:todo.id, todo:textValue}});
    // Select text area and show it
   setShow(false)
    }
 
 // ─── RETURN ─────────────────────────────────────────────────────────────────────
 
 return (
        <div className='card' style={deleting ? del : {}}>
        <div className="card-side front">
        <h4 className={show ? 'hide' : ''} style={{textDecoration: todo.complete ? 'line-through' : ''}}> {todo.todo}</h4>
        </div> 
        <div className="card-side back">
            <ul>
            <li> <strong>Date: </strong> {newDate}</li>   
            <li className={show ? 'hide' : ''}>
            <span className={todo.complete ? 'line  width' : 'line'} style={isComplete}> {todo.todo}</span>
            </li>  
           <li className='form-update'>
            <form onSubmit={handleSubmit}>
            <textarea 
            className={show ? 'show' : ''}
            cols="30" 
            rows="5"
            value= {textValue}
            onChange={e => setTextValue(e.target.value)}
            autoFocus
            > 
            </textarea>
            <button className='enter-btn-update'>
                <img src={Enter} className={show ? 'enter-arrow-update show' : 'enter-arrow-update'} alt="enter"/>
                </button>
            </form>
            </li>
            </ul>
       
       <div className='card-btns'>
        <button className='card-btn-complete'
        onClick={handleComplete}
        >
        <img src={Complete} alt="complete"/>
        </button>
        <button className='card-btn-update'
        onClick={()=> handleUpdate(todo.id)}
        >
            <img src={Update} alt="update"/>
        </button>
       <button className='card-btn-delete'
        onClick={()=> handleDelete(todo.id)}
        >
            <img src={Delete} alt="delete" />
        </button>
        </div> 
        </div>
       
        </div>
    )
}
