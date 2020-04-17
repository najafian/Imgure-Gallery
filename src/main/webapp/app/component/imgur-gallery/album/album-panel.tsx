import React from 'react';
import {LazyLoadImage, trackWindowScroll}
  from 'react-lazy-load-image-component';
import './album-page.scss';

export interface IAlbumDetail {
  imageWidth: number;
  imageHeight: number;
  info: { upVotes: number, downVotes: number, score: number, title: string, description: string };
  src: string;
  key: string;
}

interface IProps {
  albumDetail: IAlbumDetail
}

class AlbumPanel extends React.Component<IProps, {}> {
  beforeLoad: Function;
  afterLoad: Function;

  constructor(props) {
    super(props);
    this.beforeLoad = () => {
      console.log('beforeLoad')
    };
    this.afterLoad = () => {
      console.log('afterLoad')
    };
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const image = this.props.albumDetail;
    return (
      <div className="album item h2 v2">
          <div className="image-top">
            <div className="album-section imageThumbnailClass">
              <LazyLoadImage key={image.key}
                             alt={image.src}
                             height={image.imageHeight}
                             scrollPosition={'y'}
                             src={image.src}
                             width={image.imageWidth}
                             beforeLoad={this.beforeLoad}
                             afterLoad={this.afterLoad}
              />
            </div>
            <div className="album-section descriptionPartClass">description</div>
          </div>
      </div>
    );
  }
}

export default trackWindowScroll(AlbumPanel);
