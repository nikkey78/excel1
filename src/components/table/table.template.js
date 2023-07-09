const CODES = {
   A: 65,
   Z: 90,
};

function toCell(_, colIndex) {
   return `<div class="cell" contenteditable data-col="${colIndex}"></div>`;
}

function toColumm(col, colIndex) {
   return `
   <div class="column" data-type="resizable" data-col="${colIndex}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
   </div>`;
}

function createRow(content, index) {
   return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index}
            ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
        <div class="row-data">${content}</div>
    </div>`;
}

function toChar(_, idx) {
   return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map(toChar) // (el, index) => String.fromCharCode(CODES.A + index))
      .map(toColumm) // el => toColumn(el)
      .join('');

   rows.push(createRow(cols, ''));

   for (let i = 0; i < rowsCount; i++) {
      const cells = new Array(colsCount).fill('').map(toCell).join('');
      rows.push(createRow(cells, i + 1));
   }

   return rows.join('');
}
