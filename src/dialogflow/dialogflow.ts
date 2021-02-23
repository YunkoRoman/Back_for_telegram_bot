import dialogflow from '@google-cloud/dialogflow';


export default class DialogFlow {
  private intentsClient;

  private projectId;

  constructor() {
    this.projectId = process.env.PROJECT_ID as string;
    const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;
    const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
    const configDialogFlow = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail,
      },
    };
    this.intentsClient = new dialogflow.IntentsClient(configDialogFlow);
  }

  public listIntents = async (): Promise<any> => {
    const projectAgentPath = this.intentsClient.agentPath(this.projectId);
    console.log(projectAgentPath);
    const request = {
      parent: projectAgentPath,
    };
      // Send the request for listing intents.
    const [response] = await this.intentsClient.listIntents(request);

    return response;
  }
}