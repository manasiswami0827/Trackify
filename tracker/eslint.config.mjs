// import js from "@eslint/js";
// import globals from "globals";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   pluginReact.configs.flat.recommended,
// ]);
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JavaScript settings
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
    rules: {
      "no-unused-vars": "off",
    },
  },

  // React rules
  pluginReact.configs.flat.recommended,

  // ✅ Next.js plugin (this removes the “Next.js plugin not detected” warning)
  ...nextPlugin,

  // Custom rule overrides
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
