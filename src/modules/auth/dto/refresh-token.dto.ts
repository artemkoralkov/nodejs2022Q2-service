import { IsNotEmpty, IsString } from 'class-validator';
import { RewriteValidationOptions } from 'src/decorators/RewriteValidationOptions';

@RewriteValidationOptions({ errorHttpStatusCode: 401 })
export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
