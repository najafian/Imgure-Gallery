import './container-page.scss';

import React from 'react';
import {translate, Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from "react-router";
import {IRootState} from "app/shared/reducer";
import {login} from "app/component/authentication/react-redux/authentication-action";
import AlbumPanel, {IAlbumDetail} from "app/component/imgur-gallery/album/album-panel";
import {HeaderFilterAlbum} from "app/component/imgur-gallery/filter-album/header-filter-album";
import {getImgurGallery} from "app/component/imgur-gallery/react-redux/imgur-action";

interface IProps extends StateProps, DispatchProps, RouteComponentProps<{}> {

}

class ContainerPage extends React.Component<IProps> {
  private imageDetail: IAlbumDetail;
  private filterInfo: any;

  constructor(props) {
    super(props);
    this.imageDetail = {
      imageWidth: 200,
      imageHeight: 300,
      info: {description: 'dsd', downVotes: 1, score: 3, title: 'dfdfd', upVotes: 34},
      src: 'dfdfd',
      key: 'dffd'
    }
  }
componentDidMount(): void {
    this.props.getImgurGallery('hot/viral/1/all?showViral=true&mature=true&album_previews=true');
}

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="gallery-container">
        <div className="gallery-header">
          <HeaderFilterAlbum albumDetail={this.filterInfo}/>
        </div>
        <div className="gallery-body">
          <div className="gallery">
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
            <AlbumPanel delayTime={500} albumDetail={this.imageDetail}></AlbumPanel>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({galleryReduxState, authentication, mainOperations}: IRootState) => ({
  authentication,
  mainOperations,
  galleryReduxState
});

const mapDispatchToProps = {
  getImgurGallery
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerPage);
