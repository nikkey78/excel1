import { DomListener } from './DomListener';

export class ExcelComonent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners);
      this.name = options.name || '';

      this.prepare();
   }

   prepare() {
   //   console.log('parent prepare');
   }

   // Возвращает шаблон компонентаs
   toHTML() {
      return '';
   }

   init() {
      this.initDomListeners();
   }

   destroy() {
      this.removeDomListeners();
   }
}
