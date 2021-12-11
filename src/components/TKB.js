import {loadData} from "../api";

import workbook from "../../data/TKB.xlsx";

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function createHeaderForWeek(tr) {
    const headers = ["LOP","CA","TUAN","TIET","T2","T3","T4","T5","T6","T7"];
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        th.innerText = headers[i];
        tr.appendChild(th);
    }
}

function addTd(tr,text) {
    let td = document.createElement('td');
    td.innerText = text;
    tr.appendChild(td);
}

function addTr(tbody,texts) {
    let tr = document.createElement('tr');
    for (let i = 0; i < texts.length; i++) {
        addTd(tr,texts[i]);
    }
    tbody.appendChild(tr);
}

function fillTable(tbody, classes) {
    for (let i = 0; i < classes.length; i++) {
        addTr(tbody, [
            classes[i].name,
            classes[i].shift,
            1,
            classes[i].lessonIndexes[0]
        ].concat([
            classes[i].timetable.mon[classes[i].lessonIndexes[0]],
            classes[i].timetable.tue[classes[i].lessonIndexes[0]],
            classes[i].timetable.wed[classes[i].lessonIndexes[0]],
            classes[i].timetable.thu[classes[i].lessonIndexes[0]],
            classes[i].timetable.fri[classes[i].lessonIndexes[0]],
            classes[i].timetable.sat[classes[i].lessonIndexes[0]],
        ]))

        for (let j = 0; j < 4; j++) {
            addTr(tbody, ["", "", "", ""].concat([
                classes[i].timetable.mon[classes[i].lessonIndexes[j]],
                classes[i].timetable.tue[classes[i].lessonIndexes[j]],
                classes[i].timetable.wed[classes[i].lessonIndexes[j]],
                classes[i].timetable.thu[classes[i].lessonIndexes[j]],
                classes[i].timetable.fri[classes[i].lessonIndexes[j]],
                classes[i].timetable.sat[classes[i].lessonIndexes[j]]
            ]));
        }
    }
}

async function TKB() {
    // document div
    const div = document.createElement('div');
    div.className = 'main';
    document.body.appendChild(div);

    // title label
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode('Thời khoá biểu');
    h1.appendChild(h1Text);
    div.appendChild(h1);

    // table
    const border = '1px solid'
    let table = document.createElement('table');
    table.style.border = border;
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    div.appendChild(table);

    // Creating and adding header
    let tr = document.createElement('tr');
    createHeaderForWeek(tr)
    thead.appendChild(tr);

    // read excel file
    let {classes,teachers} = loadData(workbook);
    fillTable(tbody,classes)
}
export default TKB;