import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBulaContentFormatter]'
})
export class BulaContentFormatterDirective implements OnChanges {
  @Input() bulaText: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bulaText'] && changes['bulaText'].currentValue) {
      this.addSpanToHashtag(changes['bulaText'].currentValue);
    }
  }

  private addSpanToHashtag(text: string) {
    const parts = text.split('#');
    const fragment = document.createDocumentFragment();
    const wordRegex = /[^\w\u00C0-\u024F]+/;
    for (let i = 0; i < parts.length; ++i) {
      if (i !== 0) {
        const word = parts[i].split(wordRegex)[0];
        const rest = parts[i].slice(word.length);
        const span = document.createElement('span');
        span.textContent = '#' + word;
        fragment.appendChild(span);
        fragment.appendChild(document.createTextNode(rest));
        span.style.color = '#F7C300';
        span.style.cursor = 'pointer';
      } else {
        fragment.appendChild(document.createTextNode(parts[i]));
      }
    }
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(fragment);
  }
}