export interface TStateSubdomainsContext {
    subdomains : TsubdomainWithStatusCode[];
    setSubDomains : (subdomains : TsubdomainWithStatusCode[]) => void;
}

// export type Tstate = {domain:string,subdomains:TsubdomainWithStatusCode[]}[]

export type TsubdomainWithStatusCode={
    subdomain:string,
    statuscode:number,
    screenshot:string
} 

export enum EsubdomainDisplayFormatEnum  {
    TABLE,
    JSON,
    TEXT 
}   

export type TsubdomainDisplayFormat = keyof typeof EsubdomainDisplayFormatEnum;

export type TLocalStorageState = {
    domain:string,
    subdomains:TsubdomainWithStatusCode[]
}[]