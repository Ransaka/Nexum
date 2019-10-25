export interface User {
  _id?: string;
  email?: string;
  password?: String;
  username?: string;
  firstname?: string;
  lastname?: string;
  broadcast?: Array<Object>;
  selling?: Array<Object>;
  overallrating?: Number;
  ratings?: Array<Object>;
  profileImage?: string;
}

export interface UserView {
  _id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  telephone: string;
  line1: string;
  line2: string;
}

export interface Username {
  username: string;
  replying?:Array<object>;
}
