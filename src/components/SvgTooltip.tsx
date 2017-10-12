import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as d3 from 'd3'


export interface TopLeftCorner {
    top: number;
    left: number;
}

class TipBBox {
    
       n:SVGPoint;
       s:SVGPoint;
       e:SVGPoint;
       w:SVGPoint;
       ne:SVGPoint;
       nw:SVGPoint;
       se:SVGPoint;
       sw:SVGPoint;
}

export enum TipDirection {
    n,
    s,
    w,
    e,
    ne,
    nw,
    se,
    sw
}
export interface IPropsSvgToolTip{
    
    svgNodeId: string;
};
interface State{};


export class SvgToolTip extends React.Component<IPropsSvgToolTip,State> {

   
    private direction_callbacks: { [dir:number]: () => TopLeftCorner };
    private _direction: TipDirection
    private _html: (d: any) => string
    private _offset: [Number, Number]
    private _svgCanvas:SVGSVGElement;
    private DIRECTION_SIZE=8;
    // private _node:    d3.Selection<HTMLElement,{},null,undefined>; 
    private _node:    HTMLElement;
    private _d3Node: d3.Selection<HTMLElement,{},null,undefined>; 
    private _point:SVGPoint;
   

  

    private getScreenBBox() {
        var targetel =  d3.event.target as any

        while ('undefined' === typeof targetel.getScreenCTM && 'undefined' !== typeof targetel.parentNode) {
            targetel = targetel.parentNode;
        }
        //safe to assume targetel is SVGGraphicsElement
        var targetSVG = targetel as SVGGraphicsElement;

        var bbox = new TipBBox(),
            matrix = targetSVG.getScreenCTM(),
            tbbox = targetSVG.getBBox(),
            width = tbbox.width,
            height = tbbox.height,
            x = tbbox.x,
            y = tbbox.y
        var point = this._point;
        point.x = x
        point.y = y
        bbox.nw = point.matrixTransform(matrix)
        point.x += width
        bbox.ne = point.matrixTransform(matrix)
        point.y += height
        bbox.se = point.matrixTransform(matrix)
        point.x -= width
        bbox.sw = point.matrixTransform(matrix)
        point.y -= height / 2
        bbox.w = point.matrixTransform(matrix)
        point.x += width
        bbox.e = point.matrixTransform(matrix)
        point.x -= width / 2
        point.y -= height / 2
        bbox.n = point.matrixTransform(matrix)
        point.y += height
        bbox.s = point.matrixTransform(matrix)

        return bbox
    }


    private direction_n(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.n.y - this._node.offsetHeight,
            left: bbox.n.x - this._node.offsetWidth / 2
        }
    }

    private direction_s(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.s.y,
            left: bbox.s.x - this._node.offsetWidth / 2
        }
    }

    private direction_e(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.e.y - this._node.offsetHeight / 2,
            left: bbox.e.x
        }
    }

    private direction_w(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.w.y - this._node.offsetHeight / 2,
            left: bbox.w.x - this._node.offsetWidth
        }
    }

    private direction_nw(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.nw.y - this._node.offsetHeight,
            left: bbox.nw.x - this._node.offsetWidth
        }
    }

    private direction_ne(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.ne.y - this._node.offsetHeight,
            left: bbox.ne.x
        }
    }

    private direction_sw(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.sw.y,
            left: bbox.sw.x - this._node.offsetWidth
        }
    }

    private direction_se(): TopLeftCorner {
        var bbox = this.getScreenBBox()
        return {
            top: bbox.se.y,
            left: bbox.e.x
        }
    }
    private setNode(n:HTMLElement)
    {
        this._node = n;
        this._d3Node = d3.select(n);
    }

    
    constructor(props:IPropsSvgToolTip) {
        super(props);
        this.direction_callbacks={};
        this.direction_callbacks[TipDirection.n] = this.direction_n;
        this.direction_callbacks[TipDirection.s] = this.direction_s;
        this.direction_callbacks[TipDirection.e] = this.direction_e;
        this.direction_callbacks[TipDirection.w] = this.direction_w;
        this.direction_callbacks[TipDirection.ne] = this.direction_ne;
        this.direction_callbacks[TipDirection.nw] = this.direction_nw;
        this.direction_callbacks[TipDirection.se] = this.direction_se;
        this.direction_callbacks[TipDirection.sw] = this.direction_sw;
      
        this._direction = TipDirection.n;
        this._html = (d:any)=>{return ' '}
        this._offset = [0,0];
       

       
        
     
        
    }

    componentDidMount()
    {
      
        var node = document.getElementById(this.props.svgNodeId)
        if (node === null  || node.tagName.toLowerCase() !== 'svg')
        {
            throw "Error: SvgToolTip expects an svgRootNode";
        }
        this._svgCanvas = (node as any) as SVGSVGElement;
        this._point = this._svgCanvas.createSVGPoint();
    }

    style(n: string, v: string): string|SvgToolTip {
        // debugger;
        if (arguments.length < 2 && typeof n === 'string') {
            return d3.select(this._node).style(n)
        } else {
            var args = Array.prototype.slice.call(arguments);
            if (args.length === 1) {
                var styles = args[0];
                Object.keys(styles).forEach(function (key) {
                    return d3.select(this._node).style(n,v);
                });
            }
        }

        return this;
    }
    attr(n:string):string;
    attr(n:string,v:string):SvgToolTip
    attr(n:string, v:string=null):string|SvgToolTip {
        if (v === null)
        {
            return d3.select(this._node).attr(n)
        } 
        else 
        {
            d3.select(this._node).attr(n,v);
        }
        return this;
    }

    offset():[Number,Number];
    offset(offset:[Number,Number]):SvgToolTip
    offset(offset: [Number, Number] = null): [Number, Number] | SvgToolTip {
        if (offset === null) {
            return this._offset;
        }
        else {
            this._offset = offset;
            return this;
        }

    }

    direction(t: TipDirection): TipDirection | SvgToolTip {
        if (t === null)
            return this._direction;
        else {
            this._direction = t;
            return this;
        }
    }

    html():((d: any) => string);
    html(f: (d: any) => string):SvgToolTip;
    html(f: (d: any) => string = null): ((d: any) => string) | SvgToolTip {
        if (f === null) {
            return this._html;
        }
        else {
            this._html = f;
            return this;
        }
    }


   
    show() 
    {
            var target = d3.event.target;

            
            var poffset = this.offset(),
                nodel = this._d3Node,
                coords,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft

            nodel.style('position', 'absolute')
                .style('opacity', 1)
                .style('pointer-events', 'all')

            coords = this.direction_callbacks[this._direction].apply(this);
            
            
            //remove all classes
            nodel.classed(TipDirection[TipDirection.n], false);
            nodel.classed(TipDirection[TipDirection.ne], false);
            nodel.classed(TipDirection[TipDirection.nw], false);
            nodel.classed(TipDirection[TipDirection.s], false);
            nodel.classed(TipDirection[TipDirection.sw], false);
            nodel.classed(TipDirection[TipDirection.se], false);
            nodel.classed(TipDirection[TipDirection.e], false);
            nodel.classed(TipDirection[TipDirection.w], false);


            nodel.classed(TipDirection[this._direction], true)
                .style('top', (coords.top + poffset[0]) + scrollTop + 'px')
                .style('left', (coords.left + poffset[1]) + scrollLeft + 'px')

            return this;
        }

        // Public - hide the tooltip
        //
        // Returns a tip
        hide() {
          
            d3.select(this._node)
                .style('opacity', 0)
                .style('pointer-events', 'none')
            return this;
        }

        
        
        render() {
            return (
            <div ref={(node)=>this.setNode(node)} style={{top:0,opacity:0,position:"absolute","pointerEvents":"none","boxSizing":"border-box"}}>
                {this.props.children}
            </div>)
            //return (<div ></div>)
        }

       



      

    

    }



