import { ExcelComonent } from '@core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComonent {
   static className = 'excel__table';

   toHTML() {
       return createTable(20); 

   }
}
