import { ExcelComonent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComonent {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      });
   }

   toHTML() {
      return createTable(20);
   }

   prepare() {
      this.selection = new TableSelection();
   }

   init() {
      super.init();

      const $cell = this.$root.find('[data-id="0:0"]');
      this.selection.select($cell);
   }

   onClick(event) {}

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event);
      }
   }

   onMousemove(event) {}

   onMouseup(event) {}
}
