import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//create AuthService class - This is a service, which mean if we need to remove appwrite and use other service we can do minimal modification and get code working.
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //create method to create account - use async await.
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //call another method
        this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //create login method
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //create getCurrentUser method
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
    }
    return null;
  }

  //create logout method
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
    }
  }
}

//instead of exporting class we're creating object and will export that, this is very convenient way.
const authService = new AuthService();

export default authService;
