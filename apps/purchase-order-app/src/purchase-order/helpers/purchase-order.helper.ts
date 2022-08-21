import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseOrder } from '../entities/purchase-order.entity';

@Injectable()
export class PurchaseOrderHelper {
  constructor(
    @InjectModel(PurchaseOrder.name)
    private readonly purchaseOrderModel: Model<PurchaseOrder>,
  ) {}

  async generatePurchaseOrderNumber(
    idUser: string,
    prefixUser: string,
  ): Promise<string> {
    try {
      const totalOrders = await this.purchaseOrderModel
        .findOne({ 'auditProperties.userCreate.idUser': idUser })
        .countDocuments();

      const nextNumber = `000${totalOrders + 1}`.slice(-4);

      return `PO_${prefixUser}${nextNumber}`.toLocaleUpperCase();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al generar el número de carro de compra',
      );
    }
  }

  generatePrefix(firstName: string, email: string) {
    const lastLetter = email.split('@')[0].slice(-1);

    const userPrefix = `${firstName.slice(0, 1)}${lastLetter}`;

    return userPrefix;
  }
}
