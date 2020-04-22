import './container-page.scss';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {IRootState} from 'app/shared/reducer';
import {AlbumPanel, IAlbumDetail} from "app/component/imgur-gallery/album/album-panel";
import HeaderFilterAlbum from "app/component/imgur-gallery/filter-album/header-filter-album";
import {ILanguage} from 'app/shared/utils/i-language';
import InfiniteScroll from 'react-infinite-scroller';
import {translate} from 'react-jhipster';

interface IProps extends StateProps, DispatchProps {

}

interface IState {
  tracks?: IAlbumDetail[];
  hasMoreItems?: boolean;
}


class ContainerPage extends React.Component<IProps, IState> implements ILanguage {
  private filterInfo: any;
  private data = [] as IAlbumDetail[];
  private iScroll: any;


  loadItems(e) {
    const end = (e * 10) - 1;
    if (end < this.data.length) {
      const start = e === 1 ? 0 : (e - 1) * 10;
      this.data.slice(start, end).forEach(it => this.state.tracks.push(it));
      setTimeout(() => this.forceUpdate(), 1500);
    }
  }


  setLanguage(): void {
    throw new Error("Method not implemented.");
  }

  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      hasMoreItems: true
    };
  }


  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const galleryList = this.props.galleryReduxState.galleryList;
    if (galleryList !== prevProps.galleryReduxState.galleryList && galleryList.status === 200) {
      this.props.mainOperations.toastAction.showToast(translate('gallery.filter.succeed'));
      const getFirstImageInfo = (it) => {
        if (it.images.length > 0)
          return it.images[0];
        return it;
      };
      if (this.iScroll) {
        this.iScroll.pageLoaded = 0;
        document.getElementsByClassName('gallery')[0].innerHTML = ''
      }
      this.data = galleryList.data
        .filter(f => f.images !== undefined)
        .map(it => {
          const firstImageInfo = getFirstImageInfo(it);
          return {
            imageWidth: firstImageInfo.width,
            imageHeight: firstImageInfo.height,
            info: {
              description: firstImageInfo.description,
              downVotes: it.downs,
              score: it.score,
              title: it.title,
              upVotes: it.ups
            },
            linkUri: firstImageInfo.link,
            key: it.id,
            type: firstImageInfo.type
          }
        });
      this.forceUpdate();
    }
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    const items = [];
    this.state.tracks.map((track, i) => {
      items.push(<AlbumPanel albumDetail={track} key={i}/>)
    });
    return (
      <div className="gallery-container">
        <div className="">
          <HeaderFilterAlbum albumDetail={this.filterInfo}/>
        </div>
        {(this.data.length > 0) ?
          <InfiniteScroll
            ref={(scroll) => {
              this.iScroll = scroll;
            }}
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={<div className="app-loading" key={0}>
              <div className="loading-spinner"/>
            </div>}
            useWindow={false}
            getScrollParent={() => document.getElementById('iScroll')}
          >
            <div className="gallery-body">
              <div className="gallery">
                {items}
              </div>
            </div>
          </InfiniteScroll> : ''}
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
  tracks: [],
  hasMoreItems: true,
  nextHref: null
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerPage);
