import { SetMetadata, ValidationPipeOptions } from '@nestjs/common';

export function RewriteValidationOptions(options: ValidationPipeOptions) {
  return SetMetadata('REWRITE_VALIDATION_OPTIONS', options);
}
