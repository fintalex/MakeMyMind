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

      $(window).scroll(function(){

        var wScroll = $(this).scrollTop();

        console.log(wScroll);
        $('.left-fast').css({
            'transform': 'translate(0px, ' + wScroll * 0.3 + 'px)'
        });

        $('.right-fast').css({
            'transform': 'translate(0px, ' + wScroll * 0.4 + 'px)'
        });
        
        $('.center-fix').css({
            'transform': 'translate(0px, ' + wScroll * 0.1 + 'px)'
        });
        
        $('.center-to-right').css({
            'transform': 'translate(0px, -' + wScroll * 0.1 + 'px)'
            //'transform': 'translate(' + wScroll * 0.2 + 'px, 0px)'
        });  
        
        $('.center-to-up').css({
            'transform': 'translate(0px, -' + wScroll * 0.2 + 'px)'
            //'transform': 'translate(' + wScroll * 0.2 + 'px, 0px)'
        });  

        $('.pimg1').css({
            'transform': 'translate(0px, -' + wScroll / 2 + 'px)'
        });

        if (wScroll > 460){
            $('.pimg2').css({
                'transform': 'translate(0px, ' + (wScroll - 460) * 0.3 + 'px)'
            });
        }

        if (wScroll > 2000){
            $('.pimg3').css({
                'transform': 'translate(0px, -' + (wScroll - 2000) / 2 + 'px)'
            });
        }

      });
  }

  
}
