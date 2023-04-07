export interface StateSubdomainsContext {
    subdomains : string[] | null;
    setSubDomains : (subdomains : string[]) => void;
}

export type subdomainWithStatusCode={
    subdomain:string,
    statusCode:number
} 
export enum subdomainDisplayFormatEnum  {
    TABLE,
    JSON,
    TEXT 
}   

export type subdomainDisplayFormat = keyof typeof subdomainDisplayFormatEnum;

