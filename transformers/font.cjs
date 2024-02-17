const fs = require("fs");
const path = require("path");

module.exports = {
  process(sourceText, sourcePath, options) {
    const content = fs.readFileSync(sourcePath);
    const mimetype = `font/${path.extname(sourcePath)}`;
    const dataurl = `data:${mimetype};base64,${content.toString("base64")}`;
    return {
      code: `module.exports = ${JSON.stringify(dataurl)};`,
    };
  },
};
