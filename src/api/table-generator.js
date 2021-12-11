import {printClassesTimetable} from './table-html';

// MARK: - Private functions
function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

async function recursivelyFill(thead, tbody, classes, row, column) {
    // get needed variables
    const dayIndex = column;
    const classIndex = getClassIndex(row);
    let lessonIndex = getClassLessonIndex(row);
    if (classes[classIndex].shift === "CHIEU") {
        lessonIndex = lessonIndex + 4;
    }

    // if classIndex === classes.count of class, we reached the end
    if (classIndex === classes.length) {
        return true
    }

    // TODO: find possible variants, sort if needed
    let variants = [];

    // for variant in variants
    for (let i = 0; i < variants.count; i++) {
        // fill classes timetable
        classes[classIndex].timetable[dayIndex][lessonIndex] = variants[i];

        // TODO: - Fill teacher's timetable

        // print table
        printClassesTimetable(thead, tbody, classes);
        await sleep(300); // sleep to see result in real time

        // next
        let indexes = nextCellIndex(row, column);
        let fillNextResult = await recursivelyFill(
            thead,
            tbody,
            classes,
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

    // print
    printClassesTimetable(thead, tbody, classes);
    await sleep(300); // sleep to see result in real time

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
export async function createTimetableForClass(thead, tbody, classes) {
    // await recursivelyFill(thead, tbody, classes, 0, 0);

    printClassesTimetable(thead, tbody, classes);
    await sleep(300);
}