import { Pipe, PipeTransform } from '@angular/core';
import { Shipment } from 'projects/storefront/src/app/services/proxy.service';

@Pipe({
    name: 'shipmentCalc',
})
export class ShipmentCalcPipe implements PipeTransform {
    transform(totalWeight: number, shipments: Shipment[]): number {
        var price: number = 0;
        shipments.forEach((shipment) => {
            if (
                shipment.MIN_RANGE < totalWeight &&
                totalWeight <= shipment.MAX_RANGE
            ) {
                price = shipment.PRICE;
            }
        });
        return price;
    }
}
