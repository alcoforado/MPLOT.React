System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ColorGenerator;
    return {
        setters: [],
        execute: function () {
            ColorGenerator = /** @class */ (function () {
                function ColorGenerator() {
                }
                ColorGenerator.GetHighContrastPallette = function () {
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
                    return staticPick;
                };
                return ColorGenerator;
            }());
            exports_1("ColorGenerator", ColorGenerator);
        }
    };
});
//# sourceMappingURL=ColorGenerator.js.map