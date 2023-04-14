import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLinesToParagraphs'
})
export class NewLinesToParagraphsPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('\n').map(line => `<p>${line}</p>`).join('');
  }

}
