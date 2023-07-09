export function shouldResize(event) {
   return event.target.dataset.resize;
}

export function isCell(event) {
   return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
   const current = $current.id(true);
   const target = $target.id(true);

   const cols = range(current.col, target.col);
   const rows = range(current.row, target.row);

   return cols.reduce((acc, col) => {
      rows.forEach(row => acc.push(`${row}:${col}`));
      return acc;
   }, []);
}

function range(start, end) {
   const len = Math.abs(end - start) + 1;
   if (start > end) {
      [end, start] = [start, end];
   }
   return new Array(len).fill('').map((_, i) => i + start);
}
