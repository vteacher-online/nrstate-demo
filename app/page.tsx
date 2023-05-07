import {
  initialPageStateIndex,
  PageStateIndex,
  pathIndex,
} from './PageStateIndex';
import Menu from './Menu';

import PageStateProvider from 'nrstate-client/PageStateProvider';
import { currentPageState } from 'nrstate/PageStateServer';

export default function Page() {
  return (
    <>
      <PageStateProvider
        current={currentPageState<PageStateIndex>(
          initialPageStateIndex,
          pathIndex,
          false,
        )}
      >
        <Menu />
      </PageStateProvider>
    </>
  );
}
