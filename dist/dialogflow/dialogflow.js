"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dialogflow_1 = __importDefault(require("@google-cloud/dialogflow"));
class DialogFlow {
    constructor() {
        this.listIntents = () => __awaiter(this, void 0, void 0, function* () {
            const projectAgentPath = this.intentsClient.agentPath('newagent-dayq');
            console.log(projectAgentPath);
            const request = {
                parent: projectAgentPath,
            };
            // Send the request for listing intents.
            const [response] = yield this.intentsClient.listIntents(request);
            // response.forEach((intent) => {
            //   // intent.messages.forEach(mes => console.log(mes.text));
            //   console.log(intent);
            //   console.log('_______________');
            //   console.log('_______________');
            // });
            return response;
        });
        this.intentsClient = new dialogflow_1.default.IntentsClient({
            keyFilename: './newagent-dayq-ab419956af39.json/',
        });
    }
}
exports.default = DialogFlow;
//# sourceMappingURL=dialogflow.js.map