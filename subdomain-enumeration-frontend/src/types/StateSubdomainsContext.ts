export interface StateSubdomainsContext {
    subdomains : string[];
    setSubDomains : (subdomains : string[]) => void;
}

export enum subdomainDisplayFormatEnum  {
    TABLE,
    JSON,
    TEXT 
}   

export type subdomainDisplayFormat = keyof typeof subdomainDisplayFormatEnum;

