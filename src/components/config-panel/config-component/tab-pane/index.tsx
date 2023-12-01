import { PureComponent,ReactNode } from 'react';

interface TabPaneProps {
  children: ReactNode;
}

export class TabPane extends PureComponent<TabPaneProps> {
  render() {
    const { children } = this.props;
    return children;
  }
}
