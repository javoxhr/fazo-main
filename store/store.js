import { defineStore } from "pinia";

export const useStore = defineStore("store", ()=> {
    const registerOpen = ref(false)
    const registerCode = ref(false)
    const phone = ref("")
    const code = ref("")
    const enterPhone = ref(false)
    const verifiyCode = ref(false)
    const codeBorder = ref("#000")
    const signUp = ref(false)
    const noti = ref(-100 + '%')
    const resetPasswordPhone = ref(false)
    const resetCode = ref(false)
    const token = computed(()=> {
        if(process.client) {
            const token = localStorage.getItem("authKey") ? localStorage.getItem("authKey") : null
            return token
        }
    })
    const userInfo = ref({})
    const loader = ref(true)
    return {
        registerCode,
        phone,
        enterPhone,
        verifiyCode,
        registerOpen,
        codeBorder,
        code,
        signUp,
        noti,
        token,
        userInfo,
        resetPasswordPhone,
        resetCode,
        loader
    }
})