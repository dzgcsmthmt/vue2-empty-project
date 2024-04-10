const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

class HttpPush {
    constructor(options) {
        this.options = options;
        this.options.retryCount = this.options.retryCount || 2;
    }

    apply(compiler) {
        let _this = this;
        if (compiler.hooks) {
            compiler.hooks.afterEmit.tapAsync("HttpPush", (compilation, cb) => {
                const files = this.filter(Object.keys(compilation.assets));
                // console.log("----------", files.length, cb);
                this.queue(0, files.length, files)
                    .then(() => {
                        console.log(`upload ${files.length} files success`);
                        cb();
                    })
                    .catch((error) => {
                        console.log("upload to cdn file fail", error);
                    });
            });
        }
    }
    //这个是过滤文件用的，也可以通过参数传入
    filter(files) {
        return files.filter((filePath) => {
            let res = filePath.indexOf(".") != 0 && !/\.html$/.test(filePath);
            if (this.options.exclude) {
                res = res && this.options.exclude.test(filePath);
            }
            return res;
        });
    }
    //使用队列，每次上传6个文件，也可以加参数配置
    queue(i, len, assets) {
        return new Promise((resolve, reject) => {
            Promise.all(
                assets.slice(i, i + 6).map((filePath, index) => {
                    return this.upload(filePath, i + index + 1);
                })
            )
                .then((files) => {
                    if (i + 6 >= len) {
                        resolve();
                    } else {
                        this.queue(i + 6, len, assets).then(() => {
                            resolve();
                        });
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    //上传文件，失败重试两次
    upload(filePath, index, retryCount = 0) {
        return new Promise((resolve, reject) => {
            let pathIndex = filePath.lastIndexOf("/");
            let relativePath =
                pathIndex > -1 ? filePath.slice(0, pathIndex + 1) : "";
            const fileName =
                pathIndex > -1 ? filePath.slice(pathIndex + 1) : filePath;
            // console.log("fileName", relativePath, fileName);
            try {
                let fd = new FormData();
                fd.append(
                    "multipartFile",
                    fs.createReadStream(
                        path.resolve(this.options.distPath, filePath)
                    )
                );
                fd.append("folder", this.options.cdnPath + relativePath);
                fd.append("domain", "https://static.pkulaw.com"); //目前就这一个
                fd.append("fileName", fileName);
                fetch(
                    "https://api-gw.pkulaw.com/mobile-server/manager/6.0.0.0.0/cdnManage/customUpload",
                    {
                        method: "post",
                        body: fd,
                        mode: "cors",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.code == 200 && data.businessCode == "00000") {
                            console.log(`upload ${index} success`, data.data);
                            resolve();
                        } else {
                            if (retryCount >= this.options.retryCount) {
                                console.error(
                                    `upload ${index} error`,
                                    filePath,
                                    data.msg
                                );
                                reject(err);
                            } else {
                                this.upload(filePath, index, retryCount + 1);
                            }
                        }
                    })
                    .catch((err) => {
                        //可以单独提取一个方法
                        if (retryCount >= 2) {
                            console.error(
                                `upload ${index} error`,
                                filePath,
                                data.msg
                            );
                            reject(err);
                        } else {
                            this.upload(filePath, index, retryCount + 1);
                        }
                    });
            } catch (err) {
                console.error("error --------", error);
                reject(err);
            }
        });
    }
}

module.exports = HttpPush;
