export class AssetsUrl {
    public static BASE_URL: string = "assets/football-admin";
    public static CONFIG: string = "assets/football-admin/data/app-config.json";
    public static DEFAULT_LOGO = "http://cooperslegacyfoundation.org/uploads/3/5/1/7/35179490/9834323_orig.png";
}

export class FakeAPIUrl {
    public static PROVINCE: string = "/data/province.json";
    public static RESTAURANT_LIVE_QUERY: string = "/data/restaurant.json";
    public static RESTAURANT_DETAIL: string = "/data/restaurant-detail.json";
    public static FLOOR: string = "/data/floor.json";
    public static Map: string = "/data/map.json";
}

export class APIUrl {
    public static CLIENT_KEY: string = "Hello, its me";
    public static GEOCODE_URL: string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latlng&sensor=true";
    public static PROVINCE: string = "/app/provinces";
    public static CUSTOMER_REGISTER: string = "/customer/register";
    public static CUSTOMER_LOGIN_BY_ACCOUNT: string = "/customer/login/account";
    public static CUSTOMER_LOGGIN_BY_OPENID: string = "/customer/login/openid";
    public static USER_LOGIN: string = "/user/login";
    public static STAFF_LIST: string = "/staff/list";
    public static RESTAURANT_LIVE_QUERY: string = "/restaurant/live/query";
    public static RESTAURANT_LIST_LOCATON: string = "/restaurant/list/locations";
    public static RESTAURANT_ACCESSPOINT_RESTID: string = "/restaurant/accesspoint/rest_id";
    public static RESTAURANT_DETAIL: string = "/restaurant_detail";
    public static MENU_CATEGORY: string = "/menu/categories";
    public static MENU_LIST_QUERY: string = "/menu/list/query";
    public static COUPON_LIST: string = "/coupon/list";
    public static VENDOR_LIST: string = "/vendor/list";
    public static VENDOR_DETAIL: string = "/vendor/detail";
}

export class ParamsKey {
    public static FIRST_NAME: string = "first_name";
    public static LAST_NAME: string = "last_name";
    public static EMAIL: string = "email";
    public static PHONE: string = "phone";
    public static PASSWORD: string = "password";
    public static SIGN: string = "sign";
    public static ACCOUNT: string = "account";
    public static OPENID: string = "openid";
    public static USER_NAME: string = "user_name";
    public static VENDOR_ID: string = "vendor_id";
    public static REST_ID: string = "rest_id";
    public static CITY: string = "city";
    public static KEYWORD: string = "keyword";
    public static LAT: string = "lat";
    public static LNG: string = "lng";
    public static RANGE: string = "range";
    public static ACCESSPOINT: string = "accesspoint";
    public static CATEGORY_ID: string = "category_id";
    public static IS_FOOD: string = "is_food";
    public static PROVINCE_ID: string = "province_id";
}

export class ResponseCode {
    public static ERROR_CODE: number = 0;
    public static SUCCESS_CODE: number = 1;
}

export class FunctionButtonName {
    public static BUTTON_ADD: string = "buttonAdd";
    public static BUTTON_EDIT: string = "buttonEdit";
    public static BUTTON_DELETE: string = "buttonDelete";
    public static BUTTON_REMOVE: string = "buttonRemove";
    public static BUTTON_CHECK: string = "buttonCheck";
}
export const STATUS = {
    ACTIVE: {
        id: 1, title: "Kích hoạt"
    },
    INACTIVE: {
        id: 2, title: "Khóa"
    }
}

export const PAGE_CLASS = {
    ARTICLE_DETAIL: "fa-new-detail"
}

export const FIREBASE_PATH = {
    NEW: "news",
    TEAM: "leagues/hanoieleven2017/clubs",
    PLAYERS: "leagues/hanoieleven2017/players"

}

