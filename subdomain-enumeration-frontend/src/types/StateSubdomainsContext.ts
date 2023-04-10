export interface StateSubdomainsContext {
    subdomains : subdomainWithStatusCode[] | null;
    setSubDomains : (subdomains : subdomainWithStatusCode[]) => void;
}

export type subdomainWithStatusCode={
    subdomain:string,
    statuscode:number
} 
export enum subdomainDisplayFormatEnum  {
    TABLE,
    JSON,
    TEXT 
}   

export type subdomainDisplayFormat = keyof typeof subdomainDisplayFormatEnum;

