var BBDI = {
    P: {
        WINDOWS: "Windows",
        MACOS: "macOS",
        IOS: "iOS",
        ANDROID: "Android"
    },
    S: {
        IPHONE: "iPhone",
        IPAD: "iPad",
        ANDROID_PHONE: "Android-Phone",
        ANDROID_TABLET: "Android-Tablet"
    },
    T: {
        SMARTPHONE: "Smartphone",
        TABLET: "Tablet"
    }
}

function BBDeviceInfo() {
    var v = window.navigator.appVersion.toLowerCase()
    var platform = function () {
        var platform_map = {"windows": BBDI.P.WINDOWS, "macintosh": BBDI.P.MACOS, "iphone": BBDI.P.IOS, "ipad": BBDI.P.IOS, "android": BBDI.P.ANDROID}
        var platform_candidate_keys = Object.keys(platform_map).filter(function (key) { return v.indexOf(key) != -1 })
        if (platform_candidate_keys.length == 1) {
            return platform_map[platform_candidate_keys[0]]
        }
        else if (platform_candidate_keys.length >= 2 && platform_candidate_keys.includes("windows")) {
            return "windows"
        }
    }()
    var seriese = function () {
        if (v.indexOf("windows") != -1) {
            return
        }

        if (v.indexOf("iphone") != -1) {
            return BBDI.S.IPHONE
        }
        else if (v.indexOf("ipad") != -1) {
            return BBDI.S.IPAD
        }

        var is_android = v.indexOf("android") != -1 
        var is_mobile = v.indexOf("mobile") != -1
        if (is_android) {
            return is_mobile ? BBDI.S.ANDROID_PHONE : BBDI.S.ANDROID_TABLET
        }
    }()
    var type = function () {
        if ([BBDI.S.IPHONE, BBDI.S.ANDROID_PHONE].includes(seriese)) {
            return BBDI.T.SMARTPHONE
        }
        else if ([BBDI.S.IPAD, BBDI.S.ANDROID_TABLET].includes(seriese)) { 
            return BBDI.T.TABLET
        }
    }()

    this.platform = platform
    this.seriese = seriese
    this.type = type
}

// Instant platform check
BBDeviceInfo.prototype.is_windows = function() { return this.platform == BBDI.P.WINDOWSs }
BBDeviceInfo.prototype.is_macos = function() { return this.platform == BBDI.P.MACOS }
BBDeviceInfo.prototype.is_ios = function() { return this.platform == BBDI.P.IOS }
BBDeviceInfo.prototype.is_android = function() { return this.platform == BBDI.P.ANDROID }

// Instant seriese check
BBDeviceInfo.prototype.is_iphone = function() { return this.seriese == BBDI.S.IPHONE }
BBDeviceInfo.prototype.is_ipad = function() { return this.seriese == BBDI.S.IPAD }
BBDeviceInfo.prototype.is_android_phone = function() { return this.seriese == BBDI.S.ANDROID_PHONE }
BBDeviceInfo.prototype.is_android_tablet = function() { return this.seriese == BBDI.S.ANDROID_TABLET }

// Instant type check
BBDeviceInfo.prototype.is_smartphone = function() { return this.type == BBDI.T.SMARTPHONE }
BBDeviceInfo.prototype.is_tablet = function() { return this.type == BBDI.T.TABLET }
BBDeviceInfo.prototype.is_computer = function() { return !this.is_smartphone() && !this.is_tablet() }
