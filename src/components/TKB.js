import {loadData} from "../api/exel-file-reader";
import {createTimetableForClass} from "../api/table-generator";
import workbook from "../../data/TKB.xlsx";

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

    // read excel file
    let {classes,teachers} = loadData(workbook);
    createTimetableForClass(thead, tbody,classes);
}
export default TKB;