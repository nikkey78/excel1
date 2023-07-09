import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners);
      this.name = options.name || '';
      this.emitter = options.emitter;
      this.unsubscribers = [];

      this.prepare();
   }

   // настройка компонента до init
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
      this.unsubscribers.forEach(unsub => unsub());
   }

   // уведомление слушателя про событие
   $emit(event, ...args) {
      this.emitter.emit(event, ...args);
   }

   // подписка на событие
   $on(event, fn) {
      const unsub = this.emitter.subscribe(event, fn);
      this.unsubscribers.push(unsub);
   }
}
