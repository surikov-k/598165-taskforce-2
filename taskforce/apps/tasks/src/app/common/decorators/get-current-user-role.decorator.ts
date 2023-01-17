import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserRole = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user['role'];
  }
);
