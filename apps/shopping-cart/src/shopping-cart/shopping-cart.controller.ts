import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Controller('shopping-cart/v1.0')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  createShoppingCart(
    @Body() createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.createShoppingCart(createShoppingCartDto);
  }

  @Get(':idUser/:idShoppingCart')
  getShoppingCartByIdAndUserId(
    @Param('idUser', ParseMongoIdPipe) idUser: string,
    @Param('idShoppingCart', ParseMongoIdPipe) idShoppingCart: string,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.getShoppingCartByIdAndUserId(
      idUser,
      idShoppingCart,
    );
  }

  @Patch(':idUser')
  update(
    @Param('idUser', ParseMongoIdPipe) idUser: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.updateShoppingCart(
      idUser,
      updateShoppingCartDto,
    );
  }

  @Patch('update-status-generate-order/:idShoppingCart')
  async updateShoppingCartStatusGenerateOrder(
    @Param('idShoppingCart', ParseMongoIdPipe) idShoppingCart: string,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.updateShoppingCartStatusGenerateOrder(
      idShoppingCart,
    );
  }
}
