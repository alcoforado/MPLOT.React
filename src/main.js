System.register(["react-dom", "react", "./components/App.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var react_dom_1, react_1, App_js_1;
    return {
        setters: [
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (App_js_1_1) {
                App_js_1 = App_js_1_1;
            }
        ],
        execute: function () {
            react_dom_1.default.render(react_1.default.createElement(App_js_1.App, null), document.getElementById("main"));
        }
    };
});
//# sourceMappingURL=main.js.map