import {
  initialPageStateIndex,
  PageStateIndex,
  pathIndex,
} from './PageStateIndex';
import Menu from './Menu';

import PageStateProvider from './demo/nrstate-client/PageStateProvider';
import { currentPageState } from './demo/nrstate/PageStateServer';

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
