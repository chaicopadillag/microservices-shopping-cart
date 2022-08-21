import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Controller('purchase-order/v1.0')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  createPurchaseOrder(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.purchaseOrderService.createPurchaseOrder(
      createPurchaseOrderDto,
    );
  }

  @Get(':idUser')
  async getPurchaseOrders(
    @Param('idUser', ParseMongoIdPipe) idUser: string,
  ): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderService.getPurchaseOrders(idUser);
  }

  @Get(':idUser/:idPurchaseOrder')
  async getPurchaseOrderById(
    @Param('idUser', ParseMongoIdPipe) idUser: string,
    @Param('idPurchaseOrder', ParseMongoIdPipe) idPurchaseOrder: string,
  ): Promise<PurchaseOrder> {
    return await this.purchaseOrderService.getPurchaseOrderById(
      idUser,
      idPurchaseOrder,
    );
  }
}
