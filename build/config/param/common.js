//相对路径，用于ng转发
module.exports = {
    VUE_APP_BASE_API: JSON.stringify("/apis"), //gpt接口
    VUE_APP_PKULAW_API: JSON.stringify("/pkulawAPI"), //v6接口
    VUE_APP_LOGS_API: JSON.stringify("/logsapis"), //日志接口
    VUE_APP_AI_API: JSON.stringify("/aiapis"), //gpt权限相关接口
};
