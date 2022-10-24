import React from "react";
import { Helmet} from 'react-helmet-async';
const PageTitle = (props) => {
  const {title} = props;
  return (
    <div>
      <Helmet>
        <title>{title} | Kinbo.com</title>
      </Helmet>
    </div>
  );
};

export default PageTitle;
