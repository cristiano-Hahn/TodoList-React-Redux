import React, {Component} from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeDescription, search, add} from './todoActions'

class todoForm extends Component{
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e){
        if( e.key == 'Enter'){
            e.shiftKey ? this.props.handleSearch(): this.props.add(this.props.description)
        } else if ( e.key == 'escape'){
            e.handleClear()
        }
    }

    componentWillMount(){
        this.props.search()
    }

    render(){
        return(
            <div role='form' className='todoForm'>
                <Grid cols ='12 9 10'>
                    <input  id='description' 
                        className ='form-control' 
                        placeholder='Adicione uma tarefa' 
                        value={this.props.description}
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}/>            
                </Grid>
                <Grid cols="12 3 2" >
                    <div>
                        <IconButton style='primary' icon='plus' onClick={() => this.props.add(this.props.description)}></IconButton>
                        <IconButton style='info' icon='search' onClick={this.props.handleSearch}></IconButton>
                        <IconButton style='default' icon='close' onClick={this.props.handleClear}></IconButton>
                    </div>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search, add}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(todoForm)
