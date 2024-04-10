/* const prodPlugin = [
    [
        "component",
        {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
        },
    ],
];
if (process.env.NODE_ENV === "production") {
    prodPlugin.push("transform-remove-console");
} */
const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                esmodules: false,
            },
        },
    ],
];
// const plugins = [...prodPlugin];
module.exports = { presets /* plugins  */ };
