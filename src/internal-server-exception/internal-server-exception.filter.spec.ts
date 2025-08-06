import { InternalServerExceptionFilter } from './internal-server-exception.filter';

describe('InternalServerExceptionFilter', () => {
  it('should be defined', () => {
    expect(new InternalServerExceptionFilter()).toBeDefined();
  });
});
