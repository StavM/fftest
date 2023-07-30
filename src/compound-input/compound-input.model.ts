export interface CompoundInputOption {
    value: string;
    label: string;
}

export class CompoundInputModel {
    constructor(public input: string, public select: string) { }
}

export const defaultCompoundInput = new CompoundInputModel('', '') ;
