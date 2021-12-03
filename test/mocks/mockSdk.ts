const mockSdk = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  field: {
    getValue: jest.fn(),
    setValue: jest.fn(),
  },
  entry: {
    save: jest.fn(),
  },
};

export { mockSdk };
