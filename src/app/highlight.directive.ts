import { Directive, Input, OnChanges,ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {

  @Input() appHighlight: string='';
  constructor(private el: ElementRef, private renderer: Renderer2) { }


  ngOnChanges(){
     if (!this.appHighlight) {
      this.el.nativeElement.innerHTML = this.el.nativeElement.textContent; // Reset if empty
      return;
    }

    const regex = new RegExp(`(${this.appHighlight})`,'gi') //case insensitive regex
    const originalText = this.el.nativeElement.textContent;
    const highlightedText = originalText.replace(regex,`<span class="highlight">$1</span>`)
    this.el.nativeElement.innerHTML = highlightedText;
  }

}
