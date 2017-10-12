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
    var react_1, d3, PieChart3D;
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
            PieChart3D = /** @class */ (function (_super) {
                __extends(PieChart3D, _super);
                function PieChart3D() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PieChart3D.prototype.render = function () {
                    var _this = this;
                    var props = this.props;
                    if (props.data == null)
                        return;
                    var data = this.props.data;
                    var excentricity = Math.min(props.excentricity, 1);
                    var pie = d3.pie().sort(null)(data.map(function (elem) { return elem.Value; }));
                    var radiusX = Math.min(props.width / 2.0, props.height / 2.0) - props.height3D;
                    var radiusY = radiusX * excentricity;
                    return (react_1.default.createElement("svg", { width: this.props.width, height: this.props.height },
                        react_1.default.createElement("g", { className: "slices", transform: "translate(" + this.props.width / 2.0 + "," + this.props.height / 2.0 + ")" }, 
                        //for each pie
                        pie.map(function (arc, i) {
                            return (react_1.default.createElement("g", null,
                                react_1.default.createElement("path", { className: "topSlice", style: { fill: _this.props.data[i].Color }, d: _this.pieTop(arc, radiusX, radiusY, 0) }),
                                react_1.default.createElement("path", null),
                                react_1.default.createElement("path", { className: "outerSlice", style: { fill: d3.hsl(_this.props.data[i].Color).darker(0.7) }, d: _this.pieOuter(arc, radiusX - 0.5, radiusY - 0.5, props.height3D) }),
                                react_1.default.createElement("path", null)));
                        }))));
                };
                PieChart3D.prototype.pieTop = function (d, rx, ry, ir) {
                    if (d.endAngle - d.startAngle == 0)
                        return "M 0 0";
                    var sx = rx * Math.cos(d.startAngle), sy = ry * Math.sin(d.startAngle), ex = rx * Math.cos(d.endAngle), ey = ry * Math.sin(d.endAngle);
                    var ret = [];
                    ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
                    ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
                    return ret.join(" ");
                };
                PieChart3D.prototype.pieOuter = function (d, rx, ry, h) {
                    var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
                    var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
                    var sx = rx * Math.cos(startAngle), sy = ry * Math.sin(startAngle), ex = rx * Math.cos(endAngle), ey = ry * Math.sin(endAngle);
                    var ret = [];
                    ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0 0", sx, sy, "z");
                    return ret.join(" ");
                };
                PieChart3D.prototype.pieInner = function (d, rx, ry, h, ir) {
                    var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
                    var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
                    var sx = ir * rx * Math.cos(startAngle), sy = ir * ry * Math.sin(startAngle), ex = ir * rx * Math.cos(endAngle), ey = ir * ry * Math.sin(endAngle);
                    var ret = [];
                    ret.push("M", sx, sy, "A", ir * rx, ir * ry, "0 0 1", ex, ey, "L", ex, h + ey, "A", ir * rx, ir * ry, "0 0 0", sx, h + sy, "z");
                    return ret.join(" ");
                };
                PieChart3D.prototype.getPercent = function (d) {
                    return (d.endAngle - d.startAngle > 0.2 ?
                        Math.round(1000 * (d.endAngle - d.startAngle) / (Math.PI * 2)) / 10 + '%' : '');
                };
                return PieChart3D;
            }(react_1.default.Component));
            exports_1("PieChart3D", PieChart3D);
        }
    };
});
//# sourceMappingURL=PieChart3D.js.map