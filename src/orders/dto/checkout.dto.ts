import { IsNotEmpty, IsString } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  userUUID!: string;

  @IsNotEmpty()
  @IsString()
  productId!: string;
}
