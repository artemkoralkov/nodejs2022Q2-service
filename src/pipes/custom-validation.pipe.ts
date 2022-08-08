import { ArgumentMetadata, Injectable, ValidationPipe } from '@nestjs/common';
@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const options = Reflect.getMetadata(
      'REWRITE_VALIDATION_OPTIONS',
      metadata.metatype,
    );
    this.validatorOptions = Object.assign(this.validatorOptions, options);

    if (options?.errorHttpStatusCode) {
      this.errorHttpStatusCode = options.errorHttpStatusCode;
    }

    return super.transform(value, metadata);
  }
}
