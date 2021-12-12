// Subject
export class Subject {
    constructor(name, numberOfLessons, numberOfLessonsPerWeek, teacherName) {
        this.name = name;
        this.numberOfLessons = numberOfLessons;
        this.numberOfLessonsPerWeek = numberOfLessonsPerWeek;
        this.filledInThisWeek = 0;
        this.teacher = teacherName;
    }
}

// Class
export class Class {
    constructor(name, shift, subjects) {
        this.name = name;
        this.shift = shift;
        this.subjects = subjects;
        this.timetable = new Timetable();
    }

    get lessonIndexes() {
        let indexes = [0,1,2,3];
        if (this.shift === "CHIEU") {
            indexes = indexes.map(index => index + 4);
        }
        return indexes
    }
}

// Teacher
export class Teacher {
    constructor(name, subjectName) {
        this.name = name;
        this.subjectName = subjectName
        this.timetable = new Timetable();
    }

    isFreeAt(dayIndex, lessonIndex) {
        return this.timetable[dayIndex][lessonIndex] === "";
    }

    hasLessonOf(className, dayIndex) {
        for (let i = 0; i < 8; i++) {
            if (this.timetable[dayIndex][i] !== "") {
                return true;
            }
        }
        return false;
    }
}

// Time table
export class Timetable {
    constructor() {
        this[0] = ["", "", "", "", "", "", "", ""]
        this[1] = ["", "", "", "", "", "", "", ""]
        this[2] = ["", "", "", "", "", "", "", ""]
        this[3] = ["", "", "", "", "", "", "", ""]
        this[4] = ["", "", "", "", "", "", "", ""]
        this[5] = ["", "", "", "", "", "", "", ""]
    }
}