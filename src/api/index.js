import {Workbook} from "exceljs";

export async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const json = await response.json();

    return json;
}

export async function readExcelFile() {
    const workbook = new Workbook();
    await workbook.xlsx.readFile("../TKB.xlsx");
    return workbook;
}