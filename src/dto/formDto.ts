export interface fieldData {
    value: string,
    type: string,
    subtype?: string,
}

export enum subtypes {
    FILE = 'file',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    SUBMIT = 'submit',
}
