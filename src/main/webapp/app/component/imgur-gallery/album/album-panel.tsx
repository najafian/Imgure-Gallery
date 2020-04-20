import React from 'react';
import {LazyLoadImage, trackWindowScroll}
  from 'react-lazy-load-image-component';
import './album-page.scss';
import {ILanguage} from "app/shared/utils/i-language";
import UniqueID from "app/shared/utils/uniqueKey";

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

class AlbumPanel extends React.Component<IProps, {}> implements ILanguage {
  beforeLoad: Function;
  afterLoad: Function;
  private imageContainerID: string = UniqueID();

  constructor(props) {
    super(props);
    this.beforeLoad = () => {
      console.log('beforeLoad')
    };
    this.afterLoad = () => {
      console.log('afterLoad')
    };
  }

  componentDidMount(): void {
    // this.loadImage(this.props.albumDetail.src)
    //   .then((img: any) => document.getElementById(this.imageContainerID).appendChild(img))
    //   .catch(error => console.error(error));
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.addEventListener('load', e => resolve(img));
      img.addEventListener('error', () => {
        reject(new Error(`Failed to load image's URL: ${url}`));
      });
      img.src = url;
    });
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const image = this.props.albumDetail;
    const customWidth = 180;
    const height = customWidth * image.imageHeight / image.imageWidth;
    let classStyle = 'album item h2 ';
    const fixHeightBox = 45;
    const checkHeight = (multiPly) => (height > fixHeightBox * multiPly && height < fixHeightBox * (multiPly + 1));
    if (height < fixHeightBox) {
      classStyle += 'v1';
    } else if (checkHeight(1)) {
      classStyle += 'v2';
    } else if (checkHeight(2)) {
      classStyle += 'v3';
    } else if (checkHeight(3)) {
      classStyle += 'v4';
    } else if (checkHeight(4)) {
      classStyle += 'v5';
    } else {
      classStyle += 'v6';
    }
    return (
      <div className={classStyle}>
        <div className="image-top">
          <div className="album-section imageThumbnailClass" id={this.imageContainerID}>z
            <LazyLoadImage key={image.key}
                           alt={image.src}
                           height={height}
              // scrollPosition={'y'}
                           src={image.src}
                           width={customWidth}
              // beforeLoad={this.beforeLoad}
              // afterLoad={this.afterLoad}
            />
          </div>
          <div className="album-section descriptionPartClass">description</div>
        </div>
      </div>
    );
  }

  setLanguage(): void {
  }
}

export default trackWindowScroll(AlbumPanel);
