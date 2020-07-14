// Import
import React from 'react'
import Todo from './Todo'
import Enter from './enterarrow.svg'
import Empty from './fuel.svg'
import List from './list.svg'
// Export Todos
export default function Todos(props) {
// Props destructuring
const {msg, setMsg} = props;

// ─── ACTIONS EXPORT ─────────────────────────────────────────────────────────────
const ACTIONS ={
        ADD_TODO : 'add_todo',
        COMPLETE_TODO:'complete_todo',
        DELETE_TODO: 'delete_todo',
        UPDATE_TODO: 'update_todo'
    }
// New Todo function
    function newTodo(todo){
        return {id: Date.now(), todo: todo, complete:false}
    }

// ─── REDUCER ────────────────────────────────────────────────────────────────────
    function Reducer(todos, action){
        // Switch
        switch(action.type){
        
        // ─── NEW TODO ──────────────────────────────────────────────────── 
        case ACTIONS.ADD_TODO:
            // Spred todos ... add new todo
            let allTodos = [...todos, newTodo(action.payload.todo)].sort((a,b)=> b.id - a.id );
            // Save in the local storage
            localStorage.setItem('todos', JSON.stringify(allTodos));
            // Return all todos
            return allTodos

         // ─── COMPLETE TODO ───────────────────────────────────────────────     
        case ACTIONS.COMPLETE_TODO:
           let modTodos = todos.map(todo =>{
                if(todo.id === action.payload.id){
                    return {...todo, complete: !todo.complete}
                }
            // If not equal retun the todo state
            return todo
            });
             // Save modified todos to local storage
             localStorage.setItem('todos', JSON.stringify(modTodos));
             // Return mod todos
             return modTodos
        
        // ─── DELETE TODO ─────────────────────────────────────────────────    
        case ACTIONS.DELETE_TODO:
        // Filter
        let delTodos = todos.filter(todo => todo.id !== action.payload.id)
        .sort((a,b)=> b.id - a.id );
        // Save modified todos to local storage
        localStorage.setItem('todos', JSON.stringify(delTodos));
        // Return del todos
        return delTodos;
        
        // ─── UPDATE TODO ─────────────────────────────────────────────────
        case ACTIONS.UPDATE_TODO:
        // Loop through
        let upTodos = todos.map(todo =>(
            // Search for id
            todo.id === action.payload.id ? {...todo, todo: action.payload.todo } : todo
        ));
        // Save in the local storage new changes
        localStorage.setItem('todos', JSON.stringify(upTodos))
        // Return
        return upTodos
        
        // ─── DEFAULT RETURN ──────────────────────────────────────────────    
        default : return todos
        }
    }

// Start Array Reducer 
let storageArr = [];
let totalTodos = localStorage.getItem('totalTodos') || 0;
// Get items from local storage
if(JSON.parse(localStorage.getItem('todos')) !== null){
JSON.parse(localStorage.getItem('todos')).map(t=>{
    // Push inside array
   return  storageArr.push(t);
})
.sort((a,b)=> b.id - a.id )
// console.log(storageArr)
// Set total todos
totalTodos = storageArr.length;

// Save total in the localStorage
localStorage.setItem('totalTodos', totalTodos)
}

// ─── USE REDUCER ────────────────────────────────────────────────────────────────
const [todos, dispatch] = React.useReducer(Reducer, storageArr)

// State Name and Page
const [todo, setTodo] = React.useState('');
const [page, setPage] = React.useState(1);
const [noData, setNoData] = React.useState(false);


// ─── HANDLE SUBMIT ──────────────────────────────────────────────────────────────
     
const handleSubmit = (e)=>{
    // Prevent reload
    e.preventDefault()
   // Check todo name length
   if(todo.length > 60){
    setTodo('');
    return setMsg(`Todo name length ${todo.length} too long, max 60.`)
}
if(todo.length === 0){
    setTodo('');
    return setMsg(`Todo name length ${todo.length} too short, min 5.`)
}
if(todo.length <= 4){
    setTodo('');
    return setMsg(`Todo name length ${todo.length} too short, min 5.`)
}
    // Dispatch
    dispatch({type: ACTIONS.ADD_TODO, payload:{todo:todo}})
    // Reset input name
    setTodo('')
}

// ─── PAGINATION ─────────────────────────────────────────────────────────────────
     
let perPage = 4; // Todos per page
let pagesNumber = Math.round(storageArr.length / perPage);
 // console.log(`Total Pages ${pagesNumber}`);
 // Paginate function
 const paginate = (arr, perPage, page ) =>{
    // Set start and end
     let start = 0;
     let end = page * perPage;
     //console.log(page, start, end)
     // Return new array
     return arr.slice(start, end)
 }

// Return todos
let todosSorted = todos.sort((a,b)=> b.id - a.id );
const renderTodos =
    paginate(todosSorted, perPage, page).map(t=> {
        return (
            <div key={t.id}>
            <Todo  
            ACTIONS={ACTIONS} 
            dispatch={dispatch} 
            todo={t}
            setMsg={setMsg}
            />
            </div>
        )
    });

// Handle Prev
const handlePrev = (page)=>{
    setPage(++page);
}
 
// ─── WINDOWS ON SCROLL ──────────────────────────────────────────────────────────
      
 window.onscroll = () => {
    let winH = window.innerHeight + document.documentElement.scrollTop + 1;
    let offH = document.documentElement.offsetHeight;
    // console.log(winH, offH)
  if ( winH >= offH ) {
    // if noData is false fetch data
    
    if(page >= pagesNumber){
        setNoData(true)
    }
    if(!noData) {
        handlePrev(page);
       }
  }
}
//
// ─── RETURN ─────────────────────────────────────────────────────────────────────
//    
    return (
        <div>
           <div className="title">
           <img className='list' src={List} alt="list"/>
           <h1> Todos List</h1>
           </div> 
           <div className='total-todos'><strong>Total: </strong><span> {totalTodos}</span></div>
            <div className="msg">
                {msg}
            </div>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <input 
                type="text"
                value={todo}
                onChange={ e => setTodo(e.target.value)}
                placeholder='Add new todo'
                autoFocus
                />
                <button className='enter-btn'>
                <img src={Enter} className='enter-arrow' alt="enter"/>
                </button>
            </form>
                <div className='list'> 
                  {renderTodos}          
                </div>
        {noData ? <img src={Empty} className="empty-img" alt='empty' /> : "" }       

        </div>
    )
}
