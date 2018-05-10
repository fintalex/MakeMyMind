import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';



@Pipe({
    name: "dateru"
})

export class DateRu implements PipeTransform {
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
        
        return moment(value).locale('en').format(format);
        //return curDate.toLocaleString("ru-RU", options);
    }
}