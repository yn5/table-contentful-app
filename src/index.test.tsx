import ReactDOM from 'react-dom';
import {
  getByRole,
  getByText,
  queryByRole,
  waitFor,
} from '@testing-library/dom';
import { init } from '@contentful/app-sdk';
import { initialize } from './index';
import { mockSdk } from './__mocks__';

jest.mock('@contentful/app-sdk', () => ({
  init: jest.fn(),
  locations: {
    LOCATION_ENTRY_FIELD: 'entry-field',
  },
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

    describe("when sdk.location.is returns true for 'entry-field'", () => {
      it('the callback passed should render the Field component', async () => {
        const root = document.createElement('div');
        root.id = 'root';
        const body = document.body.appendChild(root);

        initialize();

        // call the callback passed to the mock init function
        (init as any).mock.calls[0][0](mockSdk);

        await waitFor(() => {
          expect(getByRole(body, 'button', { name: 'add cells' })).toBeTruthy();
          expect(getByRole(body, 'button', { name: 'add rows' })).toBeTruthy();
        });
      });
    });
    describe("when sdk.location.is returns false for 'entry-field'", () => {
      it('the callback passed should not render the Field component', async () => {
        const root = document.createElement('div');
        root.id = 'root';
        const body = document.body.appendChild(root);

        initialize();

        // call the callback passed to the mock init function
        (init as any).mock.calls[0][0]({
          ...mockSdk,
          location: { is: () => false },
        });

        await waitFor(() => {
          expect(
            queryByRole(body, 'button', { name: 'add cells' })
          ).toBeFalsy();
          expect(queryByRole(body, 'button', { name: 'add rows' })).toBeFalsy();
        });
      });
    });
  });
});
