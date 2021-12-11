import {Workbook} from "exceljs";
// Private functions
async function readExcelFile() {
    const workbook = new Workbook();
    await workbook.xlsx.readFile("../TKB.xlsx");
    return workbook;
}

// Public functions
export async function loadData() {
    let workbook = await readExcelFile();

}
export async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const json = await response.json();

    return json;
}