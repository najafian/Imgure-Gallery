import React from 'react';

interface IProp {
  width: string | number;
  height: string | number;
  labelTitle: string;
}

export class CustomLabelPanel extends React.Component<IProp, {}> {

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="content-center" style={{ width: this.props.width, height: this.props.height }}>
        <div className={('text-fit borderpanel-title')}>
          {this.props.labelTitle}</div>
        <div style={{ border: '1px solid lightgray', height: 'calc(100% - 20px)' }} className="e-card">
          {this.props.children}
        </div>
      </div>
    );
  }
}
