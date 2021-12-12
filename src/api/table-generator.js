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

    // if classIndex === classes.count of class, we reached the end
    if (classIndex === classes.length) {
        return true
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
        console.log(variants[i]);
        // fill classes timetable
        classes[classIndex].timetable[dayIndex][lessonIndex] = variants[i].name;

        // fill teacher's timetable
        let teacherIndex = teachers.findIndex(teacher => teacher.name === variants[i].teacher);
        teachers[teacherIndex].timetable[dayIndex][lessonIndex] = classes[classIndex].name;

        // fill cell
        writeToCell(row, column, variants[i].name);
        await sleep(20); // sleep to see result in real time


        // next
        let indexes = nextCellIndex(row, column);
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
        }
    }

    // IMPOSSIBLE CASE
    // clear classes timetable
    classes[classIndex].timetable[dayIndex][lessonIndex] = ""

    // TODO: - Clear teacher timetable

    // fill cell
    writeToCell(row, column, "");

    return false

    // MARK: - algorithm 2
    // condition to end loop (false/true)

    // if there are possible variant, attempt, return these value, else find all possible variants (and sort), save variants, attempt = 0

    // if variants.length == 0 || attempt == variants.length, remove variants, attempt, move back previous

    // else fill with variants[attempt], save attempt

    // show table, sleep 300

    // if fill next = true, return true

    // else save attempt + 1, fill current
}

function getClassIndex(lessonIndex) {
    return Math.floor(lessonIndex/4)
}

function getClassLessonIndex(lessonIndex) {
    return lessonIndex % 4
}

function nextCellIndex(rowIndex, columnIndex) {
    if (columnIndex === 5) {
        return {
            rowIndex: rowIndex + 1,
            columnIndex: 0
        }
    }
    return {rowIndex: rowIndex, columnIndex: columnIndex + 1}
}

// MARK: - Public function
export async function createTimetableForClass(thead, tbody, classes, teachers) {
    printClassesTimetable(thead, tbody, classes);
    await recursivelyFill(thead, tbody, classes, teachers, 0, 0);
}