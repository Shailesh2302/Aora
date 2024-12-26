import { Redirect } from "expo-router";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const conf = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "676cd296003335b64c4a",
  databaseId: "676cd39d0019f86d77a4",
  userCollectionId: "676cd3c4002c567f5658",
  videoCollectionId: "676cd3ff0004e9941ef9",
  storageId: "676cd64200272fa96908",
};

const {
  endpoint,
  platform,
  projectI,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = conf;

const client = new Client();

client
  .setEndpoint(conf.endpoint)
  .setProject(conf.projectId)
  .setPlatform(conf.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  //   console.log("createUser params:", { email, password, username });
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    // console.log("New Account:", newAccount);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      conf.databaseId,
      conf.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.error("Error in signIn:", error.message);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      conf.databaseId,
      conf.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
