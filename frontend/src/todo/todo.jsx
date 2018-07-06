import React,{Component} from 'react'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'
import Axios from 'axios';

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{
    constructor(props){
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.handleRemove= this.handleRemove.bind(this)
        this.handleMarkAsDone= this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending= this.handleMarkAsPending.bind(this)
        this.handleClear= this.handleClear.bind(this)
        this.handleSearch= this.handleSearch.bind(this)
        
        this.state ={ description: '', list: []}
        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        Axios.get(`${URL}?sort=-createdAt${search}`)
        .then(
            resp => (
                this.setState({...this.state, description, list:resp.data})
            )        
        )  
    }

    handleAdd(){
        const description = this.state.description

        Axios.post(URL, {description})
        .then(() =>this.refresh())
    }

    handleSearch(){
        this.refresh(this.state.description)
        console.log('asdasda')
    }

    handleMarkAsDone(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: true}).then(() => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: false}).then(() => this.refresh(this.state.description))
    }

    handleRemove(todo){
        Axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh(this.state.description))
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleClear(){
        this.refresh()
    }


    render(){
        return( 
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm handleAdd={this.handleAdd} handleChange={this.handleChange} description={this.state.description} handleSearch={this.handleSearch} handleClear={this.handleClear}/>
                <TodoList list={this.state.list} handleRemove={this.handleRemove} handleMarkAsDone={this.handleMarkAsDone}  handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
        )
    }
}