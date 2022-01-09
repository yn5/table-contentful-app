import ReactDOM from 'react-dom';
import { getByText, waitFor } from '@testing-library/dom';
import { init } from '@contentful/app-sdk';
import { initialize } from './index';

jest.mock('@contentful/app-sdk', () => ({
  init: jest.fn(),
}));

describe('index', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });
  afterEach(() => {
    const root = document.getElementById('root');

    if (!root) {
      return;
    }

    ReactDOM.unmountComponentAtNode(root);
    root.remove();
  });
  it('should render LocalhostWarning', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    const body = document.body.appendChild(root);

    initialize();

    await waitFor(() =>
      expect(getByText(body, 'App running outside of Contentful')).toBeTruthy()
    );
  });

  describe('when window.self !== window.top', () => {
    const { top, self } = window;

    beforeEach(() => {
      // @ts-ignore
      delete window.top;
      // @ts-ignore
      delete window.self;

      window.top = {} as any;
      window.self = {} as any;
    });
    afterEach(() => {
      window.top = top;
      window.self = self;
    });

    it('should call init', async () => {
      const root = document.createElement('div');
      root.id = 'root';
      document.body.appendChild(root);

      initialize();

      expect(init).toBeCalledTimes(1);
    });
  });
});
