import React, { Component } from 'react'

import swal from '@sweetalert/with-react';
import Particles from 'react-particles-js';
export default class Home extends Component {
    componentDidMount() {
        swal(
          <div>
            <h1>Welcome Home!</h1>        
            <p>This is my Alert Application!</p>
          </div>
        )
      }
    
    render() {
        const particleOpt = {
            particles : {
                number : {
                    value : 500,
                    density : {
                        enable : true,
                        value_area : 800
                    }
                }
            }
        }
        return (
            <div>
                <Particles params = {particleOpt}/>
            </div>
        )
    }
}
