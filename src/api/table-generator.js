import {printClassesTimetable, writeToCell} from './table-html';

// MARK: - Private functions
function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function recursivelyFill(thead, tbody, classes, teachers, row, column) {
    // get needed variables
    const dayIndex = column;
    const classIndex = getClassIndex(row);

    if (column === -1) {
        return false;
    }

    // if classIndex === classes.count of class, we reached the end
    if (classIndex === 0 && column === 6) {
        return true;
    }

    let lessonIndex = getClassLessonIndex(row);
    if (classes[classIndex].shift === "CHIEU") {
        lessonIndex = lessonIndex + 4;
    }

    // find possible variants
    let variants = classes[classIndex].subjects.filter(subject => {
        // find teacher
        let teacher = teachers.find(teacher => teacher.name === subject.teacher);
        // console.log(teacher);
        // console.log(dayIndex, lessonIndex);
        // console.log(teacher.isFreeAt(dayIndex, lessonIndex));
        // console.log(teacher.hasLessonOf(classes[classIndex].name, dayIndex));
        // check teacher
        let isTeacherAvailable = !teacher.has2LessonsOf(classes[classIndex].name, dayIndex) &&
            teacher.isFreeAt(dayIndex, lessonIndex)
        // check if subject is filled
        let isNotFilledInThisWeek = subject.filledInThisWeek < subject.numberOfLessonsPerWeek
        return isTeacherAvailable && isNotFilledInThisWeek
    })

    // TODO: sort later, right now just shuffle
    shuffle(variants);

    // find variant that suitable
    for (let i = 0; i < variants.length; i++) {
        // console.log(variants[i]);
        // fill classes timetable
        classes[classIndex].timetable[dayIndex][lessonIndex] = variants[i].name;
        let subjectIndex = classes[classIndex].subjects.findIndex(subject => subject.name === variants[i].name);
        classes[classIndex].subjects[subjectIndex].filledInThisWeek += 1;

        // fill teacher's timetable
        let teacherIndex = teachers.findIndex(teacher => teacher.name === variants[i].teacher);
        teachers[teacherIndex].timetable[dayIndex][lessonIndex] = classes[classIndex].name;

        // fill cell
        writeToCell(row, column, variants[i].name);
        await sleep(100);

        // next
        let indexes = nextCellIndex(row, column, classes.length);
        let fillNextResult = await recursivelyFill(
            thead,
            tbody,
            classes,
            teachers,
            indexes.rowIndex,
            indexes.columnIndex
        );

        // detect case
        if (fillNextResult === true) {
            // POSSIBLE CASE
            return true
        } else {
            classes[classIndex].timetable[dayIndex][lessonIndex] = "";
            classes[classIndex].subjects[subjectIndex].filledInThisWeek -= 1;
            teachers[teacherIndex].timetable[dayIndex][lessonIndex] = "";
            writeToCell(row, column, "");
            await sleep(100);
        }
    }

    // fill previous
    let indexes = prevCellIndex(row, column, classes.length);
    return await recursivelyFill(
        thead,
        tbody,
        classes,
        teachers,
        indexes.rowIndex,
        indexes.columnIndex
    );
}

function getClassIndex(lessonIndex) {
    return Math.floor(lessonIndex/4)
}

function getClassLessonIndex(lessonIndex) {
    return lessonIndex % 4
}

function prevCellIndex(rowIndex, columnIndex, classesLength) {
    if (rowIndex === 0) {
        return {
            rowIndex: classesLength * 4 - 1,
            columnIndex: columnIndex - 1
        }
    }

    return {
        rowIndex: rowIndex - 1,
        columnIndex:  - 1
    }
}

function nextCellIndex(rowIndex, columnIndex, classesLength) {
    if (rowIndex + 1 === classesLength * 4) {
        return {
            rowIndex: 0,
            columnIndex: columnIndex + 1
        }
    }
    return {
        rowIndex: rowIndex + 1,
        columnIndex
    }
}

// MARK: - Public function
export async function createTimetableForClass(thead, tbody, classes, teachers) {
    printClassesTimetable(thead, tbody, classes);
    await recursivelyFill(thead, tbody, classes, teachers, 0, 0);

    // check
    console.log(teachers.map(cl => cl.timetable));
    console.log(classes.map(cl => cl.timetable));
}