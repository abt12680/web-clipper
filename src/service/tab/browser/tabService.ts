import { ITabService, CaptureVisibleTabOptions } from '@/service/common/tab';
import * as browser from '@web-clipper/chrome-promise';
import { Service } from 'typedi';

class ChromeTabService implements ITabService {
  getCurrent() {
    return browser.tabs.getCurrent();
  }

  remove(tabId: number): Promise<void> {
    return browser.tabs.remove(tabId) as Promise<void>;
  }

  captureVisibleTab(option: CaptureVisibleTabOptions | number) {
    return browser.tabs.captureVisibleTab(option);
  }

  sendMessage<T>(tabId: number, message: any): Promise<T> {
    return browser.tabs.sendMessage<T>(tabId, message);
  }

  sendActionToCurrentTab = async <T>(action: any): Promise<T> => {
    const current = await this.getCurrent();
    if (!current || !current.id) {
      throw new Error('No Tab');
    }
    return browser.tabs.sendMessage(current.id, action);
  };
}

Service(ITabService)(ChromeTabService);