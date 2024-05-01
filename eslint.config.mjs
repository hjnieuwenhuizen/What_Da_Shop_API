import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  // Turn off the no-useless-catch rule
  {
    files: ["**/*.js"],
    rules: {
      "no-useless-catch": "off"
    }
  }
];
