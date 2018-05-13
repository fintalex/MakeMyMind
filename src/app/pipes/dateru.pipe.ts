import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import { AuthService } from '../services/auth.service';

@Pipe({
    name: "dateru"
})

export class DateRu implements PipeTransform {
    constructor(private authService: AuthService){}

    transform(value: string, format: string): any {

        if (!value) return value;

        //var curDate = new Date(value);

        //var options = {
        //    // era: 'long',  ===== от Рождества Христова
        //    year: year,
        //    month: month,
        //    day: day,
        //    //weekday: 'long',
        //    //timezone: 'UTC',
        //    //hour: 'numeric',
        //    //minute: 'numeric',
        //    //second: 'numeric'
        //};

        // toLocaleString - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
        
        return moment(value).locale(this.authService.CurrentUser.locale).format(format);
        //return curDate.toLocaleString("ru-RU", options);
    }
}