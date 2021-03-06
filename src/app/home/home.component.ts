import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    items: any[];

    slides: any[];
    
    constructor(private authService: AuthService) { }

    ngOnInit() {

        this.slides = [
            { headerText: "ШАГ 1", description: "Определи свои сферы влияния", routerLink: "/category", class: "step-image-category" },
            { headerText: "ШАГ 2", description: "Поставь цели и задай привычк", routerLink: "/bricktype", class: "step-image-bricktype" },
            { headerText: "ШАГ 3", description: "Строй свою стену будущего", routerLink: "/wall", class: "step-image-wall" },
            { headerText: "ШАГ 4", description: "Находи своих друзей", routerLink: "/frends", class: "step-image-friend" },
        ];

        this.items = [
            {text: 'HEllo'},
            {text: 'my'},
            {text: 'name'},
            {text: 'Alex'},
            {text: 'AND '},
            {text: 'I'},
            {text: 'glad'},
            {text: 'to'},
            {text: 'see'},
            {text: 'you'},
        ];


        var firstImageAndSecondSection = 462 + window.innerHeight;

        var contPMG2 = $('.pimg2-container');

        $(window).scroll(function(){

            var wScroll = $(this).scrollTop();        

            if (contPMG2.offset().top - window.innerHeight - wScroll < 0 ){
                var imageScroll = window.innerHeight + wScroll - contPMG2.offset().top;

                console.log('imageScroll', imageScroll);
                //console.log('contPMG2.offset().top', contPMG2.offset().top);

                $('.left-fast').css({
                    'transform': 'translate(0px, ' + imageScroll * 0.35 + 'px)'
                });

                $('.right-fast').css({
                    'transform': 'translate(0px, ' + imageScroll * 0.4 + 'px)'
                });
                
                $('.center-fix').css({
                    'transform': 'translate(0px, ' + imageScroll * 0.1 + 'px)'
                });
                
                $('.center-to-right').css({
                    'transform': 'translate(0px, -' + imageScroll * 0.1 + 'px)'
                });  
                
                $('.center-to-up').css({
                    'transform': 'translate(0px, -' + imageScroll * 0.2 + 'px)'
                });  

                if (wScroll > imageScroll){
                    $('.pimg2').css({
                        'transform': 'translate(0px, ' + imageScroll * 0.3 + 'px)'
                    });
                }
            }

            $('.pimg1').css({
                'transform': 'translate(0px, -' + wScroll / 2 + 'px)'
            });

            

            if (wScroll > 2000){
                $('.pimg3').css({
                    'transform': 'translate(0px, -' + (wScroll - 2000) / 2 + 'px)'
                });
            }

        });
    }

    scrollToSecondPart () {
        // window.scroll({
        //     top: 500, 
        //     left: 0, 
        //     behavior: 'smooth' 
        // });
        document.querySelector('.how-to-work').scrollIntoView( { 
            block: 'start',
            behavior: 'smooth' 
        });
    }

  
}
