import React, { Component } from 'react'
import axios from "axios"
import Graph from './Graph';
import GraphForReponseTime from './GraphForResponseTime';
import swal from '@sweetalert/with-react';
import Swal from "sweetalert2";  
class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
        list : [],
        graphShow:false,
        graphId:null,
        alert : [],
      //  isEditingName : false,
       
    }
     
  }
  componentDidMount(){
    this.getData();
  }

  getData = () => {
    
    axios.get("http://localhost:8080/listAlert/")
                .then(response => {
                    this.setState({list: response.data})
                    //console.log(this.state.list)
                })
                .catch(error => {
                    console.log(error)
                })  
  }
  
  
  deleteHandler = (id) => {

    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8080/deleteAlert/${id}` , this.state)
        .then(response => {
            console.log(id);
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Alert is successfully deleted',
              showConfirmButton: false,
              timer: 1500
            });
            
            let updatedAlerts = this.state.list;
            updatedAlerts = updatedAlerts.filter(alert => alert.id !== id);
            this.setState({
              list : updatedAlerts,
              graphShow : false
            });
        })
        .catch(error => {
            console.log(error)
        });
      } else {
        swal("Alert is not deleted!");
      }
    });


  }


  editHandler = (id) => {
    //console.log( this.state.list)
    axios.get(`http://localhost:8080/alert/${id}`)
                .then(response => {
                  this.setState({
                    alert : response.data
                  })
                  
                })
                .catch(error => {
                    console.log(error)
                })
    
    //this.setState({[e.target.name] : e.target.value})
    
    
    // this.setState({
    //   isEditing : true
    // })
   // this.toggleState()
                
  }

  graphShow = (id) => {
    
    this.setState({graphShow : !this.state.graphShow, graphId:id})
  }
  
  // toggleState = () =>{
  //   const{isEditingName} = this.state;
  //   this.setState({
  //     isEditingName : !this.state.isEditingName
  //   })
  // }
  updateAlert =(e) =>{
    e.preventDefault()
    console.log(this.input.value)
    
    
  }
  
  render() {
       // const{name , url , httpMethod,controlPeriod} = this.props
        //const{isEditing} = this.state;
        
        let alertList = this.state.list.map((alert, index) =>{
          
          return(
            
                  <tr key={index} >
                  
                    <td > {alert.name} </td>     
                    <td >{alert.url} </td> 
                    <td >{alert.httpMethod} </td>
                    <td >{alert.controlPeriod} </td>  
                    <td>
                      <button  onClick = {() => this.deleteHandler(alert.id)} className = "btn btn-danger">Delete</button>
                    </td>      
                    <td>
                        <button onClick = {() => this.graphShow(alert.id)} className = "btn btn-danger">Graph</button>
                    </td>
                           
                  </tr>
                  
            )
        })
      
        return (
            
            
            <div>
            
            <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Adı</th>
                <th scope="col">URL</th>
                <th scope="col">HTTP Method</th>
                <th scope="col">Kontrol Periyodu</th>

              </tr>
            </thead>
            <tbody>
              <tr >
                <th scope = "col"></th>
              </tr>
            
              {alertList}
            </tbody>
            </table>

            
            
            <div>{this.state.graphShow ? <Graph idFromTable={this.state.graphId}></Graph> : null}</div>
            
            <div>{this.state.graphShow ? <GraphForReponseTime idFromTable={this.state.graphId}></GraphForReponseTime> : null}
            </div>
            </div>
        )
    }
}
export default Table