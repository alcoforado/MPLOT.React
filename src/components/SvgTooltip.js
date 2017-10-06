System.register(["react", "d3"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var react_1, d3, TipBBox, TipDirection, SvgTooltip;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }
        ],
        execute: function () {
            TipBBox = (function () {
                function TipBBox() {
                }
                return TipBBox;
            }());
            (function (TipDirection) {
                TipDirection[TipDirection["n"] = 0] = "n";
                TipDirection[TipDirection["s"] = 1] = "s";
                TipDirection[TipDirection["w"] = 2] = "w";
                TipDirection[TipDirection["e"] = 3] = "e";
                TipDirection[TipDirection["ne"] = 4] = "ne";
                TipDirection[TipDirection["nw"] = 5] = "nw";
                TipDirection[TipDirection["se"] = 6] = "se";
                TipDirection[TipDirection["sw"] = 7] = "sw";
            })(TipDirection || (TipDirection = {}));
            exports_1("TipDirection", TipDirection);
            SvgTooltip = (function (_super) {
                __extends(SvgTooltip, _super);
                function SvgTooltip() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.DIRECTION_SIZE = 8;
                    return _this;
                }
                SvgTooltip.prototype.getScreenBBox = function () {
                    var targetel = d3.event.target;
                    while ('undefined' === typeof targetel.getScreenCTM && 'undefined' !== typeof targetel.parentNode) {
                        targetel = targetel.parentNode;
                    }
                    //safe to assume targetel is SVGGraphicsElement
                    var targetSVG = targetel;
                    var bbox = new TipBBox(), matrix = targetSVG.getScreenCTM(), tbbox = targetSVG.getBBox(), width = tbbox.width, height = tbbox.height, x = tbbox.x, y = tbbox.y;
                    var point = this._point;
                    point.x = x;
                    point.y = y;
                    bbox.nw = point.matrixTransform(matrix);
                    point.x += width;
                    bbox.ne = point.matrixTransform(matrix);
                    point.y += height;
                    bbox.se = point.matrixTransform(matrix);
                    point.x -= width;
                    bbox.sw = point.matrixTransform(matrix);
                    point.y -= height / 2;
                    bbox.w = point.matrixTransform(matrix);
                    point.x += width;
                    bbox.e = point.matrixTransform(matrix);
                    point.x -= width / 2;
                    point.y -= height / 2;
                    bbox.n = point.matrixTransform(matrix);
                    point.y += height;
                    bbox.s = point.matrixTransform(matrix);
                    return bbox;
                };
                SvgTooltip.prototype.direction_n = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.n.y - this._node.offsetHeight,
                        left: bbox.n.x - this._node.offsetWidth / 2
                    };
                };
                SvgTooltip.prototype.direction_s = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.s.y,
                        left: bbox.s.x - this._node.offsetWidth / 2
                    };
                };
                SvgTooltip.prototype.direction_e = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.e.y - this._node.offsetHeight / 2,
                        left: bbox.e.x
                    };
                };
                SvgTooltip.prototype.direction_w = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.w.y - this._node.offsetHeight / 2,
                        left: bbox.w.x - this._node.offsetWidth
                    };
                };
                SvgTooltip.prototype.direction_nw = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.nw.y - this._node.offsetHeight,
                        left: bbox.nw.x - this._node.offsetWidth
                    };
                };
                SvgTooltip.prototype.direction_ne = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.ne.y - this._node.offsetHeight,
                        left: bbox.ne.x
                    };
                };
                SvgTooltip.prototype.direction_sw = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.sw.y,
                        left: bbox.sw.x - this._node.offsetWidth
                    };
                };
                SvgTooltip.prototype.direction_se = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.se.y,
                        left: bbox.e.x
                    };
                };
                SvgTooltip.prototype.style = function (n, v) {
                    // debugger;
                    if (arguments.length < 2 && typeof n === 'string') {
                        return d3.select(this._node).style(n);
                    }
                    else {
                        var args = Array.prototype.slice.call(arguments);
                        if (args.length === 1) {
                            var styles = args[0];
                            Object.keys(styles).forEach(function (key) {
                                return d3.select(this._node).style(n, v);
                            });
                        }
                    }
                    return this;
                };
                SvgTooltip.prototype.attr = function (n, v) {
                    if (v === void 0) { v = null; }
                    if (v === null) {
                        return d3.select(this._node).attr(n);
                    }
                    else {
                        d3.select(this._node).attr(n, v);
                    }
                    return this;
                };
                SvgTooltip.prototype.offset = function (offset) {
                    if (offset === void 0) { offset = null; }
                    if (offset === null) {
                        return this._offset;
                    }
                    else {
                        this._offset = offset;
                        return this;
                    }
                };
                SvgTooltip.prototype.direction = function (t) {
                    if (t === null)
                        return this._direction;
                    else {
                        this._direction = t;
                        return this;
                    }
                };
                SvgTooltip.prototype.html = function (f) {
                    if (f === null) {
                        return this._html;
                    }
                    else {
                        this._html = f;
                        return this;
                    }
                };
                SvgTooltip.prototype.construcor = function (svg) {
                    this.direction_callbacks[TipDirection.n] = this.direction_n;
                    this.direction_callbacks[TipDirection.s] = this.direction_s;
                    this.direction_callbacks[TipDirection.e] = this.direction_e;
                    this.direction_callbacks[TipDirection.w] = this.direction_w;
                    this.direction_callbacks[TipDirection.ne] = this.direction_ne;
                    this.direction_callbacks[TipDirection.nw] = this.direction_nw;
                    this.direction_callbacks[TipDirection.se] = this.direction_se;
                    this.direction_callbacks[TipDirection.sw] = this.direction_sw;
                    this._direction = TipDirection.n;
                    this._html = function (d) { return ' '; };
                    this._offset = [0, 0];
                    this._svgCanvas = (svg.tagName.toLowerCase() === 'svg') ? svg : svg.ownerSVGElement;
                    this._point = this._svgCanvas.createSVGPoint();
                };
                SvgTooltip.prototype.show = function (d, i) {
                    var target = d3.event.target;
                    var content = this._html(d);
                    var poffset = this.offset(), nodel = this._d3Node, coords, scrollTop = document.documentElement.scrollTop || document.body.scrollTop, scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
                    nodel.html(content)
                        .style('position', 'absolute')
                        .style('opacity', 1)
                        .style('pointer-events', 'all');
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
                        .style('left', (coords.left + poffset[1]) + scrollLeft + 'px');
                    return this;
                };
                // Public - hide the tooltip
                //
                // Returns a tip
                SvgTooltip.prototype.hide = function () {
                    d3.select(this._node)
                        .style('opacity', 0)
                        .style('pointer-events', 'none');
                    return this;
                };
                SvgTooltip.prototype.render = function () {
                    var divStyle = {
                        position: "absolute",
                        top: 0,
                        opacity: 0,
                        "pointer-events": "none",
                        "box-sizing": "border-box"
                    };
                    return react_1.default.createElement("div", { style: divStyle });
                    //return (<div ></div>)
                };
                return SvgTooltip;
            }(react_1.default.Component));
            exports_1("SvgTooltip", SvgTooltip);
        }
    };
});
//# sourceMappingURL=SvgTooltip.js.map