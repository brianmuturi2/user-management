import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'replaceUnderscore'
})
export class ReplaceUnderscorePipe implements PipeTransform {

    transform(value: string): string {
        return value.replace(/_/gm, ' ');
    }

}
