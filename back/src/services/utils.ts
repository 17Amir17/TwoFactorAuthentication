

  export function isNumber(num: unknown): num is number {
    return typeof num === 'number' && !isNaN(num);
  }
  
  export function isString(str: unknown): str is string {
    return typeof str === 'string' || str instanceof String;
  }
  
  export function isObject(obj: unknown): obj is object {
    return typeof obj === 'object' && obj != null;
  }