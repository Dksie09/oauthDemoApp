import { Client, Account } from "appwrite";
const client = new Client();

client
  .setEndpoint(`${process.env.REACT_APP_ENDPOINT}`)
  .setProject(`${process.env.REACT_APP_PROJECT_ID}`);

const account = new Account(client);

export const sdk = {
  register: async (success, failure) => {
    //create oauth2 session
    account.createOAuth2Session("github", success, failure);
  },

  getAccount: async () => {
    //get account data
    return await account.get();
  },

  getSession: async () => {
    //get current session data
    return await account.getSession("current");
  },

  getGithubData: async () => {
    //get user's provider access token
    const promise = await account.getSession("current");
    console.log(promise.providerAccessToken);

    //make a request to github api
    const response = await fetch("https://api.github.com/user", {
      headers: { Authorization: `token ${promise.providerAccessToken}` },
    });
    return await response.json();
  },

  logout: async () => {
    return await account.deleteSession("current");
  },
};
