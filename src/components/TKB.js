import {readExcelFile} from "../api";

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
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
    let border = '1px solid black'
    const tbl = document.createElement('table');
    tbl.style.border = border;
    div.appendChild(tbl);
    for (let i = 0; i < 3; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 2; j++) {
            if (i === 2 && j === 1) {
                break;
            } else {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(`asdfasdfasdCell I${i}/J${j}`));
                td.style.border = border;
                if (i === 1 && j === 1) {
                    td.setAttribute('rowSpan', '2');
                }
            }
            await sleep(1000)
        }
    }


    for (let i = 0; i < 10; i++) {

        await sleep(1000)
    }
}
export default TKB;