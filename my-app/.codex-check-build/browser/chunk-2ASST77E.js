import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-IXQEIHOK.js";

// src/app/lazy-component/lazy-component.ts
var LazyComponent = class _LazyComponent {
  static \u0275fac = function LazyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LazyComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LazyComponent, selectors: [["app-lazy-component"]], decls: 58, vars: 0, consts: [["border", "1"]], template: function LazyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "table", 0)(1, "thead")(2, "tr")(3, "th");
      \u0275\u0275text(4, "#");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "th");
      \u0275\u0275text(6, "Khoa \u0111\xE0o t\u1EA1o");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(7, "tbody")(8, "tr")(9, "td");
      \u0275\u0275text(10, "01");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "td");
      \u0275\u0275text(12, "Khoa Kinh t\xEA\u0301");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(13, "tr")(14, "td");
      \u0275\u0275text(15, "02");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "td");
      \u0275\u0275text(17, "Khoa Kinh t\xEA\u0301 \u0111\xF4\u0301i ngoa\u0323i");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(18, "tr")(19, "td");
      \u0275\u0275text(20, "03");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "td");
      \u0275\u0275text(22, "Khoa Ta\u0300i chi\u0301nh \u2013 Ng\xE2n ha\u0300ng");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(23, "tr")(24, "td");
      \u0275\u0275text(25, "04");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "td");
      \u0275\u0275text(27, "Khoa K\xEA\u0301 toa\u0301n \u2013 Ki\xEA\u0309m toa\u0301n");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(28, "tr")(29, "td");
      \u0275\u0275text(30, "05");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "td");
      \u0275\u0275text(32, "Khoa H\xEA\u0323 th\xF4\u0301ng th\xF4ng tin");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(33, "tr")(34, "td");
      \u0275\u0275text(35, "06");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(36, "td");
      \u0275\u0275text(37, "Khoa Qua\u0309n tri\u0323 Kinh doanh");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(38, "tr")(39, "td");
      \u0275\u0275text(40, "07");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(41, "td");
      \u0275\u0275text(42, "Khoa Lu\xE2\u0323t");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(43, "tr")(44, "td");
      \u0275\u0275text(45, "08");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(46, "td");
      \u0275\u0275text(47, "Khoa Lu\xE2\u0323t Kinh t\xEA\u0301");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(48, "tr")(49, "td");
      \u0275\u0275text(50, "09");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(51, "td");
      \u0275\u0275text(52, "Khoa Toa\u0301n Kinh t\xEA\u0301");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(53, "tr")(54, "td");
      \u0275\u0275text(55, "10");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(56, "td");
      \u0275\u0275text(57, "Vi\xEA\u0323n Qu\xF4\u0301c t\xEA\u0301 UEL");
      \u0275\u0275domElementEnd()()()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LazyComponent, [{
    type: Component,
    args: [{ selector: "app-lazy-component", standalone: true, template: '<table border="1">\n  <thead>\n    <tr>\n      <th>#</th>\n      <th>Khoa \u0111\xE0o t\u1EA1o</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>01</td>\n      <td>Khoa Kinh t\xEA\u0301</td>\n    </tr>\n    <tr>\n      <td>02</td>\n      <td>Khoa Kinh t\xEA\u0301 \u0111\xF4\u0301i ngoa\u0323i</td>\n    </tr>\n    <tr>\n      <td>03</td>\n      <td>Khoa Ta\u0300i chi\u0301nh \u2013 Ng\xE2n ha\u0300ng</td>\n    </tr>\n    <tr>\n      <td>04</td>\n      <td>Khoa K\xEA\u0301 toa\u0301n \u2013 Ki\xEA\u0309m toa\u0301n</td>\n    </tr>\n    <tr>\n      <td>05</td>\n      <td>Khoa H\xEA\u0323 th\xF4\u0301ng th\xF4ng tin</td>\n    </tr>\n    <tr>\n      <td>06</td>\n      <td>Khoa Qua\u0309n tri\u0323 Kinh doanh</td>\n    </tr>\n    <tr>\n      <td>07</td>\n      <td>Khoa Lu\xE2\u0323t</td>\n    </tr>\n    <tr>\n      <td>08</td>\n      <td>Khoa Lu\xE2\u0323t Kinh t\xEA\u0301</td>\n    </tr>\n    <tr>\n      <td>09</td>\n      <td>Khoa Toa\u0301n Kinh t\xEA\u0301</td>\n    </tr>\n    <tr>\n      <td>10</td>\n      <td>Vi\xEA\u0323n Qu\xF4\u0301c t\xEA\u0301 UEL</td>\n    </tr>\n  </tbody>\n</table>\n\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LazyComponent, { className: "LazyComponent", filePath: "src/app/lazy-component/lazy-component.ts", lineNumber: 9 });
})();
export {
  LazyComponent
};
//# debugId=aa8187a3-b058-5936-96b1-8717faf5dca4
//# sourceMappingURL=chunk-2ASST77E.js.map
