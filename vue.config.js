module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/variables.scss";`,
			},
		},
	},
};
