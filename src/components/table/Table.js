import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import { isCell, shouldResize, matrix, nextSelector } from './table.functions';

import { $ } from '@core/dom';

export class Table extends ExcelComponent {
   static className = 'excel__table';

   constructor($root, options) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown', 'keydown'],
         ...options,
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

      this.$on('formula:input', text => {
         this.selection.current.text(text)
      });

      // this.$on('formula:enter', text => {
      //    console.log(this.selection.current)
      // })
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
}
