module.exports = {
	"ignorePatterns": ["temp.js", "node_modules"],
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"settings": {
		"react": {
			"createClass": "createReactClass", // Regex for Component Factory to use,
			// default to "createReactClass"
			"pragma": "React",  // Pragma to use, default to "React"
			"fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
			"version": "detect", // React version. "detect" automatically picks the version you have installed.
			// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
			// It will default to "latest" and warn if missing, and to "detect" in the future
			"flowVersion": "0.53" // Flow version
		},
	},
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"@typescript-eslint/no-explicit-any": "off",
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
