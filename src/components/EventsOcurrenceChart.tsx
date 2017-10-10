import ReactDOM from 'react-dom';
import React from 'react';
import * as d3 from 'd3'
import {SvgToolTip,IPropsSvgToolTip,TipDirection} from './SvgTooltip'



export interface EventsOcurrenceChartProps {}
export interface EventsOcurrenceChartState {errorsTip:Array<any>}


export class EventsOcurrenceChart extends React.Component<EventsOcurrenceChartProps,EventsOcurrenceChartState> {
    private svgNode:SVGSVGElement;
    private svgId:string="svgId";
    private tip:SvgToolTip=null;
    render() {
        
        
       return (
          
            <div id="main">
                <svg id={this.svgId} width={960} ref={(node)=>this.svgNode=node} height={500}></svg>
                <SvgToolTip  ref={(tip:SvgToolTip)=>this.tip=tip} svgNodeId={this.svgId}>
                {
                   
                  this.state.errorsTip.map((value)=>{
                 
                      return <div><strong>{value.Name}: </strong><span style={{color:'red'}}>{value.Value}</span></div>
                  })
                }
                </SvgToolTip>
            </div>
        )

    }

    constructor()
    {
        super()
        this.state = {errorsTip:[]};
    }

    propertiesToArray(d:any):Array<any>
    {
        let a=[];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                var colShort=col.split("=")[0]
                a.push({Name: colShort,Value: Number(d[col])})
        // do stuff
            }
        }
        return a;

    }

    mostOcurredErrors(d):Array<any>
    {
        
        var a = this.propertiesToArray(d);
        a=a.sort(function(a,b){return b.Value-a.Value});
        return a.filter((elem:any)=>{
            return elem.Name!=="Day"&&elem.Value!=0;
        },a);
    }

    

    componentDidMount()
    {
        var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var formatPercent = d3.format(".0%");
    
    var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    
    var y = d3.scaleLinear()
        .range([height, 0]);
    
    var xAxis = d3.axisBottom(x);
    
    var yAxis = d3.axisLeft(y);
    
    this.tip
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .direction(TipDirection.e);
    
    
    var svg = d3.select(this.svgNode)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
   // svg.call(tip);
   var that = this;
    d3.tsv("data2.tsv", filter, function(error, data) {
      x.domain(data.map(function(d) { return d.Day; }));
      y.domain([0, d3.max(data, function(d) { return d.total; })]);
    
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Error Count");
     
      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Day); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.total); })
          .attr("height", function(d) { return height - y(d.total); })
          .on('mouseover',(d:any)=>{that.setState({errorsTip:that.mostOcurredErrors(d)});that.tip.show();})
          .on('mouseout', that.tip.hide)
    
    });
    


    function filter(d) {
        let total=0;
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                total+=Number(d[col])
        // do stuff
            }
        }
        d.total=total;
        return d;
    }

  



} 




}



