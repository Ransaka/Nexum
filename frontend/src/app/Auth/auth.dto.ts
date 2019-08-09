export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  auth: boolean;
  accessToken: string;
  expiresIn: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}
