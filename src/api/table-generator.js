import {printClassesTimetable} from './table-html'

// MARK: - Private functions
function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function fill(classes) {
    return classes;
}

// MARK: - Public function
export function createTimetableForClass(thead, tbody, classes) {
    let filledClasses = fill(classes);
    printClassesTimetable(thead, tbody, filledClasses)
}