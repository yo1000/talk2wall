import * as React from "react";

import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import {ErrorCover} from "../components/covers";
import Seo from "../components/seo";

const ErrorPage = () => {
  return (
      <main>
        <SiteHeader>
          <ErrorCover/>
        </SiteHeader>

        <Seo title="error - 404"/>

        <SiteFooter/>
      </main>
  )
}

export default ErrorPage
