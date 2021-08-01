module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["Rubik", "Roboto", "Miriam Libre"],
			},
			gridAutoRows: {
				"0.5fr": "minmax(0, 0.5fr)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
