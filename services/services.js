const baseUrl = ref("")
if (process.client) {
    baseUrl.value = useRuntimeConfig().public.apiBase
}

export default {
    getProduct() {
        return $fetch(`https://dummyjson.com/products`)
    },
    getDetailProduct(id) {
        return $fetch(`https://dummyjson.com/products/${id}`)
    },
    loginEtapFirst(username, password) {
        return $fetch(`${baseUrl.value}auth/login/index`, {
            method: "POST",
            body: {
                username: username,
                password: password,
            }
        })
    },
    enterPhone(phone) {
        return $fetch(`${baseUrl.value}auth/register/enter-phone`, {
            method: "POST",
            body: {
                phone: phone,
            }
        })
    },
    code(code, phone) {
        return $fetch(`${baseUrl.value}auth/register/verify`, {
            method: "POST",
            body: {
                phone: phone,
                code: code,
            }
        })
    },
    signUp(firstName, lastName, password, passwordRepeat, code, phone) {
        return $fetch(`${baseUrl.value}auth/register/sign-up`, {
            method: "POST",
            body: {
                firstname: firstName,
                lastname: lastName,
                password: password,
                password_repeat: passwordRepeat,
                code: code,
                phone: phone,
            }
        })
    },
    getUserInfo(token) {
        return $fetch(`${baseUrl.value}profile-manager/profile/index`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    resetPasswordPhone(phone) {
        return $fetch(`${baseUrl.value}auth/reset/phone`, {
            method: "POST",
            body: {
                phone: phone,
            }
        })
    },
    resetPasswordVerf(phone, code) {
        return $fetch(`${baseUrl.value}auth/reset/verify`, {
            method: "POST",
            body: {
                phone: phone,
                code: code,
            }
        })
    },
    getBanners() {
        return $fetch(`${baseUrl.value}banner/web-site-banners`)
    },
    getHeaderCategorys() {
        return $fetch(`${baseUrl.value}category-manager/category/header-categories`)
    },
    getProductCategory(lang) {
        return $fetch(`${baseUrl.value}product-manager/our-offers/index?parentCategoryKey=smartfon-va-gadjetlar`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    getDetail(slug, lang) {
        return $fetch(`https://api.mtdmarket.uz/api/product-manager/product/detail?productKey=${slug}`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    getSavedProduct(token) {
        return $fetch(`${baseUrl.value}product-manager/product-save/index`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    createSaved(token, slug, lang) {
        $fetch(`${baseUrl.value}product-manager/product-save/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept-Language": lang
            },
            params: {
                productKey: slug,
            },
            body: {
                
            }
        })
    },
    update(token, firstName, lastName) {
        return $fetch(`${baseUrl.value}profile-manager/profile/update-name`, {
            method: "POST",
            body: {
                firstname: firstName,
                lastname: lastName,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    popularCategory(lang) {
        return $fetch(`${baseUrl.value}category-manager/category/popular-categories`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    searchProduct(el, lang) {
        return $fetch(`${baseUrl.value}product-manager/product/search?searchKey=${el}`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    cheapProduct(lang) {
        return $fetch(`${baseUrl.value}product-manager/cheap-product/index`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    bodyBanners(lang) {
        return $fetch(`${baseUrl.value}banner/body-banners`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    getBrands() {
        return $fetch(`${baseUrl.value}brand/index`)
    },
    categorys(s, l) {
        return $fetch(`${baseUrl.value}category-manager/category/index?searchKey=${s}`, {
            headers: {
                "Accept-Language": l
            }
        })
    },
    getCategorysProducts(slug, lang) {
        return $fetch(`https://api.mtdmarket.uz/api/product-manager/category-product/category?&&page=1&slugKey=${slug}&searchKey=&maxPrice=&minPrice=&priceSort=&nameSort=`, {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    deliveryInfo(lang) {
        return $fetch("https://api.mtdmarket.uz/api/page-info/category", {
            headers: {
                "Accept-Language": lang
            }
        })
    },
    callCenter(lang) {
        return $fetch(`${baseUrl.value}contact-us/about`, {
            headers: {
                "Accept-Language": lang
            }
        })
    }
}