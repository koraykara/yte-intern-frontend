
import React, { Component } from 'react'
import Chart from 'react-google-charts';
import axios from "axios"

class GraphForReponseTime extends Component {
    constructor(props){
        super(props)
        this.state = {
          responseTime : []
        }
        
    }
    
    setResponseTime = (id) =>{
      axios.get(`http://localhost:8080/success/${id}`)
                    .then(response => {
                          //console.log(response.data)
                          this.setState({responseTime:[["fail","success"]].concat(response.data.map((item) => [item.localDate,item.responseTime]))}); 
                    })
                    .catch(error => {
                        console.log(error)
                    }) 
    }
    componentDidMount() {
      this.setResponseTime(this.props.idFromTable);
      this.interval = setInterval( () => this.setResponseTime(this.props.idFromTable),1000);      
    }
    
    componentWillUnmount(){
      clearInterval(this.interval)
    }
    
    render() {
      //console.log(this.state.responseTime)
        return (
            <div>
              
              <Chart
              width={'800px'}
              height={'600px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}

              data={this.state.responseTime}

              options={{
                title: '',
                hAxis: { title: '', minValue: 0, maxValue: 15 },
                vAxis: { title: '', minValue: 0, maxValue: 800 },
                legend: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
              
        
            </div>



        )
    }
}
export default GraphForReponseTime;



