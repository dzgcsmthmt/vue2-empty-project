const base = require("./common");
module.exports = Object.assign(
    {
        //link
        VUE_APP_EMAIL: JSON.stringify(
            "https://www.pkulaw.com/Full/TransmitPage"
        ),
        VUE_APP_MQTT_URL: JSON.stringify("www.pkulaw.com"),
        //ai广场
        VUE_APP_AI_BASE_API: JSON.stringify("https://ai.pkulaw.com"),
        //若依
        VUE_APP_AI_RUOYI_API: JSON.stringify(
            "https://www.pkulaw.com/ruoyi-api"
        ),
        //kc
        KC_REALM: JSON.stringify("https://cas.pkulaw.com/auth/realms/fabao"),
        NODE_ENV: JSON.stringify("production"),
        //购买相关
        VUE_APP_KC_BASE_API: JSON.stringify("https://www.pkulaw.com"),
        VUE_PC_COUPON_URL: JSON.stringify(
            "https://www.pkulaw.com/usercenter/showsctivebuyorder/False"
        ),
    },
    base
);
