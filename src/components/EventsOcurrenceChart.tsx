import ReactDOM from 'react-dom';
import React from 'react';
import * as d3 from 'd3'


export class EventsOcurrenceChart extends React.Component {
    render() {
       return ( 
            <div id="main">
                <svg width={960} height={500}></svg>
            </div>
        )

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
    
    // var tip = d3.tip()
    //   .attr('class', 'd3-tip')
    //   .offset([-10, 0])
    //   .direction('e')
    //   .html(MostOcurredErrors) 
    
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
   // svg.call(tip);
    
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
          .on('mouseover', null)
          .on('mouseout', null)
    
    });
    
    function propertiesToArray(d)
    {
        let a=[];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                a.push({Name: col,Value: Number(d[col])})
        // do stuff
            }
        }
        return a;

    }

    function MostOcurredErrors(d)
    {
        var a = propertiesToArray(d);
        a=a.sort(function(a,b){return b.Value-a.Value});
        var html = "";
        
        let limit = 1000;
        for(var i=0;i<a.length;i++)
        {
            if (a[i].Value == 0) {
                return html;
            }
            if (i >= limit)
            {
                return html;
            }
            if (a[i].Name == "Day")
            {
                continue;
            }
            else
            {
                html+="<div><strong>" + a[i].Name.split("=")[0]+":</strong> <span style='color:red'>" + a[i].Value+ "</span></div>"
            }
            
        }
    }

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



