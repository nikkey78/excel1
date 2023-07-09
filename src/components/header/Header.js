import { ExcelComonent } from '@core/ExcelComponent';

export class Header extends ExcelComonent {
   static className = 'excel__header';

   constructor($root) {
      super($root, {
         name: 'Header',
      });
   }

   toHTML() {
      return `
        <input type="text" class="input" value="Новая таблица">
        <div>
            <div class="button">
                <span class="material-icons">delete</span>
            </div>
            <div class="button">
                <span class="material-icons">logout</span>
            </div>
        </div>
        `;
   }
}
