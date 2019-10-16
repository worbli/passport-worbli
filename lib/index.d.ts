import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { Request } from 'express';
import { Strategy as PassportStrategy, Profile as PassportProfile } from "passport";

export interface Profile extends PassportProfile {
}

export interface StrategyOption {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string;
  authorizationURL?: string;
  tokenURL?: string;
  userProfileURL?: string;
}

export interface StrategyOptionWithRequest extends StrategyOption {
  passReqToCallback: true;
}

export type VerifyFunction =
  (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => void;

export type VerifyFunctionWithRequest =
  (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => void;

export type VerifyCallback = (err?: Error | null, user?: object, info?: object) => void;

export class Strategy implements PassportStrategy {
    constructor(options: StrategyOptionWithRequest, verify: VerifyFunctionWithRequest);
    constructor(options: StrategyOption, verify: VerifyFunction);

    name: string;
    authenticate(req: Request, options?: object): void;
}
