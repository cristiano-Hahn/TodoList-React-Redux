import React from 'react'
import IconButton from '../template/iconButton'
import {connect} from 'react-redux'

const todoList =  (props) =>{
    
    
    const renderRows = () =>{
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone': ''}>{todo.description}</td>
                <td className='tableActions'>
                    <IconButton style='success' icon='check' hide={todo.done} onClick={() =>props.handleMarkAsDone(todo)}/>
                    <IconButton style='warning' icon='undo' hide={!todo.done} onClick={() =>props.handleMarkAsPending(todo)}/>
                    <IconButton style='danger' icon='trash-o' hide={!todo.done} onClick={() =>props.handleRemove(todo)}/>
                </td>
            </tr>
        ))     
    } 
    
    
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
export default connect(mapStateToProps)(todoList)