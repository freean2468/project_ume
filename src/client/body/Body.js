import React, { Component } from 'react';
import './body.css';
import YPlayer from './YPlayer';
import './slider.css'

export default class Body extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="Body">
        {this.props.link !== null ?
          <div className="VideoPlayer">
            <YPlayer link={this.props.link} container="IframeContainer" class="Iframe"/>
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
}
