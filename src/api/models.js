// Subject
export class Subject {
    constructor(name, numberOfLessons, numberOfLessonsPerWeek, teacher) {
        this.name = name;
        this.numberOfLessons = numberOfLessons;
        this.numberOfLessonsPerWeek = numberOfLessonsPerWeek;
        this.filledInThisWeek = 0;
        this.teacher = teacher;
    }
}

// Class
export class Class {
    constructor(name, shift, subjects) {
        this.name = name;
        this.shift = shift;
        this.subjects = subjects;
        this.timetable = [];
    }
}