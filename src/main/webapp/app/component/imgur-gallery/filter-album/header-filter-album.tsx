import React from 'react';
import './header-filter-album.scss';


interface IProps {
  albumDetail: any
}

export class HeaderFilterAlbum extends React.Component<IProps, {}> {

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="album">
        header
      </div>
    );
  }
}
