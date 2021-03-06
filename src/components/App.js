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
var EventsOcurrenceChart_1 = require("./EventsOcurrenceChart");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var data = {
            A1: "40",
            A2: "30",
            A3: "100"
        };
        return (React.createElement("div", null,
            React.createElement("h1", null, "Ocurrences of errors for Web Portal since 01/01/2017"),
            React.createElement(EventsOcurrenceChart_1.EventsOcurrenceChart, null)));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=App.js.map