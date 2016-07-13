import { ParameterViewerPage } from './app.po';

describe('parameter-viewer App', function() {
  let page: ParameterViewerPage;

  beforeEach(() => {
    page = new ParameterViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
