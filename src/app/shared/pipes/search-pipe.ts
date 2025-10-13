import { Product } from './../../core/interfaces/product.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: Product[] | null | undefined, klma: string): Product[] {
    if (!arr) return [];          
    if (!klma) return arr;       

    return arr.filter(item =>
      item.title?.toLowerCase().includes(klma.toLowerCase())
    );
  }

}
