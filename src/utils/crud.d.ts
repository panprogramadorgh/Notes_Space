export interface FindOne {
  (query: any): Promise<any | null>;
}

export interface Find {
  (query: any): Promise<any[]>;
}

export interface Create {
  (documentData: any): Promise<never | any>;
}

export interface Update {
  (filter: any, update: any): Promise<any>;
}

export interface Validate {
  (documentData: any): Promise<void | never>;
}
