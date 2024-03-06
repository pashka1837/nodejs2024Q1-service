import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const CustomResponse = createParamDecorator((ctx: ExecutionContext) => {
  const response = ctx.switchToHttp().getResponse();
});
