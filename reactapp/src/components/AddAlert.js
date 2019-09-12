import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert';

import Swal from "sweetalert2";  
class AddAlert extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            url : '',
            httpMethod : '',
            controlPeriod : '',
            isSubmitted : true
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.submitHandler.bind(this)  
    }

    changeHandler = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    getSelectedValue = e =>{
        
        var selectedValue = document.getElementById("httpMethod").value;
        this.setState({
            httpMethod : selectedValue
        })
    
        
    }
    submitHandler = e =>{
        console.log(this.state)
        
            axios.post("http://localhost:8080/addAlert/" , this.state)
                .then(response => {
                   // this.props.refreshData();
                    console.log(response)
                    this.setState(

                        {
                            name : '',
                            url : '',
                            httpMethod : '',
                            controlPeriod : '',
                            isSubmitted : true
                        }
                    )

                })
                .catch(error => {
                    this.setState({isSubmitted : false})
                    
                })
                
        e.preventDefault()
    }
    sweetAlertFunction = () =>{
        let timerInterval
            Swal.fire({
            title: 'Loading...',
            html: 'Remaining <strong></strong> milliseconds.',
            timer: 2000,
            onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong')
                    .textContent = Swal.getTimerLeft()
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.timer
            ) {
                console.log('I was closed by the timer')
                if(this.state.isSubmitted)
                    swal("Successful!" , "Alert is successfully added!" , "success")
                else
                    swal("Failed!" , "Alert fail to add" , "error");
            }
            })
        
    }
    render() {
        const{name , url , httpMethod,controlPeriod} = this.state 
        

        return (
            
            <div className = "card">
            
                <div className = "card-body">
                    <form onSubmit = {this.submitHandler} >
                        <div className="form-group">
                          <label htmlFor="name">Adı</label>
                          <input type="text" 
                            name="name" 
                            id="name" 
                            className="form-control" 
                            placeholder="Adı" 
                            
                            value = {name}
                            onChange = {this.changeHandler}
                          />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">URL</label>
                            <input  type="text" 
                                name="url" 
                                id="url" 
                                className="form-control"
                                placeholder="URL" 
                                value = {url}
                                onChange = {this.changeHandler}
                            />
                          
                        </div>
                       
                        <div className="form-group">
                            <label htmlFor="inputState">HTTP Method</label>
                            <select id="httpMethod" className="form-control" onChange = {this.getSelectedValue}  type="text"  value = {httpMethod} >
                                <option>Choose</option>
                                <option  >POST</option>
                                <option >GET</option>
                                <option  >DELETE</option>
                            </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">Kontrol Periyodu</label>
                          <input type="text" name="controlPeriod"
                            id="controlPeriod"
                            className="form-control" 
                            placeholder="Kontrol Periyodu"
                            value = {controlPeriod}
                            onChange = {this.changeHandler}
                            
                         />
                        
                        </div>

                        <button  onClick = {this.sweetAlertFunction} type = "submit" className = "btn btn-danger btn-block">Kaydet</button>
                        
                    </form>
                    
                </div>
                
            </div>
            
        )
    }
}
export default AddAlert;