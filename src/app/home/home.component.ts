import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
                    'transform': 'translate(0px, ' + (imageScroll + 200) * 0.3 + 'px)'
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

  
}
