// import { Directive, HostListener, ElementRef } from '@angular/core';


// @Directive({
//     selector: '[appHighlight]'
// })


// export class HighLightDirective{
//     constructor( private el: ElementRef ){}

//     @HostListener('click')
//     imageChange(){
//         var src:any = this.el.nativeElement.src;
//         var mainImg:any = document.getElementById("mainImg");
//         mainImg.src = src;
//         var imgSlide = document.getElementsByClassName("activeImg");
//         for(let i = 0; i < imgSlide.length; i++){
//         imgSlide[i].classList.remove('activeImg');
//         }
//         this.el.nativeElement.classList.add('activeImg');
//     }
 
// }