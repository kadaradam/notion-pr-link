import { getNotionIdsFromText } from '../src/utils';
import { expect, test } from '@jest/globals';

test('returns undefined with no link in text', () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra nisl orci, ac pellentesque ipsum accumsan varius. Quisque semper ante sit amet neque congue, vitae venenatis nunc posuere. Vestibulum vehicula neque ut pretium pulvinar. Nulla venenatis tristique lectus. Sed nec nibh dictum quam tristique finibus. Nullam ultricies ante ac lorem elementum, vitae volutpat ipsum mollis. Vestibulum egestas lectus nisl, ac posuere urna dignissim quis. In hac habitasse platea dictumst. Quisque mollis tincidunt urna et luctus.';

  expect(getNotionIdsFromText(text)).toBe(undefined);
});

test('returns 2 Notion ids with 2 Notion, and 2 not Notion link in text', () => {
  const text =
    'Lorem ipsum dolor sit https://www.google.com/search?q=how+to+code&oq=how+to+code&aqs=chrome.0.69i59j69i60l3.976j0j9&sourceid=chrome&ie=UTF-8 amet, consectetur adipiscing elit. Pellentesque https://www.notion.so/myorg/b6b15af1bd0124809e94bdb5c7578464?v=51bd3ab7cc564d2683c1df618e9b77c1&p=70edd01db18a4ddcb5c1350991716484 pharetra nisl orci, ac pellentesque ipsum accumsan varius. Quisque semper ante sit amet neque congue, vitae venenatis nunc posuere. Vestibulum vehicula neque ut https://www.notion.so/myorg/70edd01db18a4ddcb5c1350991716484 pretium pulvinar. Nulla venenatis tristique lectus. Sed nec nibh dictum quam tristique finibus. Nullam ultricies ante ac lorem elementum, vitae volutpat ipsum mollis. Vestibulum egestas lectus nisl, ac posuere urna dignissim quis. In hac habitasse platea dictumst. Quisque mollis tincidunt urna et luctus. https://www.youtube.com/watch?v=AaY4vpFFfwg';

  expect(getNotionIdsFromText(text)).toEqual([
    '70edd01db18a4ddcb5c1350991716484',
    '70edd01db18a4ddcb5c1350991716484'
  ]);
});

/*
import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500';
  const np = process.execPath;
  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  };
  console.log(cp.execFileSync(np, [ip], options).toString());
});
 */
