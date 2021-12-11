import {Workbook} from "exceljs";
import {Subject, Class} from "./models";

// Private functions

// Public functions
export function loadData(workbook) {
    const worksheet = workbook.getWorksheet("Sheet 1");
    // A1: K21
    const numberOfClasses = 18
    const numberOfSubjects = 7

    // classes
    let classes = [];
    for (let i = 0; i < numberOfClasses; i++) { // row
        const r = i + 2;
        const className = worksheet.getCell(r,3);
        const classShift = worksheet.getCell(r,4);
        let subjects = [];

        for (let j = 0; j < numberOfSubjects; j++) {
            subjects.push(worksheet.getCell(1,j+5));
        }

        classes.push(Class(className, classShift, subjects));
    }
    console.log(classes.length);
    return {classes}
}
