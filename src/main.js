System.register(["react-dom", "react", "./components/EventsOcurrenceChart"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var react_dom_1, react_1, EventsOcurrenceChart_1;
    return {
        setters: [
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (EventsOcurrenceChart_1_1) {
                EventsOcurrenceChart_1 = EventsOcurrenceChart_1_1;
            }
        ],
        execute: function () {
            react_dom_1.default.render(react_1.default.createElement(EventsOcurrenceChart_1.App, null), document.getElementById("main"));
            console.log(EventsOcurrenceChart_1.App);
        }
    };
});
//# sourceMappingURL=main.js.map