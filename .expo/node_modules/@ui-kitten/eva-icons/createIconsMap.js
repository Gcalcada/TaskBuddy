"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIconsMap = void 0;
const icons_1 = require("react-native-eva-icons/icons");
const evaIcon_component_1 = require("./evaIcon.component");
const createIconsMap = () => {
    return new Proxy({}, {
        get(target, name) {
            return new evaIcon_component_1.EvaIcon((0, icons_1.findIconByName)(name));
        },
    });
};
exports.createIconsMap = createIconsMap;
//# sourceMappingURL=createIconsMap.js.map