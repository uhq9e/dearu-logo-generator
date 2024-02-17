module.exports = {
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.svg$": "<rootDir>/transformers/svg.cjs",
    "\\.(ttf|otf|woff|woff2)$": "<rootDir>/transformers/font.cjs",
  },
};
