import TKB from 'components/TKB';
import 'main.css';
import {Workbook} from "exceljs";
import * as path from "path";

const readExcelFile = async () => {
    const workbook = new Workbook();
    // await workbook.xlsx.readFile(__dirname + 'data/TKB.xlsx');
    return workbook;
}

const main = async (workbook) => {
    TKB(workbook);
}

readExcelFile().then(main).then(() => console.log('Started'));