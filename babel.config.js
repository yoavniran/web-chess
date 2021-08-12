// const env = process.env.BABEL_ENV,
//     isUploadyBundle = process.env.UPLOADY_BUNDLE;
//
// const productionConfig = {
//     plugins: [
//         //cant add to base because breaks unit-tests that modify process.env
//         "transform-inline-environment-variables",
//     ]
// };
//
const config =  {
//     exclude: [
//         /utils\/isProduction/,
//     ],
    presets: [
        [
            "@babel/env",
            {
//                 // "loose":  true,
//                 "modules": env === "esm" ? false : "commonjs"
            },
        ],
        "@babel/react",
    ],
    plugins: [
//         "@babel/plugin-proposal-function-bind",
//         "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-nullish-coalescing-operator",
	      "babel-plugin-styled-components",
        "lodash",
        ["module-resolver", {
            "root": ["./src"],
            // "alias": {}
        }]
    ],
    env: {

        test: {
            plugins: [
                "@babel/plugin-transform-runtime",
            ],
            presets: [
                [
                    "@babel/env",
                    {
                        targets: {
                            node: true,
                        },
                    },
                ],
            ],
        },
    }
};

module.exports = config;
//
// //     () => {
// //     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$ ", process.env.BUILD_TIME_VERSION)
// //
// //     // api.caller((caller) => {
// //     //     console.log("!!!!!!!!!!!!!!!!! BABEL CALLER !!!!!!!!!!!!!!! ", caller);
// //     // });
// //
// //     return config;
// // };
