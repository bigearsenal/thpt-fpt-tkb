function createHeaderForWeek(tr) {
    const headers = ["LOP","CA","TUAN","TIET","T2","T3","T4","T5","T6","T7"];
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        th.innerText = headers[i];
        tr.appendChild(th);
        tr.className = "last";
    }
}

function addTd(tr,text,id) {
    let td = document.createElement('td');
    td.innerText = text;
    if (id) {
        td.id = id
    }
    tr.appendChild(td);
}

function addTr(tbody,content,isLast) {
    let tr = document.createElement('tr');
    if (isLast) {
        tr.className = "last";
    }
    for (let i = 0; i < content.length; i++) {
        addTd(tr, content[i].text, content[i].id);
    }
    tbody.appendChild(tr);
}

export function printClassesTimetable(thead, tbody, classes) {
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
            {text: classes[i].name},
            {text: classes[i].shift},
            {text: 1},
            {text: classes[i].lessonIndexes[0] + 1}
        ].concat([
            {text: classes[i].timetable[0][classes[i].lessonIndexes[0]], id: i * 4 + "-0"},
            {text: classes[i].timetable[1][classes[i].lessonIndexes[0]], id: i * 4 + "-1"},
            {text: classes[i].timetable[2][classes[i].lessonIndexes[0]], id: i * 4 + "-2"},
            {text: classes[i].timetable[3][classes[i].lessonIndexes[0]], id: i * 4 + "-3"},
            {text: classes[i].timetable[4][classes[i].lessonIndexes[0]], id: i * 4 + "-4"},
            {text: classes[i].timetable[5][classes[i].lessonIndexes[0]], id: i * 4 + "-5"},
        ]))

        for (let j = 1; j < 4; j++) {
            addTr(tbody, [{text: ""}, {text: ""}, {text: ""}, {text: classes[i].lessonIndexes[j] + 1}].concat([
                {text: classes[i].timetable[0][classes[i].lessonIndexes[j]], id: j + i * 4 + "-0"},
                {text: classes[i].timetable[1][classes[i].lessonIndexes[j]], id: j + i * 4 + "-1"},
                {text: classes[i].timetable[2][classes[i].lessonIndexes[j]], id: j + i * 4 + "-2"},
                {text: classes[i].timetable[3][classes[i].lessonIndexes[j]], id: j + i * 4 + "-3"},
                {text: classes[i].timetable[4][classes[i].lessonIndexes[j]], id: j + i * 4 + "-4"},
                {text: classes[i].timetable[5][classes[i].lessonIndexes[j]], id: j + i * 4 + "-5"}
            ]), j === 3);
        }
    }
}