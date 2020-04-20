import './container-page.scss';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from "react-router";
import {IRootState} from "app/shared/reducer";
import AlbumPanel, {IAlbumDetail} from "app/component/imgur-gallery/album/album-panel";
import HeaderFilterAlbum from "app/component/imgur-gallery/filter-album/header-filter-album";
import {getImgurGallery} from "app/component/imgur-gallery/react-redux/imgur-action";
import {ILanguage} from "app/shared/utils/i-language";

interface IProps extends StateProps, DispatchProps, RouteComponentProps<{}> {

}

class ContainerPage extends React.Component<IProps> implements ILanguage {
  private filterInfo: any;
  private data = [] as IAlbumDetail[];

  setLanguage(): void {
    throw new Error("Method not implemented.");
  }

  constructor(props) {
    super(props);
    // this.state = {galleryState: false};
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const galleryList = this.props.galleryReduxState.galleryList;
    if (galleryList !== prevProps.galleryReduxState.galleryList && galleryList.status == 200) {
      this.props.mainOperations.toastAction.showToast('success');
      const getFirstImageInfo = (it) => {
        if (it.images.length > 0)
          return it.images[0];
        return null;
      };
      this.data = galleryList.data
        .filter(f => f.images !== undefined)
        .map(it => {
          let firstImageInfo = getFirstImageInfo(it);
          return {
            imageWidth: firstImageInfo.width,
            imageHeight: firstImageInfo.height,
            info: {
              description: firstImageInfo.title,
              downVotes: firstImageInfo.downs,
              score: firstImageInfo.points,
              title: it.title,
              upVotes: firstImageInfo.ups
            },
            src: firstImageInfo.link,
            key: it.id
          }
        });
      this.forceUpdate();
    } else {

    }
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    const albumElements = () => {
      return this.data.map(it => <AlbumPanel delayTime={500} albumDetail={it}/>);
    };
    return (
      <div className="gallery-container">
        <div className="">
          <HeaderFilterAlbum albumDetail={this.filterInfo}/>
        </div>
        <div className="gallery-body">
          <div className="gallery">
            {albumElements()}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({galleryReduxState, authentication, mainOperations}: IRootState) => ({
  authentication,
  galleryReduxState,
  mainOperations,
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
