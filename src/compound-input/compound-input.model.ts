interface Option {
    value: string;
    label: string;
}

export class CompoundInputModel {
    constructor(public input: string, public exchange: Option) {}
  }
  