export const validators = {
    data: () => ({
        emailRules: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail ushbu ko\'rinishda bo\'lsin something@something.com',
        items: ["Item 1", "Item 2", "Item 3", "Item 4"],
        required(name) {
            return v => v && v.length > 0 || `${name} bo'sh bo'lmasligi kerak !!!`
        },
        minLength(name, minLength) {
            return v => v && v.length >= minLength || `${name} kamida  ${minLength} ta belgidan iborat bo'lsin!!!`
        },
        maxLength(name, maxLength) {
            return v => v && v.length <= maxLength || `${name} ko'pi bilan  ${maxLength} ta belgidan iborat bo'lsin!!!`
        },
    })
}