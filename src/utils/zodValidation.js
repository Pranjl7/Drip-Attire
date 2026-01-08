const zod = require('zod')

let adminsignupSchema = zod.object({
    name: zod.string().min(2),
    emailid: zod.email(),
    password: zod.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine(
            (v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
            { message: "Password must include one uppercase letter, one number, and one special character" }
        )
})

let adminsigninSchema = zod.object({
    emailid: zod.email(),
    password: zod.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine(
            (v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
            { message: "Password must include one uppercase letter, one number, and one special character" }
        )
})

let usersignupSchema = zod.object({
    name: zod.string().min(2),
    emailid: zod.email(),
    password: zod.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine(
            (v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
            { message: "Password must include one uppercase letter, one number, and one special character" }
        )
    ,
    contactno: zod
        .string()
        .min(10, { message: "Contact number must be at least 10 digits" })
})

let usersigninSchema = zod.object({
    emailid: zod.email(),
    password: zod.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine(
            (v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
            { message: "Password must include one uppercase letter, one number, and one special character" }
        )
})

module.exports = {
    adminsignupSchema,
    adminsigninSchema,
    usersignupSchema,
    usersigninSchema
}