"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formulaResponse = exports.default = void 0;
/* eslint-disable */
// ---
// metadata:
//     display_name: Math Expression Input
//     markdown: !!null
// data: |
const formulaResponse = exports.formulaResponse = `<problem>
    <formularesponse type="ci" samples="R_1,R_2,R_3@1,2,3:3,4,5#10" answer="R_1*R_2/R_3">
        <p>You can use this template as a guide to the OLX markup to use for math expression problems. Edit this component to replace the example with your own assessment.</p>
        <label>Add the question text, or prompt, here. This text is required. Example: Write an expression for the product of R_1, R_2, and the inverse of R_3.</label>
        <description>You can add an optional tip or note related to the prompt like this. Example: To test this example, the correct answer is R_1*R_2/R_3</description>
        <responseparam type="tolerance" default="0.00001"/>
        <formulaequationinput size="40"/>
    </formularesponse>
</problem>`;
var _default = exports.default = formulaResponse;
//# sourceMappingURL=formularesponse.js.map