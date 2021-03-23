import { makeAutoObservable } from "mobx";

export interface User {
  username: string;
  id: string;
  bilibiliUid: string;
  bilibiliCookie: string;
}
export class GlobalProvider {
  constructor() {
    makeAutoObservable(this);
  }

  user: User = {} as User;

  setUser(user: User) {
    this.user = user;
  }
}
