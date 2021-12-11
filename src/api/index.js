import {Subject, Class} from "./models";
import XLSX from "xlsx";

// Private functions
function getCell(cells,row, col) {
    let ref = XLSX.utils.encode_cell({c:col, r:row});
    let desired_cell = cells[ref];
    return desired_cell ? desired_cell.v : undefined
}

// Public functions
export function loadData(workbook) {
    // get Sheet 1
    let first_sheet_name = workbook.SheetNames[0];
    let cells = workbook.Sheets[first_sheet_name];

    // A1: K21
    const numberOfClasses = 18
    const numberOfSubjects = 7

    // classes
    let classes = [];
    for (let i = 0; i < numberOfClasses; i++) { // row
        const r = i + 1;
        const className = getCell(cells,r,1);
        const classShift = getCell(cells,r,2);
        let subjects = [];

        for (let j = 0; j < numberOfSubjects; j++) {
            let subjectName = getCell(cells,0,j+3);
            let numberOfLesson = getCell(cells,19,j+3);
            let numberOfLessonPerWeek = getCell(cells,20,j+3);
            let teacherName = getCell(cells,1,j+3);
            let newSubject = new Subject(subjectName,numberOfLesson,numberOfLessonPerWeek,teacherName);
            subjects.push(newSubject);
        }

        let newClass = new Class(className, classShift, subjects);
        classes.push(newClass);
    }
    console.log(classes);

    // teachers

    return {classes}
}
