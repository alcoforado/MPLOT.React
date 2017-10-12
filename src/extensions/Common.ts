export class NameValueColor {
    Name:string;
    Value:number;
    Color:string;
}

export interface NameValuePair {Name:string;Value:Number};

export interface DictionaryPair<T> {Name:string;Value:T};