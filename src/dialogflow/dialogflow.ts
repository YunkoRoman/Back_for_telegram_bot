import dialogflow from '@google-cloud/dialogflow';

export default class DialogFlow {
  private intentsClient;

  constructor() {
    this.intentsClient = new dialogflow.IntentsClient({
      keyFilename: './newagent-dayq-ab419956af39.json/',
    });
  }

  public listIntents = async (): Promise<any> => {
    const projectAgentPath = this.intentsClient.agentPath('newagent-dayq');
    console.log(projectAgentPath);
    const request = {
      parent: projectAgentPath,
    };
      // Send the request for listing intents.
    const [response] = await this.intentsClient.listIntents(request);
    // response.forEach((intent) => {
    //   // intent.messages.forEach(mes => console.log(mes.text));
    //   console.log(intent);
    //   console.log('_______________');
    //   console.log('_______________');
    // });
    return response;
  }
}
