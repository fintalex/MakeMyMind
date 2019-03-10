import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
    /// Capitalize the first letter
    transform(value: string) {
        if (typeof value !== 'string'){
            throw new Error('ReversePipe: not a string');
        }

        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }

        return value;
    }
}