import { Client, Account } from "appwrite";
const client = new Client();

// Set the endpoint and project ID for the client

const account = new Account(client);

export const sdk = {
  register: async (success, failure) => {
    // Register by creating an OAuth2 session
  },

  getAccount: async () => {
    //get account data
  },

  getSession: async () => {
    //get current session data
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
    // Delete the session
  },
};
