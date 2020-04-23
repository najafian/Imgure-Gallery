import React from 'react';
import './album-page.scss';
import {ILanguage} from 'app/shared/utils/i-language';
import UniqueID from 'app/shared/utils/uniqueKey';
import {IWidgetOps} from 'app/shared/widgets/common/common';
import {CustomWidgetButton} from 'app/shared/widgets/button/CustomWidgetButton';
import {CustomWidgetButtonElement} from 'app/shared/widgets/button/CustomWidgetButtonElement';
import {translate} from 'react-jhipster';
import AlbumViewWindow, {IAlbumView} from 'app/component/imgur-gallery/album/view/album-view-window';
import {formLanguage} from "app/shared/reducer/locale";


export interface IAlbumDetail {
  imageWidth: number;
  imageHeight: number;
  info: { upVotes: number, downVotes: number, score: number, title: string, description: string };
  linkUri: string;
  key: string;
  type: string;
}

interface IProps {
  albumDetail: IAlbumDetail;
  imagePosition: string;
}

export class AlbumPanel extends React.Component<IProps, {}> implements ILanguage {
  readonly beforeLoad: Function;
  readonly afterLoad: Function;
  readonly viewElementID: string = UniqueID();
  private imageContainerID: string = UniqueID();
  private iButtonView: IWidgetOps<CustomWidgetButton> = {};
  private viewWindow: { show?(data: IAlbumView) } = {};

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
    formLanguage.push(this);
    this.iButtonView.getWidget().setLabel(translate('gallery.album.view'));
    this.iButtonView.getWidget().onClick(() => {
      this.viewWindow.show({
        element: document.getElementById(this.viewElementID).cloneNode(true) as HTMLElement,
        details: this.props.albumDetail
      });
    });
  }

  private makeWaterfall(height: number, fixHeightBox: number, classStyle: string) {
    height += 50;
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
    return classStyle;
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const image = this.props.albumDetail;
    const customWidth = 180;
    const height = customWidth * image.imageHeight / image.imageWidth;
    const fixHeightBox = 45;
    const album = () => {
      if (image.type === 'video/mp4') {
        return <video id={this.viewElementID} width={customWidth} height={height} controls>
          <source src={image.linkUri} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>;
      } else {
        return <img id={this.viewElementID} alt={image.type} height={height} src={image.linkUri}
                    width={customWidth}/>;
      }
    };
    const classStyle = this.makeWaterfall(height, fixHeightBox, 'album item h2 ');
    return (
      <div className={classStyle}>
        <div className={this.props.imagePosition + ' album-container-div'}>
          <div className="album-section descriptionPartClass">{image.info.title}</div>
          <div className="album-section imageThumbnailClass" id={this.imageContainerID}>
            {album()}
            <CustomWidgetButtonElement widgetProp={this.iButtonView}/>
          </div>
        </div>
        <AlbumViewWindow rootElementID="root" widget={this.viewWindow}/>
      </div>
    );
  }


  setLanguage(): void {
  }
}


