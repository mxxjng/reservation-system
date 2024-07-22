import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result: any = this.schema.safeParse(value);

    console.log(result);

    if (!result.success) {
      const errorMessages = result?.error?.issues?.map(
        (issue) => issue?.message,
      );

      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
