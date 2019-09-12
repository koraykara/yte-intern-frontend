
import React, { Component } from 'react'
import Chart from 'react-google-charts';
import axios from "axios"

class Graph extends Component {
    constructor(props){
        super(props)
        this.state = {
          liste:[],
          successes : [],
         
        }
        
    }
    setSuccess(id){
      
      axios.get(`http://localhost:8080/success/${id}`)
                    .then(response => {
                    
                          this.setState({liste:[["fail","success"]].concat(response.data.map((item) => [item.localDate,item.success]))});    
                    })
                    .catch(error => {
                        console.log(error)
                    }) 
    }
    componentDidMount() {
      this.setSuccess(this.props.idFromTable);
      this.interval = setInterval( () => this.setSuccess(this.props.idFromTable),1000);      
    }
    
    componentWillUnmount(){
      clearInterval(this.interval)
    }
    
    render() {
     
        return (
            <div>
              
              <Chart
              width={'800px'}
              height={'600px'}
              chartType="ScatterChart"
              loader={<div>Loading Chart</div>}

              data={this.state.liste}

              options={{
                title: '',
                hAxis: { title: '', minValue: 0, maxValue: 15 },
                vAxis: { title: '', minValue: 0, maxValue: 1.2 },
                legend: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
              
        
            </div>



        )
    }
}
export default Graph;



