import infinityScroll from "../util/infinityScroll.js";
import { on } from "../util/helpers.js";
export default class ScrollView {
  constructor({ $target, fetchData }) {
    this.section = document.createElement("section");
    this.section.classList.add("container");
    this.data = [];
    fetchData();
    this.intersection = infinityScroll(fetchData);
    $target.appendChild(this.section);
    this.bindEvents
  }

  on(eventName, handler) {
    on(this.element, eventName, handler);
    return this;
  }

  bindEvents(){
    on("reset",()=>this.handleReset);
  }

  handleReset(){
    console.log("handleReset");
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  fnFilter(){
    console.log("fnFilter");
  }

  setIntersection() {
    const blocks = document.querySelectorAll(".barea");
    this.intersection.observe(blocks[blocks.length - 1]);
  }

  // render() {
  //   this.section.innerHTML = "";
  //   this.data.forEach((val, idx) => {
  //     const block = document.createElement("div");
  //     block.classList.add("block");

  //     const title = document.createElement("h1");
  //     title.innerText = val.title;

  //     const image = document.createElement("img");
  //     image.src = val.medium_cover_image;
  //     block.appendChild(title);
  //     block.appendChild(image);
  //     this.section.appendChild(block);
  //   });
  //   this.setIntersection();
  // }
  render(){
    this.section.innerHTML = this.data.length > 0 ? this.getCustomTab() : this.getEmptyMessage;
    this.setIntersection();
  }
  getEmptyMessage() {
    return `
      <div>
        No data
      </div>
    `;
  }

  getCustomTab(){
    return `
    <div id="chartList">
    <header>
        <div class="title center">음악 차트</div>
        <div class="current-time center" id="currentTime"></div>
    </header>
    <article>
        <div id="tabs">
            <ul>
                <li><a href="#domestic" id="domesticTab" onclick="fnChartListSubmit('domestic', 'init');">국내</a></li>
                <li><a href="#overseas" id="overseasTab" onclick="fnChartListSubmit('overseas', 'init');">해외</a></li>
            </ul>
            <div id="domestic">
                ${this.getList()}
            </div>
            <div id="overseas">
                <table id="overseasChartListTable" width="100%">
                </table>
            </div>
        </div>
    </article>
    </div>
    <div id="chartDetail" style="display: none;">
        <header>
            <div id="backBtn" onclick="fnBack();"><span class="fas fa-arrow-left"></span></div>
            <div class="title center" id="title">음악 차트</div>
            <div class="singer center" id="singer"></div>
        </header>
        <article>
            <table class="detail" width="100%">
                <tbody>
                    <tr>
                        <th>작사</th>
                        <td id="lyricist"></td>
                    </tr>
                    <tr>
                        <th>작곡</th>
                        <td id="melodizer"></td>
                    </tr>
                    <tr>
                        <th>장르</th>
                        <td id="genre"></td>
                    </tr>
                </tbody>
            </table>
        </article>
    </div>
    `;
  }

  getList(){
    console.log(this.data)
    return `
      <ul class="result">
        ${this.data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({id, medium_cover_image, title, language, runtime, state, year, rating, genres}){
    return `
      <li class="barea">
        <p class="result">${id}</p>
        <img src="/src/images/${id%10}" alt="${title}"/>
        <img src=${medium_cover_image} alt="${title}"/>
        <p class="result">${title}</p>
        <p class="result">${language}</p>
        <p class="result">${runtime}</p>
        <p class="result">${state}</p>
        <p class="result">${year}</p>
        <p class="result">${rating}</p>
        <p class="result">${genres}</p>
      </li>
    `;
  }
}