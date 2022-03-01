export const INPUT_INTERVAL = "InputInterval";
export const INPUT_SELECTOR = "InputSelector";
export const INPUT_CHECK = "InputCheck";
export const INPUT_RADIO = "InputRadio";
export const INPUT_DATE = "InputDate";


export enum classSelector {
    "InputInterval", "InputSelector", "InputCheck", "InputRadio", "InputDate"
}



export type FormField = {
    field: string;
    label: string;
    input: InputType
}
export abstract class InputType {
    value: any;
    constructor(param: any) {
        this.value = param;
    }
}

export class InputInterval extends InputType {
    constructor(min: number, max: number) {
        super({ min, max });
    }
}

export class InputSelector extends InputType {
    constructor(value: string[]) {
        super(value);
    }
}

export class InputCheck extends InputType {
    constructor(value: string[]) {
        super(value);
    }
}

export class InputRadio extends InputType {
    constructor(value: string[]) {
        super(value);
    }
}

export class InputDate extends InputType {
    constructor(minYear: number, maxYear: number) {
        super({ minYear, maxYear });
    }
}

export const formConfig: FormField[] = [
    { field: "courseName", label: "Course name", input: new InputSelector(["One", "Two", "Free"]) },
    { field: "lecturerName", label: "Lecture name", input: new InputSelector(["One", "Two", "Free"]) },
    { field: "hours", label: "Hours", input: new InputInterval(100, 1000) },
    { field: "cost", label: "Cost", input: new InputInterval(100, 1000) },
    { field: "openDate", label: "Date start", input: new InputDate(2015, 2023) },
    { field: "type", label: "Type", input: new InputRadio(["One", "Two", "Free"]) },
    { field: "dayEvening", label: "Day evning", input: new InputCheck(["One", "Two", "Free"]) },
];
