import { ExcelComonent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import { isCell, shouldResize, matrix, nextSelector } from './table.functions';

import { $ } from '@core/dom';

export class Table extends ExcelComonent {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['click', 'mousedown', 'keydown', 'mousemove', 'mouseup'],
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

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event);
      }

      if (isCell(event)) {
         const $cell = $(event.target);

         if (event.shiftKey) {
            // group cell selection
            const $cells = matrix(this.selection.current, $cell).map(id =>
               this.$root.find(`[data-id="${id}"]`)
            );
            this.selection.selectGroup($cells);
         } else {
            this.selection.select($cell);
         }
      }
   }

   onKeydown(event) {
      const keys = [
         'Enter',
         'Tab',
         'ArrowLeft',
         'ArrowRight',
         'ArrowDown',
         'ArrowUp',
      ];
      const { key } = event;
      if (keys.includes(key) && !event.shiftKey) {
         event.preventDefault();

         const id = this.selection.current.id(true);
         const $next = this.$root.find(nextSelector(key, id));
         this.selection.select($next);
      }
   }

   onClick(event) {}

   onMousemove(event) {}

   onMouseup(event) {}
}
