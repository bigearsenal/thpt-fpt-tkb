import {loadData} from "../api";

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

async function TKB(workbook) {
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
    const data = loadData(workbook);
    let classes = data.classes
    for (let i = 0; i < classes.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = classes[i].name;
        tr.appendChild(td);
        tbody.appendChild(tr)
    }


}
export default TKB;