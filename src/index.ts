import { LogoGenerator } from "./logogenerator.js";
import { nowayu } from "./logometa.js";
import { bulkSetAttributes, isBrowser } from "./util.js";

const lines: [string, string] = ["我要看", "若千上床漫画"];
const highlights: HighlightRange[] = [{ start: 0, end: 1, line: 1 }];

const size = [960, 540];

if (isBrowser()) {
  document.body.style.backgroundColor = "grey";
  document.body.style.display = "flex";

  const logoGeneratorH = new LogoGenerator(nowayu, "horizontal");
  logoGeneratorH
    .generate(...lines, highlights, false)
    .then((svg) => {
      bulkSetAttributes(svg, {
        width: size[0],
        height: size[1],
      });
      return svg;
    })
    .then((svg) => document.body.appendChild(svg));

  const logoGeneratorV = new LogoGenerator(nowayu, "vertical");
  logoGeneratorV
    .generate(...lines, highlights, false)
    .then((svg) => {
      bulkSetAttributes(svg, {
        width: size[1],
        height: size[0],
      });
      return svg;
    })
    .then((svg) => document.body.appendChild(svg));
} else {
  const logoGeneratorH = new LogoGenerator(nowayu, "horizontal");
  logoGeneratorH.generate(...lines, highlights, false).then((svg) => {
    console.log(svg.outerHTML);
  });
}
