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
        this.mon = undefined
        this.tue = undefined
        this.wed = undefined
        this.thu = undefined
        this.fri = undefined
        this.sat = undefined
    }
}