export type Permission = {
  action: string,
  enable: boolean
};

export type AuthToken = {
  "token": string,
  "expireIn": number,
  "refreshToken": string,
  "sign": string
};

export type PersonInfo = {
  name: string,
  family: string,
  email: string
};

export type LoginParams = {
  login: string,
  password: string
}
