import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
// type of abstraction as a class
export class AuthService{
    client=new Client();
    account;

    constructor(){ // constructor is used to initialize the object
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);    
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){ 
        // create account function, async because it will take time to create account bcz it is a promise
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method, auto login
                return this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service: createAccount() error",error);
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);  
        } catch (error) {
            console.log("Appwrite service: login() error",error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service: getCurrentUser() error",error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite service: logout() error",error);
        }
    }
}

const authService=new AuthService();        

export default authService;