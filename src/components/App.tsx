import ReactDOM from 'react-dom';
import React from 'react';
import {EventsOcurrenceChart} from './EventsOcurrenceChart'
import {PieChart3D} from './PieChart3D'

export class App extends React.Component {
render() {
    var data = {
        A1:"40",
        A2:"30",
        A3:"100"
    };
    return ( 
        <div>
            <h1>Ocurrences of errors for Web Portal since 01/01/2017</h1>
            <EventsOcurrenceChart/> 
           
        </div>
        )
}

}



