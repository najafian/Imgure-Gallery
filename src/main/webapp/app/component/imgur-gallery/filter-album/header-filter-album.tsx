import React from 'react';
import './header-filter-album.scss';
import {CustomWidgetButtonElement} from 'app/shared/widgets/button/CustomWidgetButtonElement';
import {IWidgetOps} from 'app/shared/widgets/common/common';
import {CustomWidgetButton} from 'app/shared/widgets/button/CustomWidgetButton';
import {getImgurGallery} from 'app/component/imgur-gallery/react-redux/imgur-action';
import {connect} from 'react-redux';
import {IRootState} from 'app/shared/reducer';
import {CustomWidgetDropDownElement} from 'app/shared/widgets/dropDownBox/CustomWidgetDropDownElement';
import {CustomWidgetNumberElement} from 'app/shared/widgets/textboxNumber/custom-widget-number-element';
import {CustomWidgetDropDown} from 'app/shared/widgets/dropDownBox/CustomWidgetDropDown';
import {CustomWidgetInputNumber} from 'app/shared/widgets/textboxNumber/custom-widget-number';
import {CustomWidgetCheckBox} from 'app/shared/widgets/checkbox/CustomWidgetCheckBox';
import {CustomWidgetCheckBoxElement} from 'app/shared/widgets/checkbox/CustomWidgetCheckBoxElement';
import {ILanguage} from 'app/shared/utils/i-language';
import {translate} from 'react-jhipster';
import {
  filterSectionDatasource,
  filterSortDatasource,
  filterWindowDatasource
} from "app/component/imgur-gallery/model/gallery-data-models";
import {formLanguage} from "app/shared/reducer/locale";
import {CustomLoadingBar} from "app/shared/widgets/loading/custom-loadingBar";

export interface IAlbumFilter {
  setAlbumLabelPosition?(isTop: boolean): void;
}

interface IProps extends StateProps, DispatchProps {
  albumDetail: IAlbumFilter;
}

export class HeaderFilterAlbum extends React.Component<IProps, {}> implements ILanguage {
  private iButtonSearch: IWidgetOps<CustomWidgetButton> = {};
  private iDropDownSection: IWidgetOps<CustomWidgetDropDown> = {};
  private iDropDownWindow: IWidgetOps<CustomWidgetDropDown> = {};
  private iDropDownSort: IWidgetOps<CustomWidgetDropDown> = {};
  private iInputNumberPageNo: IWidgetOps<CustomWidgetInputNumber> = {};
  private iCheckBoxShowViral: IWidgetOps<CustomWidgetCheckBox> = {};
  private iCheckBoxMature: IWidgetOps<CustomWidgetCheckBox> = {};
  private iCheckBoxShowAlbum: IWidgetOps<CustomWidgetCheckBox> = {};
  private iCheckBoxDescriptionPosition: IWidgetOps<CustomWidgetCheckBox> = {};
  loadingBar: CustomLoadingBar;


  componentDidMount(): void {
    this.initWidgets();
    formLanguage.push(this);
    this.loadingBar = new CustomLoadingBar('root');
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const gridClass = 'album h2 v2';
    return (
      <div className="gallery-filter-container">
        <div className={gridClass}>
          <CustomWidgetDropDownElement widgetProp={this.iDropDownSection}/>
        </div>
        <div className={gridClass}>
          <CustomWidgetDropDownElement widgetProp={this.iDropDownWindow}/>
        </div>
        <div className={gridClass}>
          <CustomWidgetDropDownElement widgetProp={this.iDropDownSort}/>
        </div>
        <div className={gridClass}>
          <CustomWidgetCheckBoxElement widgetProp={this.iCheckBoxShowViral}/>
          <CustomWidgetCheckBoxElement widgetProp={this.iCheckBoxMature}/>
        </div>
        <div className={gridClass}>
          <CustomWidgetNumberElement widgetProp={this.iInputNumberPageNo}/>
          <div style={{display: 'none'}}><CustomWidgetCheckBoxElement widgetProp={this.iCheckBoxShowAlbum}/></div>
        </div>
        <div style={{textAlign: 'center', padding: '25px 0'}} className="item h2 v3">
          <CustomWidgetButtonElement widgetProp={this.iButtonSearch}/>
        </div>
        <CustomWidgetCheckBoxElement width={'100%'} widgetProp={this.iCheckBoxDescriptionPosition}/>
      </div>
    );
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.galleryReduxState.galleryList !== prevProps.galleryReduxState.galleryList) {
      this.loadingBar.hideLoading();
      this.iCheckBoxDescriptionPosition.getWidget().setDisability(false);
    }
  }

  setLanguage(): void {
    const setLabelWithDirection = (widget: any, i18NLabel) => {
      widget.setFloatLabelType('Auto');
      widget.setLabel(translate('gallery.filter.' + i18NLabel));
      // widget.setIndex(0);
    };
    setLabelWithDirection(this.iDropDownSection.getWidget(), 'section');
    setLabelWithDirection(this.iDropDownSort.getWidget(), 'sort');
    setLabelWithDirection(this.iDropDownWindow.getWidget(), 'window');
    setLabelWithDirection(this.iInputNumberPageNo.getWidget(), 'page');
    this.iCheckBoxDescriptionPosition.getWidget().setLabel(translate('gallery.filter.descriptionPosition'));
    this.iCheckBoxShowViral.getWidget().setLabel(translate('gallery.filter.showViral'));
    this.iCheckBoxMature.getWidget().setLabel(translate('gallery.filter.mature'));
    this.iCheckBoxShowAlbum.getWidget().setLabel(translate('gallery.filter.window'));
    this.iButtonSearch.getWidget().setLabel(translate('gallery.filter.search'));
  }

  private makeParams(): string {
    const section = this.iDropDownSection.getWidget().getValue();
    const sort = this.iDropDownSort.getWidget().getValue();
    const window = this.iDropDownWindow.getWidget().getValue();
    const page = this.iInputNumberPageNo.getWidget().getValue();
    const showViral = this.iCheckBoxMature.getWidget().ischecked();
    const showMature = this.iCheckBoxMature.getWidget().ischecked();
    return `${section}/${sort}/${window}/${page}?showViral=${showViral}&mature=${showMature}`;
  }

  private initWidgets() {
    this.iButtonSearch.getWidget().onClick(() => {
      this.loadingBar.showLoading();
      this.props.getImgurGallery(this.makeParams());
    });
    this.iDropDownSection.getWidget().setDataSource(filterSectionDatasource);
    this.iDropDownWindow.getWidget().setDataSource(filterWindowDatasource);
    this.iDropDownSort.getWidget().setDataSource(filterSortDatasource);
    this.iDropDownSection.getWidget().setIndex(0);
    this.iDropDownWindow.getWidget().setIndex(0);
    this.iDropDownSort.getWidget().setIndex(0);
    this.iCheckBoxMature.getWidget().setChecked(true);
    this.iCheckBoxShowViral.getWidget().setChecked(true);
    const iCheckPosition = this.iCheckBoxDescriptionPosition;
    iCheckPosition.getWidget().setDisability(true);
    iCheckPosition.getWidget().setChange((e) => {
      const getAlbumElement = (newClassName) => {
        const elements = document.getElementsByClassName('album-container-div');
        for (let i = 0; i < elements.length; i++) {
          elements[i].className = newClassName + ' album-container-div';
        }
      };
      getAlbumElement(e.checked ? 'image-top' : 'image-bottom');
    });
    const pageWidget = this.iInputNumberPageNo.getWidget();
    pageWidget.setMinValue(1);
    pageWidget.setDecimal(1);
    pageWidget.setValue(1);
    this.setLanguage();
  }
}

const mapDispatchToProps = {
  getImgurGallery
};
const mapStateToProps = ({locale, galleryReduxState}: IRootState) => ({
  locale,
  galleryReduxState
});
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderFilterAlbum);
