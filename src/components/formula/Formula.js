import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
   static className = 'excel__formula';

   constructor($root, options) {
      super($root, {
         name: 'Formula',
         listeners: ['input', 'click', 'keydown'],
         ...options,
      });
   }

   toHTML() {
      return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>
        `;
   }

   onInput(event) {
      const text = event.target.textContent.trim();
      this.$emit('formula:input', text);
   }

   onKeydown(event) {
      if (event.key === 'Enter') {
         const text = event.target.textContent.trim();
         event.target.textContent = '';
         event.target.blur();
         this.$emit('formula:enter', text);
      }
   }

   onClick(event) {
      // console.log("Formula: onClick")
   }
}
