    import {NameValuePair} from './common'
    export class MArray {
    static propertiesToNumberArray(d:any):Array<NameValuePair>
    {
        let a=[];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                a.push({Name: col,Value: Number(d[col])})
        // do stuff
            }
        }
        return a;

    }
    static mapForEachProperty<T>(d:any,f:(col:string,value:any)=>T):Array<T>
    {
        let a=[];
        for (var col in d) {
            if (d.hasOwnProperty(col)) {
                var elem = f(col,d[col]);
                if (elem !== null)
                {
                    a.push(elem)
                }
            }
        }
        return a;
    }
}

  


