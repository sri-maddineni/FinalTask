import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  

  public clicked:boolean=false;

  public cross="fa-solid fa-xmark m-2"
  public bars="fa-solid fa-bars fa-2x"

  public iconclass:string=this.bars
 

  public togglemenu(){

    


    this.clicked=!this.clicked;
    if(this.clicked){
      this.iconclass=this.cross
    }
    else{
      this.iconclass=this.bars
    }
    console.log("state chnged",this.clicked);
  }


}
