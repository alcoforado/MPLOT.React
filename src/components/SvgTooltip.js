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
    var react_1, d3, TipBBox, TipDirection, SvgToolTip;
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
            TipBBox = /** @class */ (function () {
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
            ;
            ;
            SvgToolTip = /** @class */ (function (_super) {
                __extends(SvgToolTip, _super);
                function SvgToolTip(props) {
                    var _this = _super.call(this, props) || this;
                    _this.DIRECTION_SIZE = 8;
                    _this.direction_callbacks = {};
                    _this.direction_callbacks[TipDirection.n] = _this.direction_n;
                    _this.direction_callbacks[TipDirection.s] = _this.direction_s;
                    _this.direction_callbacks[TipDirection.e] = _this.direction_e;
                    _this.direction_callbacks[TipDirection.w] = _this.direction_w;
                    _this.direction_callbacks[TipDirection.ne] = _this.direction_ne;
                    _this.direction_callbacks[TipDirection.nw] = _this.direction_nw;
                    _this.direction_callbacks[TipDirection.se] = _this.direction_se;
                    _this.direction_callbacks[TipDirection.sw] = _this.direction_sw;
                    _this._direction = TipDirection.n;
                    _this._html = function (d) { return ' '; };
                    _this._offset = [0, 0];
                    return _this;
                }
                SvgToolTip.prototype.getScreenBBox = function () {
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
                SvgToolTip.prototype.direction_n = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.n.y - this._node.offsetHeight,
                        left: bbox.n.x - this._node.offsetWidth / 2
                    };
                };
                SvgToolTip.prototype.direction_s = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.s.y,
                        left: bbox.s.x - this._node.offsetWidth / 2
                    };
                };
                SvgToolTip.prototype.direction_e = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.e.y - this._node.offsetHeight / 2,
                        left: bbox.e.x
                    };
                };
                SvgToolTip.prototype.direction_w = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.w.y - this._node.offsetHeight / 2,
                        left: bbox.w.x - this._node.offsetWidth
                    };
                };
                SvgToolTip.prototype.direction_nw = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.nw.y - this._node.offsetHeight,
                        left: bbox.nw.x - this._node.offsetWidth
                    };
                };
                SvgToolTip.prototype.direction_ne = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.ne.y - this._node.offsetHeight,
                        left: bbox.ne.x
                    };
                };
                SvgToolTip.prototype.direction_sw = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.sw.y,
                        left: bbox.sw.x - this._node.offsetWidth
                    };
                };
                SvgToolTip.prototype.direction_se = function () {
                    var bbox = this.getScreenBBox();
                    return {
                        top: bbox.se.y,
                        left: bbox.e.x
                    };
                };
                SvgToolTip.prototype.setNode = function (n) {
                    this._node = n;
                    this._d3Node = d3.select(n);
                };
                SvgToolTip.prototype.componentDidMount = function () {
                    var node = document.getElementById(this.props.svgNodeId);
                    if (node === null || node.tagName.toLowerCase() !== 'svg') {
                        throw "Error: SvgToolTip expects an svgRootNode";
                    }
                    this._svgCanvas = node;
                    this._point = this._svgCanvas.createSVGPoint();
                };
                SvgToolTip.prototype.style = function (n, v) {
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
                SvgToolTip.prototype.attr = function (n, v) {
                    if (v === void 0) { v = null; }
                    if (v === null) {
                        return d3.select(this._node).attr(n);
                    }
                    else {
                        d3.select(this._node).attr(n, v);
                    }
                    return this;
                };
                SvgToolTip.prototype.offset = function (offset) {
                    if (offset === void 0) { offset = null; }
                    if (offset === null) {
                        return this._offset;
                    }
                    else {
                        this._offset = offset;
                        return this;
                    }
                };
                SvgToolTip.prototype.direction = function (t) {
                    if (t === null)
                        return this._direction;
                    else {
                        this._direction = t;
                        return this;
                    }
                };
                SvgToolTip.prototype.html = function (f) {
                    if (f === void 0) { f = null; }
                    if (f === null) {
                        return this._html;
                    }
                    else {
                        this._html = f;
                        return this;
                    }
                };
                SvgToolTip.prototype.show = function () {
                    var target = d3.event.target;
                    var poffset = this.offset(), nodel = this._d3Node, coords, scrollTop = document.documentElement.scrollTop || document.body.scrollTop, scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
                    nodel.style('position', 'absolute')
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
                SvgToolTip.prototype.hide = function () {
                    d3.select(this._node)
                        .style('opacity', 0)
                        .style('pointer-events', 'none');
                    return this;
                };
                SvgToolTip.prototype.render = function () {
                    var _this = this;
                    return (react_1.default.createElement("div", { ref: function (node) { return _this.setNode(node); }, style: { top: 0, opacity: 0, position: "absolute", "pointerEvents": "none", "boxSizing": "border-box" } }, this.props.children));
                    //return (<div ></div>)
                };
                return SvgToolTip;
            }(react_1.default.Component));
            exports_1("SvgToolTip", SvgToolTip);
        }
    };
});
//# sourceMappingURL=SvgTooltip.js.map