const base = require("./common");
module.exports = Object.assign(
    {
        //link
        VUE_APP_EMAIL: JSON.stringify(
            "http://192.168.0.179:8399/Full/TransmitPage"
        ),
        VUE_APP_MQTT_URL: JSON.stringify("test3.pkulaw.com"),
        //ai广场
        VUE_APP_AI_BASE_API: JSON.stringify("https://testai.pkulaw.com"),
        //若依
        VUE_APP_AI_RUOYI_API: JSON.stringify(
            "https://test1.pkulaw.com/ruoyi-api"
        ),
        //kc
        KC_REALM: JSON.stringify(
            "https://testcas.pkulaw.com/auth/realms/fabao"
        ),
        NODE_ENV: JSON.stringify("development"),
        //购买相关
        VUE_APP_KC_BASE_API: JSON.stringify("https://test1.pkulaw.com"),
        VUE_PC_COUPON_URL: JSON.stringify(
            "https://test1.pkulaw.com/usercenter/showsctivebuyorder/False"
        ),
    },
    base
);
