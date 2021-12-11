import {printClassesTimetable} from './table-html'

// MARK: - Private functions
function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function recursivelyFill(classes, lessonIndex, dayIndex, attempt) {
    if (fill(classes, lessonIndex, dayIndex) === true) {
        const nli = nextLessonIndex(lessonIndex);
        const ndi = nextDayIndex(dayIndex);

        if (nli > classes.length * 4) {
            return false
        }
        return recursivelyFill(classes, nli, ndi, 0)
    } else {
        const pli = previousLessonIndex(lessonIndex);
        const pdi = previousDayIndex(dayIndex);
        if (pli === -1) {
            alert("Can not create scheduler");
            return
        }
        return recursivelyFill(classes, pli, pdi, attempt + 1)
    }
}

function fill(classes, lessonIndex, dayIndex) {
    return true;
}

function previousLessonIndex(lessonIndex) {
    return lessonIndex - 1
}

function previousDayIndex(dayIndex) {
    if (dayIndex === 0) {
        return 5
    }
    return dayIndex - 1
}

function nextLessonIndex(lessonIndex) {
    return lessonIndex + 1
}

function nextDayIndex(dayIndex) {
    if (dayIndex === 5) {
        return 0
    }
    return dayIndex + 1
}

// MARK: - Public function
export async function createTimetableForClass(thead, tbody, classes) {
    recursivelyFill(classes, 0, 0, 0);

    printClassesTimetable(thead, tbody, classes);
    await sleep(300);
}