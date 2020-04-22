import React from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-jhipster';
import {
  CustomWidgetWindowElement,
  IWindowAction,
  IWindowWidget
} from 'app/shared/widgets/window/CustomWidgetWindowElement';
import {IRootState} from 'app/shared/reducer';
import {IAlbumDetail} from "app/component/imgur-gallery/album/album-panel";
import UniqueID from "app/shared/utils/uniqueKey";


export interface IAlbumViewWindowProps extends StateProps, DispatchProps {
  rootElementID: string;
  widget: { show?(data: any) };
}

export interface IAlbumView {
  element?: HTMLElement;
  details?: IAlbumDetail;
}

class AlbumViewWindow extends React.Component<IAlbumViewWindowProps> implements IWindowAction {
  private windowAlbumWidget: IWindowWidget = {};
  private viewContainerID: string = UniqueID();
  albumDetail: IAlbumView;

  close(event: Function): boolean {
    return false;
  }

  componentDidMount(): void {
    this.props.widget.show = (data: IAlbumView) => {
      this.showWindow(data);
    };
  }

  public showWindow(albumDetail: IAlbumView): boolean {
    this.windowAlbumWidget.widget.showDialog();
    this.windowAlbumWidget.widget.setHeaderTitle('title :' + albumDetail.details.info.title);
    albumDetail.element.setAttribute('width', '390px');
    albumDetail.element.setAttribute('height', '255px');
    const viewElement = document.getElementById(this.viewContainerID);
    viewElement.innerHTML = '';
    viewElement.append(albumDetail.element);
    this.albumDetail = albumDetail;
    this.forceUpdate();
    return false;
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const getAlbumInfo = (value: string) => {
      if (this.albumDetail !== undefined) {
        const info = this.albumDetail.details.info;
        switch (value) {
          case 'description':
            return info.description;
          case 'upVotes':
            return info.upVotes;
          case 'downVotes':
            return info.downVotes;
          case 'score':
            return info.score;
          default:
        }
      }
    };
    return (
      <CustomWidgetWindowElement width={400} height={365} settleElementID={this.props.rootElementID}
                                 windowWidget={this.windowAlbumWidget}>
        <div className="album-window" >
          <div className="album-window-image-part" id={this.viewContainerID}/>
          <div className="album-window-detail-part" >
            <div className="row">
              <div className="col-md-2"/>
              <div className="col-md-3">
                <div style={{display: 'flex'}}>
                  <img src="https://img.icons8.com/ios/25/000000/good-quality.png" alt=""/>
                  <span className="album-detail-label">{getAlbumInfo('downVotes')}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div style={{display: 'flex'}}>
                  <img src="https://img.icons8.com/ios/25/000000/poor-quality.png" alt=""/>
                  <span className="album-detail-label">{getAlbumInfo('downVotes')}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div style={{display: 'flex'}}>
                  <img src="https://img.icons8.com/ios/25/000000/rating.png" alt=""/>
                  <span className="album-detail-label">{getAlbumInfo('score')}</span>
                </div>
              </div>
              <div className="col-md-1"/>
            </div>
            <div className="row">
              <div style={{paddingLeft: '20px', display: 'flex'}}>
                <label>{translate('gallery.album.description')}</label>
                <label className="album-window-description-label">{getAlbumInfo('description')}</label>
              </div>
            </div>
          </div>

        </div>
      </CustomWidgetWindowElement>
    );
  }

}

const mapStateToProps = ({locale}: IRootState) => ({
  locale
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumViewWindow);
