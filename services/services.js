const baseUrl = ref("")
if(process.client) {
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
        return $fetch(`${baseUrl.value}auth/register/verify`,{
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
    getProductCategory() {
        return $fetch("https://api.mtdmarket.uz/api/product-manager/our-offers/index")
    },
    getDetail(slug) {
        return $fetch(`https://api.mtdmarket.uz/api/product-manager/product/detail?productKey=${slug}`)
    }
}