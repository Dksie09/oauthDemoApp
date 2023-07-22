import { Client, Account } from "appwrite";
const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_ENDPOINT)
  .setProject(process.env.REACT_APP_PROJECT_ID);

const account = new Account(client);

export const sdk = {
  register: async (success, failure) => {
    account.createOAuth2Session("github", success, failure);
  },

  getAccount: async () => {
    return await account.get();
  },

  getSession: async () => {
    return await account.getSession("current");
  },

  getGithubData: async () => {
    const promise = await account.getSession("current");
    console.log(promise.providerAccessToken);

    const response = await fetch("https://api.github.com/user", {
      headers: { Authorization: `token ${promise.providerAccessToken}` },
    });
    return await response.json();
  },

  logout: async () => {
    return await account.deleteSession("current");
  },
};
