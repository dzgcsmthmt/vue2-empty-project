const base = require("./common");
module.exports = Object.assign(
    {
        //link
        VUE_APP_EMAIL: JSON.stringify(
            "https://pre.pkulaw.com/Full/TransmitPage"
        ),
        VUE_APP_MQTT_URL: JSON.stringify("pre.pkulaw.com"),
        //ai广场
        VUE_APP_AI_BASE_API: JSON.stringify("https://preai.pkulaw.com"),
        //若依
        VUE_APP_AI_RUOYI_API: JSON.stringify(
            "https://pre.pkulaw.com/ruoyi-api"
        ),
        //kc
        KC_REALM: JSON.stringify("https://kc-pre.pkulaw.com/auth/realms/fabao"),
        NODE_ENV: JSON.stringify("production"),
        //购买相关
        VUE_APP_KC_BASE_API: JSON.stringify("https://pre.pkulaw.com"),
        VUE_PC_COUPON_URL: JSON.stringify(
            "https://pre.pkulaw.com/usercenter/showsctivebuyorder/False"
        ),
    },
    base
);
