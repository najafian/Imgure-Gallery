import React from 'react';

import './page-not-found.scss';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <h3 className="page-not-found" style={{textAlign: 'center', color: 'aliceblue'}}>The page does not exist.</h3>
      </div>
    );
  }
}

export default PageNotFound;
