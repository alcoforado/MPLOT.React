"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MArray = /** @class */ (function () {
    function MArray() {
    }
    MArray.propertiesToNumberArray = function (d) {
        var a = [];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                a.push({ Name: col, Value: Number(d[col]) });
                // do stuff
            }
        }
        return a;
    };
    MArray.mapForEachProperty = function (d, f) {
        var a = [];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                var elem = f(col, d[col]);
                if (elem !== null) {
                    a.push(elem);
                }
            }
        }
        return a;
    };
    return MArray;
}());
exports.MArray = MArray;
//# sourceMappingURL=extensions.js.map