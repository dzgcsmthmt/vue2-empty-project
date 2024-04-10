"use strict";
process.on("unhandledRejection", (err) => {
    throw err;
});

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const { program } = require("commander");
const config = require("./webpack.prod.conf");
const HttpPushPlugin = require("./push");
program
    .arguments("<env>")
    .description("build && push static resource", {
        env: "env host",
    })
    .action(ChooseEnv);
program.parse(process.argv);

function ChooseEnv(env) {
    config.plugins.push(
        new webpack.DefinePlugin(
            require(path.resolve(__dirname, `./config/param/${env}`))
        )
        /*  new HttpPushPlugin({
            distPath: path.resolve(__dirname, "../dist"),
            cdnPath: "/writing",
        }) */
    );
    writeServerFile(env);
    runWebpack(config);
}

//写入DockerFile和ng配置文件
function writeServerFile(env) {
    fs.readdir(
        path.resolve(__dirname, `./config/server/${env}`),
        {},
        (err, files) => {
            if (err) console.log("Error!" + err);
            else {
                for (let file of files) {
                    fs.createReadStream(
                        path.resolve(__dirname, `./config/server/${env}`, file)
                    ).pipe(
                        fs.createWriteStream(path.resolve(process.cwd(), file))
                    );
                }
            }
        }
    );
}

function runWebpack(config) {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.log(chalk.yellow("Compiled with warnings.\n"));
            console.log(err);
            return;
        }
        if (stats.hasErrors()) {
            console.log(chalk.red(stats.compilation.errors));
        }
        if (stats.hasWarnings()) {
            console.log(stats.compilation.warnings);
        }
        console.log(chalk.green("Compiled successfully.\n"));
    });
}
