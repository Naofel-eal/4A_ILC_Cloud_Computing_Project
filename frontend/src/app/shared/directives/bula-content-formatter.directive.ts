import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBulaContentFormatter]'
})
export class BulaContentFormatterDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const text = this.el.nativeElement.textContent;
    const parts = text.split('#');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < parts.length; ++i) {
      if (i !== 0) {
        const word = parts[i].split(/\W+/)[0];
        const rest = parts[i].slice(word.length);
        const span = document.createElement('span');
        span.textContent = '#' + word;
        fragment.appendChild(span);
        fragment.appendChild(document.createTextNode(rest));
        span.style.color = '#F7C300';
        span.classList.add('hashtag');
      } else {
        fragment.appendChild(document.createTextNode(parts[i]));
      }
    }
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(fragment);
  }
}
