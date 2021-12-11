function createHeaderForWeek(tr) {
    const headers = ["LOP","CA","TUAN","TIET","T2","T3","T4","T5","T6","T7"];
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        th.innerText = headers[i];
        tr.appendChild(th);
        tr.className = "last";
    }
}

function addTd(tr,text) {
    let td = document.createElement('td');
    td.innerText = text;
    tr.appendChild(td);
}

function addTr(tbody,texts,isLast) {
    let tr = document.createElement('tr');
    if (isLast) {
        tr.className = "last";
    }
    for (let i = 0; i < texts.length; i++) {
        addTd(tr, texts[i]);
    }
    tbody.appendChild(tr);
}

function printClassesTimetable(thead, tbody, classes) {
    // Clear body and header
    tbody.innerHTML = ""
    thead.innerHTML = ""

    // Creating and adding header
    let tr = document.createElement('tr');
    createHeaderForWeek(tr)
    thead.appendChild(tr);

    // content
    for (let i = 0; i < classes.length; i++) {
        addTr(tbody, [
            classes[i].name,
            classes[i].shift,
            1,
            classes[i].lessonIndexes[0] + 1
        ].concat([
            classes[i].timetable[0][classes[i].lessonIndexes[0]],
            classes[i].timetable[1][classes[i].lessonIndexes[0]],
            classes[i].timetable[2][classes[i].lessonIndexes[0]],
            classes[i].timetable[3][classes[i].lessonIndexes[0]],
            classes[i].timetable[4][classes[i].lessonIndexes[0]],
            classes[i].timetable[5][classes[i].lessonIndexes[0]],
        ]))

        for (let j = 1; j < 4; j++) {
            addTr(tbody, ["", "", "", classes[i].lessonIndexes[j] + 1].concat([
                classes[i].timetable[0][classes[i].lessonIndexes[j]],
                classes[i].timetable[1][classes[i].lessonIndexes[j]],
                classes[i].timetable[2][classes[i].lessonIndexes[j]],
                classes[i].timetable[3][classes[i].lessonIndexes[j]],
                classes[i].timetable[4][classes[i].lessonIndexes[j]],
                classes[i].timetable[5][classes[i].lessonIndexes[j]]
            ]), j === 3);
        }
    }
}

export function createTimetableForClass(thead, tbody, classes) {
    printClassesTimetable(thead, tbody,classes)
}