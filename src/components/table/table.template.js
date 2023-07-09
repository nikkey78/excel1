const CODES = {
   A: 65,
   Z: 90,
};

function toCell(rowIdx, colIdx) {
   return `<div class="cell" contenteditable data-id="${rowIdx}:${colIdx}" data-col="${colIdx}"></div>`;
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

   for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
      const cells = new Array(colsCount)
         .fill(rowIdx)
         .map(toCell)
         .join('\n');
      rows.push(createRow(cells, rowIdx + 1));
   }

   return rows.join('');
}
