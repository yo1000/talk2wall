import * as React from "react";
import {css} from "@emotion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CoverTagTag from "../components/CoverTagTag";
import PanelFF6 from "../components/PanelFF6";
import PanelFF7 from "../components/PanelFF7";
import PanelFF8 from "../components/PanelFF8";
import PanelFF9 from "../components/PanelFF9";
import PanelFF5 from "../components/PanelFF5";
import PanelFF4 from "../components/PanelFF4";
import PanelFF3 from "../components/PanelFF3";
import PanelFF2 from "../components/PanelFF2";
import PanelFF1 from "../components/PanelFF1";
import PanelFF10 from "../components/PanelFF10";

export default function PanelsPage({data}) {
    const headerLines = 3;

    const style = css`
      position: relative;
      top: ${44 * headerLines - 2 * (headerLines - 1)}px;

      .demo {
        position: relative;
        max-width: 760px;

        margin: 0 auto;
        padding: 0 1.5rem;

        .panel {
          position: relative;
          margin: 0 auto 2rem;

          .content {
            line-height: 2rem;
            padding: 0 48px;
          }
        }
      }
    `

    return (
        <main css={style}>
            <Header/>
            <div className={`demo`}>
                <PanelFF1>
                    <h2>FF I Panel</h2>
                    <p>demo text</p>
                </PanelFF1>
                <PanelFF2>
                    <h2>FF II Panel</h2>
                    <p>demo text</p>
                </PanelFF2>
                <PanelFF3>
                    <h2>FF III Panel</h2>
                    <p>demo text</p>
                </PanelFF3>
                <PanelFF4>
                    <h2>FF IV Panel</h2>
                    <p>demo text</p>
                </PanelFF4>
                <PanelFF5>
                    <h2>FF V Panel</h2>
                    <p>demo text</p>
                </PanelFF5>
                <PanelFF6>
                    <h2>FF VI Panel</h2>
                    <p>demo text</p>
                </PanelFF6>
                <PanelFF7>
                    <h2>FF VII Panel</h2>
                    <p>demo text</p>
                </PanelFF7>
                <PanelFF8>
                    <h2>FF VIII Panel</h2>
                    <p>demo text</p>
                </PanelFF8>
                <PanelFF9>
                    <h2>FF IX Panel</h2>
                    <p>demo text</p>
                </PanelFF9>
                <PanelFF10>
                    <h2>FF X Panel</h2>
                    <p>demo text</p>
                </PanelFF10>
            </div>
            <Footer/>
        </main>
    )
}
