import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as d3 from 'd3'
import {SvgToolTip,IPropsSvgToolTip,TipDirection} from './SvgTooltip'
import {ColorGenerator} from '../extensions/ColorGenerator'
import {PieChart3D} from './PieChart3D'
import {NameValueColor,NameValuePair,DictionaryPair} from '../extensions/Common';
import * as Extensions from '../extensions/extensions'
export interface EventsOcurrenceChartProps {
    
}
export interface EventsOcurrenceChartState {
    errorsTip:Array<NameValueColor>;
    dateTip:Date;
    errDict:Array<DictionaryPair<string>>;
}

export class EventsOcurrenceChart extends React.Component<EventsOcurrenceChartProps,EventsOcurrenceChartState> {
    private svgNode:SVGSVGElement;
    private svgId:string="svgId";
    private colors:Array<string>;
    private tip:SvgToolTip=null;
    private readonly since:Date;
    render() {
        
      var pieSize = Math.min(this.getEstimatedTooltipHeight(),300);
   
       return (
          
            <div id="main">
                <svg id={this.svgId} width={2100} ref={(node)=>this.svgNode=node} height={500}></svg>
                <SvgToolTip  ref={(tip:SvgToolTip)=>this.tip=tip} svgNodeId={this.svgId}>
                <div className="tooltip-title">On {this.state.dateTip.toDateString()}</div>
                <div className="container-panel-side-by-side">
                <div className="panel-side-by-side">
                {
                    this.state.errorsTip.map((value,i)=>{
                      return (
                      <div className="vertical-space-small"> 
                            <div style={{backgroundColor:value.Color}}className="div-bullet"/> 
                            <strong> {value.Name}: </strong>
                            <span style={{color:'red'}}>{value.Value}</span>
                      </div>
                      )
                  })
                }
                </div>
                <div className="vertical-blur-separator"> </div>
                <div className="panel-side-by-side">
                
                <PieChart3D data={this.state.errorsTip} excentricity={0.8} width={pieSize} height={pieSize} height3D={0.1*pieSize} />
                 </div>
                 </div>
                </SvgToolTip>

                <h1>Error Dictionary</h1>
                <table>
                    <tbody>
                {
                    this.state.errDict.map((elem)=>{
                       return  <tr><td>{elem.Name}</td><td>{elem.Value}</td></tr>
                    })
                }
                </tbody>
                </table>
            </div>

        )

    }

    constructor()
    {
        super()
        this.colors = ColorGenerator.GetHighContrastPallette();
        this.since = new Date(2017,0,1);
        this.state = {errorsTip:[],errDict:[],dateTip:this.since};
    }

    onSetState(d:any){
        var errs = this.mostOcurredErrors(d);
        if (this.colors.length < errs.length)
        {
            this.colors.push("black");
        }
        var pd:Array<NameValueColor> = errs.map((el,i)=>{
            return { 
                Name:el.Name,
                Color:this.colors[i],
                Value:el.Value
            } as NameValueColor;
        })

        this.setState({
            errorsTip:pd,
            errDict:this.getErrorDictionary(d),
            dateTip:new Date(this.since.getTime()+Number(d.Day)*86400000)
        })
    }

    getErrorDictionary(d:any):Array<DictionaryPair<string>>
    {
        return Extensions.MArray.mapForEachProperty(d,(col,value)=>{
            var elems = col.split("=>");
            if (elems.length!=2)
                return null;
            else
            {
            return {
                Name:elems[0].trim(),
                Value:elems[1].trim()
            } as DictionaryPair<string>
            }
        })
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

    getEstimatedTooltipHeight():number
    {
        return this.state.errorsTip.length*12;
    }

    mostOcurredErrors(d):Array<NameValuePair>
    {
        
        var a = this.propertiesToArray(d);
        a=a.sort(function(a,b){return b.Value-a.Value});
        return a.filter((elem)=>{
            return elem.Name!=="Day"&&elem.Value!=0 && elem.Name.toLowerCase()!="total" ;
        },a);
    }

    

    componentDidMount()
    {
      
        var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 2100 - margin.left - margin.right,
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
    d3.tsv("data2017.tsv", filter, function(error, data) {
    
      x.domain(data.map(function(d) { return d.Day; }));
      y.domain([0, d3.max(data, function(d) { return d.total; })]);

      xAxis.tickValues(x.domain().filter((d,i) => !(i%30))).tickFormat((d)=>new Date(that.since.getTime()+ Number(d)*86400000).toDateString());
      that.setState({
          errDict:that.getErrorDictionary(data[0]),
          errorsTip:[],
          dateTip:new Date(that.since)
       }) 
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
          .on('mouseover',(d:any)=>{that.onSetState(d);that.tip.show();})
          .on('mouseout',()=>{that.tip.hide()})
    
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



