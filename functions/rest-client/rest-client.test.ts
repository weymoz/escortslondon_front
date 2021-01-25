import ContentfulClient from '.';
const CONT_SPACE_ID = 'rfr9tdku11ho';
const CONT_ACCESS_TOKEN = '8k2DL9f-D1qLxqK8vtcM-b8LkUjuERd7awM4DKlqzt0';

let globalClient: ContentfulClient;

describe.skip('Contentful REST API client initialisation', () => {
  test('Should have been initialized', () => {
    const client = new ContentfulClient(CONT_SPACE_ID, CONT_ACCESS_TOKEN);
    expect(client).toBeDefined();
  });

  test('Should throw an exception', () => {
    expect(() => new ContentfulClient(CONT_SPACE_ID, '')).toThrow();
  });

  test('Should throw an exception', () => {
    expect(() => new ContentfulClient('', CONT_ACCESS_TOKEN)).toThrow();
  });

  test('Should throw an exception', () => {
    expect(() => new ContentfulClient('', '')).toThrow();
  });
});

describe.skip('Contentful REST API client', () => {
  beforeAll(() => {
    globalClient = new ContentfulClient(CONT_SPACE_ID, CONT_ACCESS_TOKEN);
  });

  test('Should fetch all entries of Contentful space', () => {
    return globalClient.getAllEntries().then(data => {
      expect(data.items.length > 0).toBeTruthy();
    });
  });

  test('Should fetch all escorts', () => {
    return globalClient.getAllEscorts().then(data => {
      expect(data.items.length > 0).toBeTruthy();
    });
  });
});
