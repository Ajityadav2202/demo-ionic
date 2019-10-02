import * as core from '@angular/core';
import { MenuItemService } from '../menu-item.service';
import { MenuItems } from './menu.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ElementRef, HostListener, QueryList, ViewChildren, ViewChild, Renderer } from '@angular/core';



@core.Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slidelefttitle', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(150%)' }),
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage implements core.OnInit {

  bottomMenu = new Array();
  ////////////////////////////////////////Variable//////////////////////////////////////////
  main = true;
  solutions = false;
  subcategory = false;
  optionsvisible = false;
  buttonColor = "#131419";
  items: MenuItems[];
  subss: MenuItems;
  manufactures = [];
  options = [];


  //////////////////////////////////////Selector/////////////////////////////////////////////

  @ViewChildren('category', { read: ElementRef }) itemss: QueryList<ElementRef>;
  @ViewChild('solution', { read: ElementRef, static: false }) private sol: ElementRef;
  @ViewChild('solutioncol', { read: ElementRef, static: false }) private solutioncol: ElementRef;
  @ViewChild('categorycol', { read: ElementRef, static: false }) private categorycols: ElementRef;


  @HostListener('document:click', ['$event'])
  private async documentClickHandler(event) {
    console.log(event.detail);
    //  this.navMenu(event);


    let _element = event.target;
    console.log(_element);


    let i = 0;
    for (i = 0; i < 3; i++) {
      if (_element.classList.contains('card' + i)) {
        if (_element.style.background == "red") {
          _element.style.background = "#D2AF1E";
          this.optionsvisible = false;
          this.subcategory = false;
          this.itemss.toArray().map(elem => {
            console.log(elem);
          })


        }
        else {
          _element.style.background = "red";


          let elements = this.itemss.toArray();

          elements.map(elem => {
            if (_element != elem.nativeElement) {


              return elem.nativeElement.classList.add('zoomOutLeft')
            }
            if (_element.classList.contains('card0')) {
              elem.nativeElement.style.left = "unset";
              elem.nativeElement.style.top = "223px";


            }
            if (_element.classList.contains('card1')) {
              elem.nativeElement.style.left = "unset";
              elem.nativeElement.style.top = "0px";
            }
            if (_element.classList.contains('card2')) {
              elem.nativeElement.style.left = "unset";

              elem.nativeElement.style.top = "-223px";

            }


            //  elem.nativeElement.style.transform=" rotate(20deg)";
            //  console.log(this.categorycols.nativeElement)

          })
          console.log("bottom");

          this.sol.nativeElement.classList.add('zoomOutLeft');
          console.log(this.solutioncol);
          this.solutioncol.nativeElement.classList.add('animated');
          this.solutioncol.nativeElement.classList.add('zoomOutLeft');

          await this.delay(2500);
          this.menuVisible();

        }
      }
    }

///////////////////////////////////////////////////////////////////////////////////

for(i=0;i<=4;i++)
{
  if (_element.classList.contains('subcard' + i)) {
    if (_element.style.background == "red") {
      console.log("inside subcard");
      _element.style.background = "#D2AF1E";
    }
    else {
      _element.style.background = "red";
      }    
}
}




    ///////////////////////////////////////////////////solution Animation.//////////////////////////////
    if (this.solutions && this.subcategory && this.optionsvisible && this.main) {
      this.sol.nativeElement.classList.add('animated')
      this.sol.nativeElement.classList.add('zoomOutDown');
      await this.delay(1400);
      this.menuVisible();
    }




    /////////////////////////////////////////////////bottomMenu////////////////

 if(_element.classList.contains('solution')){
   console.log("solution clicked");
   _element.style.padding="50px";
 }


  }











  constructor(private menuitem: MenuItemService, private el: ElementRef, private renderer: Renderer) { }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  ngOnInit() {
    this.items = this.menuitem.getAllMenu();
    this.subss = this.menuitem.getSubs("DJI Drone");
    this.manufactures = this.subss.subs;
    this.options = this.manufactures.find(manu => {
      return manu.subcategory === "Motherboard"
    })
  }

  menuVisible() {
    this.main = !this.main;
  }
















  solutionVisible() {

    if (this.buttonColor == "red") { this.buttonColor = "black" }
    else {
      this.buttonColor = "red";
    }
    this.solutions = !this.solutions;
    this.subcategory = false;
    this.optionsvisible = false;


  }






















  getSubCategory(category: string) {
    if (!this.main) {
      this.menuVisible();
    }
    this.optionsvisible = false;
    this.subcategory = true;
    this.subss = this.menuitem.getSubs(category);
    this.manufactures = this.subss.subs;
  }



  getManufactures(subcate: string) {

    this.optionsvisible = true;
    this.options = this.manufactures.find(manu => {
      return manu.subcategory === subcate;
    })
    console.log(this.options);
  }





  navMenu(event) {
    let _element = event.target;
    let i = 0;
    for (i = 0; i < 4; i++) {
      if (_element.classList.contains('solution')) {
        this.bottomMenu.push("solution");
      }
      else if (_element.classList.contains('case' + i)) {
        if (i == 0) {
          this.bottomMenu.push("DJI Drone");
        }
        else if (i == 1) {
          this.bottomMenu.push("Kinect Dk");
        }
        else {
          this.bottomMenu.push("Mixed Reallity");
        }
      }


    }
  }





}
