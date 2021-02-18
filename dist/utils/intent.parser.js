"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntents = void 0;
// eslint-disable-next-line import/prefer-default-export
const parseIntents = (intents) => {
    console.log('In parser');
    return intents
        .map((intent) => ({
        intentName: intent.name,
        question: intent.displayName,
        answer: JSON.stringify(intent.messages),
    }));
};
exports.parseIntents = parseIntents;
//# sourceMappingURL=intent.parser.js.map