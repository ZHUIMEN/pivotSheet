import { PureComponent,ReactNode } from 'react';


interface CollapsePanelProps {
  children: ReactNode;
}
export class CollapsePanel extends PureComponent<CollapsePanelProps> {
  render() {
    const { children } = this.props;
    return children;
  }
}
