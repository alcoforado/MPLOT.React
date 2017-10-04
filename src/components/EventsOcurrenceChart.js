System.register(["react"], function (exports_1, context_1) {
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
    var react_1, App;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            }
        ],
        execute: function () {
            App = (function (_super) {
                __extends(App, _super);
                function App() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                App.prototype.render = function () {
                    return (react_1.default.createElement("div", null, "Hello World"));
                };
                return App;
            }(react_1.default.Component));
            exports_1("App", App);
        }
    };
});
//# sourceMappingURL=EventsOcurrenceChart.js.map