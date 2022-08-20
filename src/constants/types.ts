export interface CreateElementInterface {
    type: string;
    parentElement: HTMLElement;
    classes?: string[];
    text?: string;
    attributes?: [string, string][];
}

export enum Levels {
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
}
