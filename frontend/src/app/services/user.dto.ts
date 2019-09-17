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
}
