import {printClassesTimetable} from './table-html'

// MARK: - Private functions
function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function recursivelyFill(classes, lessonIndex, dayIndex) {
    // condition to end loop (false/true)

    // if there are possible variant, attempt, return these value, else find all possible variants (and sort), save variants, attempt = 0

    // if variants.length == 0 || attempt == variants.length, remove variants, attempt, move back previous

    // else fill with variants[attempt], save attempt

    // show table, sleep 300

    // if fill next = true, return true

    // else save attempt + 1, fill current

    if (fill(classes, lessonIndex, dayIndex) === true) {
        const next = nextIndexes(lessonIndex, dayIndex);
        if (next.lessonIndex > classes.length * 4) {
            return true
        }
        return recursivelyFill(classes, next.lessonIndex, next.dayIndex, 0)
    } else {
        const previous = previousIndexes(lessonIndex, dayIndex);
        if (previous.lessonIndex === -1) {
            alert("Can not create scheduler");
            return false
        }
        return recursivelyFill(classes, previous.lessonIndex, previous.dayIndex, attempt + 1)
    }
}

function fill(classes, lessonIndex, dayIndex) {
    return true;
}

function previousIndexes(lessonIndex, dayIndex) {
    if (dayIndex === 0) {
        return {
            lessonIndex: lessonIndex - 1,
            dayIndex: 5
        }
    }
    return {lessonIndex, dayIndex: dayIndex - 1}
}

function nextIndexes(lessonIndex, dayIndex) {
    if (dayIndex === 5) {
        return {
            lessonIndex: lessonIndex + 1,
            dayIndex: 0
        }
    }
    return {lessonIndex, dayIndex: dayIndex + 1}
}

// MARK: - Public function
export async function createTimetableForClass(thead, tbody, classes) {
    // recursivelyFill(classes, 0, 0);

    printClassesTimetable(thead, tbody, classes);
    await sleep(300);
}