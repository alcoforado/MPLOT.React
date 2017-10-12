import ReactDOM from 'react-dom';
import React from 'react';
import * as d3 from 'd3'
import * as Extensions from '../extensions/extensions'
import {NameValueColor} from '../extensions/common'


export interface PieChart3DProps {
    width: number;
    height: number;
    excentricity: number;
    height3D:number;
    data: Array<NameValueColor>
}

export interface PieChart3DState {
}


export class PieChart3D extends React.Component<PieChart3DProps, PieChart3DState> {

    render() {
        var props = this.props;
        if (props.data == null)
            return;
        var data = this.props.data;
        var excentricity=Math.min(props.excentricity,1);
        var pie = d3.pie().sort(null)(data.map((elem) => elem.Value));
        var radiusX = Math.min(props.width/2.0, props.height/2.0)-props.height3D;
        var radiusY = radiusX * excentricity;

        return (
            <svg width={this.props.width} height={this.props.height}>
                <g className="slices" transform={`translate(${this.props.width / 2.0},${this.props.height / 2.0})`}>
                    {
                        //for each pie
                        pie.map((arc, i) => {
                            return (
                                <g>
                                    <path
                                        className="topSlice"
                                        style={{ fill: this.props.data[i].Color }}
                                        d={this.pieTop(arc, radiusX, radiusY, 0)} />
                                    <path />
                                    <path
                                        className="outerSlice"
                                        style={{ fill: d3.hsl(this.props.data[i].Color).darker(0.7)}}
                                        d={this.pieOuter(arc, radiusX-0.5, radiusY-0.5, props.height3D)} />
                                    <path />
                                </g>)
                        })
                    }
                </g>
            </svg>)
    }



    pieTop(d, rx: number, ry: number, ir: number): string {
        if (d.endAngle - d.startAngle == 0) return "M 0 0";
        var sx = rx * Math.cos(d.startAngle),
            sy = ry * Math.sin(d.startAngle),
            ex = rx * Math.cos(d.endAngle),
            ey = ry * Math.sin(d.endAngle);

        var ret = [];
        ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
        ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
        return ret.join(" ");
    }

    pieOuter(d, rx: number, ry: number, h: number): string {
        var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
        var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

        var sx = rx * Math.cos(startAngle),
            sy = ry * Math.sin(startAngle),
            ex = rx * Math.cos(endAngle),
            ey = ry * Math.sin(endAngle);

        var ret = [];
        ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0 0", sx, sy, "z");
        return ret.join(" ");
    }

    pieInner(d, rx: number, ry: number, h: number, ir: number): string {
        var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
        var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

        var sx = ir * rx * Math.cos(startAngle),
            sy = ir * ry * Math.sin(startAngle),
            ex = ir * rx * Math.cos(endAngle),
            ey = ir * ry * Math.sin(endAngle);

        var ret = [];
        ret.push("M", sx, sy, "A", ir * rx, ir * ry, "0 0 1", ex, ey, "L", ex, h + ey, "A", ir * rx, ir * ry, "0 0 0", sx, h + sy, "z");
        return ret.join(" ");
    }

    getPercent(d) {
        return (d.endAngle - d.startAngle > 0.2 ?
            Math.round(1000 * (d.endAngle - d.startAngle) / (Math.PI * 2)) / 10 + '%' : '');
    }


}