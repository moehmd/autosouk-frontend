import { Pipe, PipeTransform } from '@angular/core';
import { Card_item, Shipment } from 'projects/storefront/src/app/services/proxy.service';
import { ShipmentCalcPipe } from '../page-cart/pipes/shipment-calc.pipe';

@Pipe({
  name: 'totalSum'
})
export class TotalSumPipe implements PipeTransform {

  transform(orderCards: Card_item[], shipments: Shipment[]): number {
      var total : number = 0
        
      orderCards.forEach(element => {
        var subtotal1 = element.My_Product.PRODUCT_PRICE * element.QUANTITY * element.rate
        var totalWeight = element.My_Product.WEIGHT * element.QUANTITY
        var shipmentCalc = new ShipmentCalcPipe()
        var shipment = shipmentCalc.transform(totalWeight, shipments)
        var subtotal = subtotal1 + shipment

          total += subtotal
      });
    return total;
  }

}
