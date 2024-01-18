const prodPlugin = [];
if (process.env.NODE_ENV === "production") {
    prodPlugin.push("transform-remove-console");
}
const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                esmodules: true,
            },
        },
    ],
];
const plugins = [...prodPlugin];
module.exports = { presets, plugins };
