import React, { useRef } from 'react';
import YPlayer from './YPlayer';
import './body.css';

export default function Body(props) {
  return (
    <div className="Body">
      {props.route.link !== '' ?
        <div className="VideoPlayer">
          <YPlayer route={props.route} container="IframeContainer" class="Iframe"/>
        </div>
        :
        <div className="Home">
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h1>검색하세요</h1>
                    <p>ex) but, @하지만, $witcher3</p>
                  </td>
                  <td>
                    image
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h1>궁금한 영어 카드를 선택하세요</h1>
                  </td>
                  <td>
                    image
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h1>궁금한 영어 위에 마우스를 올리세요.</h1>
                  </td>
                  <td>
                    image
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
}