export class Emitter {
   constructor() {
      this.listeners = {};
   }

   // dispatch, fire, trigger Уведомление слушателей при наличии таких
   // table.emit('table:select', {a:1})
   emit(event, ...args) {
      if (!Array.isArray(this.listeners[event])) {
         return false;
      }
      this.listeners[event].forEach(listener => {
         listener(...args);
      });
      return true;
   }

   // on, listen Подписка на уведомление
   // formula.subscribe('table:select', ()=>{})
   subscribe(event, fn) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn);

      return () => {
         this.listeners[event] = this.listeners[event].filter(listener => {
            listener != fn;
         });
      };
   }
}

// Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('new-event', data => console.log('sub:', data))

// emitter.emit('new-event', 42)

// setTimeout(() => {
//     emitter.emit('new-event', 42)
// }, 2000);

// setTimeout(() => {
//     unsub()
//     emitter.emit('new-event', 42)
// }, 4000);

// setTimeout(() => {
//     emitter.emit('new-event', 42)
//     console.log('end')
// }, 6000);
