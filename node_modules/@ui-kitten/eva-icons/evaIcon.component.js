"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaIcon = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class EvaIcon {
    content;
    constructor(content) {
        this.content = content;
    }
    toReactElement(props) {
        const Icon = this.content;
        const { style, ...svgProps } = props;
        // @ts-ignore - UI Kitten components pass here `tintColor`
        const fillColor = react_native_1.StyleSheet.flatten(style || {}).tintColor;
        return (<Icon style={props.style} fill={fillColor} {...svgProps}/>);
    }
}
exports.EvaIcon = EvaIcon;
//# sourceMappingURL=evaIcon.component.js.map