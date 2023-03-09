import {
  rest,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
  RestRequest,
  PathParams,
} from 'msw';
import {setupServer} from 'msw/node';
import {Drink} from '~api/drink/type';

type MockHandlerObject = {
  method?: keyof typeof rest;
  path: string;
  res: (
    req:
      | RestRequest<DefaultBodyType, PathParams<string>>
      | RestRequest<never, PathParams<string>>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext,
  ) => Array<Drink>;
};

type MockHandlerArray = Array<MockHandlerObject>;

export function createMockServer(handlerConfig: MockHandlerArray) {
  const handlers = handlerConfig.map(config => {
    return rest[config.method ?? 'get'](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}
