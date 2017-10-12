System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CollorGenerator;
    return {
        setters: [],
        execute: function () {
            CollorGenerator = /** @class */ (function () {
                function CollorGenerator() {
                }
                CollorGenerator.prototype.GetHighContrastPallette = function (size) {
                    var staticPick = ["red", "green", "blue", "orange", "crimson", "cyan", "lightsalmon", "burlywood", "darkorange", "deepskyblue", "yellow", "turquoise", "darkblue", "gold", "darkgreen",
                        ,
                        "magenta",
                        "lavender",
                        "tomato",
                        "darkslateblue",
                        "coral",
                        "slateblue",
                        "maroon",
                        "greenyellow",
                        "sienna",
                        "slategray",
                        "blueviolet",
                        "olivedrab",
                        "darkorange",
                        "indigo",
                        "goldenrod",
                        "dimgray",
                        "darkorchid",
                        "saddlebrown",
                        "darkcyan",
                        "mocassin",
                        "chocolate"
                    ];
                    while (size > staticPick.length) {
                        staticPick.push("black");
                    }
                    return staticPick;
                };
                return CollorGenerator;
            }());
            exports_1("CollorGenerator", CollorGenerator);
        }
    };
});
//# sourceMappingURL=collorGenerator.js.map