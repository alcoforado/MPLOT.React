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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var d3 = require("d3");
var SvgTooltip_1 = require("./SvgTooltip");
var ColorGenerator_1 = require("../extensions/ColorGenerator");
var PieChart3D_1 = require("./PieChart3D");
var Extensions = require("../extensions/extensions");
var EventsOcurrenceChart = /** @class */ (function (_super) {
    __extends(EventsOcurrenceChart, _super);
    function EventsOcurrenceChart() {
        var _this = _super.call(this) || this;
        _this.svgId = "svgId";
        _this.tip = null;
        _this.colors = ColorGenerator_1.ColorGenerator.GetHighContrastPallette();
        _this.since = new Date(2017, 0, 1);
        _this.state = { errorsTip: [], errDict: [], dateTip: _this.since };
        return _this;
    }
    EventsOcurrenceChart.prototype.render = function () {
        var _this = this;
        var pieSize = Math.min(this.getEstimatedTooltipHeight(), 300);
        return (React.createElement("div", { id: "main" },
            React.createElement("svg", { id: this.svgId, width: 2100, ref: function (node) { return _this.svgNode = node; }, height: 500 }),
            React.createElement(SvgTooltip_1.SvgToolTip, { ref: function (tip) { return _this.tip = tip; }, svgNodeId: this.svgId },
                React.createElement("div", { className: "tooltip-title" },
                    "On ",
                    this.state.dateTip.toDateString()),
                React.createElement("div", { className: "container-panel-side-by-side" },
                    React.createElement("div", { className: "panel-side-by-side" }, this.state.errorsTip.map(function (value, i) {
                        return (React.createElement("div", { className: "vertical-space-small" },
                            React.createElement("div", { style: { backgroundColor: value.Color }, className: "div-bullet" }),
                            React.createElement("strong", null,
                                " ",
                                value.Name,
                                ": "),
                            React.createElement("span", { style: { color: 'red' } }, value.Value)));
                    })),
                    React.createElement("div", { className: "vertical-blur-separator" }, " "),
                    React.createElement("div", { className: "panel-side-by-side" },
                        React.createElement(PieChart3D_1.PieChart3D, { data: this.state.errorsTip, excentricity: 0.8, width: pieSize, height: pieSize, height3D: 0.1 * pieSize })))),
            React.createElement("h1", null, "Error Dictionary"),
            React.createElement("table", null,
                React.createElement("tbody", null, this.state.errDict.map(function (elem) {
                    return React.createElement("tr", null,
                        React.createElement("td", null, elem.Name),
                        React.createElement("td", null, elem.Value));
                })))));
    };
    EventsOcurrenceChart.prototype.onSetState = function (d) {
        var _this = this;
        var errs = this.mostOcurredErrors(d);
        if (this.colors.length < errs.length) {
            this.colors.push("black");
        }
        var pd = errs.map(function (el, i) {
            return {
                Name: el.Name,
                Color: _this.colors[i],
                Value: el.Value
            };
        });
        this.setState({
            errorsTip: pd,
            errDict: this.getErrorDictionary(d),
            dateTip: new Date(this.since.getTime() + Number(d.Day) * 86400000)
        });
    };
    EventsOcurrenceChart.prototype.getErrorDictionary = function (d) {
        return Extensions.MArray.mapForEachProperty(d, function (col, value) {
            var elems = col.split("=>");
            if (elems.length != 2)
                return null;
            else {
                return {
                    Name: elems[0].trim(),
                    Value: elems[1].trim()
                };
            }
        });
    };
    EventsOcurrenceChart.prototype.propertiesToArray = function (d) {
        var a = [];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                var colShort = col.split("=")[0];
                a.push({ Name: colShort, Value: Number(d[col]) });
                // do stuff
            }
        }
        return a;
    };
    EventsOcurrenceChart.prototype.getEstimatedTooltipHeight = function () {
        return this.state.errorsTip.length * 12;
    };
    EventsOcurrenceChart.prototype.mostOcurredErrors = function (d) {
        var a = this.propertiesToArray(d);
        a = a.sort(function (a, b) { return b.Value - a.Value; });
        return a.filter(function (elem) {
            return elem.Name !== "Day" && elem.Value != 0 && elem.Name.toLowerCase() != "total";
        }, a);
    };
    EventsOcurrenceChart.prototype.componentDidMount = function () {
        var margin = { top: 40, right: 20, bottom: 30, left: 40 }, width = 2100 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;
        var formatPercent = d3.format(".0%");
        var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);
        this.tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .direction(SvgTooltip_1.TipDirection.e);
        var svg = d3.select(this.svgNode)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // svg.call(tip);
        var that = this;
        d3.tsv("data2017.tsv", filter, function (error, data) {
            x.domain(data.map(function (d) { return d.Day; }));
            y.domain([0, d3.max(data, function (d) { return d.total; })]);
            xAxis.tickValues(x.domain().filter(function (d, i) { return !(i % 30); })).tickFormat(function (d) { return new Date(that.since.getTime() + Number(d)).toDateString(); });
            that.setState({
                errDict: that.getErrorDictionary(data[0]),
                errorsTip: [],
                dateTip: new Date(that.since)
            });
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
                .attr("x", function (d) { return x(d.Day); })
                .attr("width", x.bandwidth())
                .attr("y", function (d) { return y(d.total); })
                .attr("height", function (d) { return height - y(d.total); })
                .on('mouseover', function (d) { that.onSetState(d); that.tip.show(); })
                .on('mouseout', function () { that.tip.hide(); });
        });
        function filter(d) {
            var total = 0;
            for (var col in d) {
                if (d.hasOwnProperty(col)) {
                    total += Number(d[col]);
                    // do stuff
                }
            }
            d.total = total;
            return d;
        }
    };
    return EventsOcurrenceChart;
}(React.Component));
exports.EventsOcurrenceChart = EventsOcurrenceChart;
//# sourceMappingURL=EventsOcurrenceChart.js.map