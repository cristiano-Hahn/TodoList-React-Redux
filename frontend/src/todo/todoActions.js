import Axios from 'axios'


const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (e) => ({
    type:'DESCRIPTION_CHANGED',
    payload: e.target.value 
})

export const search = () =>{
    const resp = Axios.get(`${URL}?sort=-createdAt${search}`) 
    return{
        type:'TODO_SEARCHED',
        payload: resp
    }
} 

export const add = (description) =>{
    const resp = Axios.post(URL, {description})
    return{
        type:'TODO_ADDED',
        payload: resp
    }
}