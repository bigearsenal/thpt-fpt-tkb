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
}

// Time table
export class Timetable {
    constructor() {
        this.mon = ["", "", "", "", "", "", "", ""]
        this.tue = ["", "", "", "", "", "", "", ""]
        this.wed = ["", "", "", "", "", "", "", ""]
        this.thu = ["", "", "", "", "", "", "", ""]
        this.fri = ["", "", "", "", "", "", "", ""]
        this.sat = ["", "", "", "", "", "", "", ""]
    }
}