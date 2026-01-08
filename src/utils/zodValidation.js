const zod = require('zod')

let adminsignupSchema = zod.object({
    name: zod.string().min(2),
    emailid: zod.email(),
    password: zod.string().min(8).refine((v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
        { message: "Enter atleast one uppercase character, number and special case Character." })
})

let adminsigninSchema = zod.object({
    emailid: zod.email(),
    password: zod.string().min(8).refine((v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
        { message: "Enter atleast one uppercase character, number and special case Character." })
})

let usersignupSchema = zod.object({
    name: zod.string().min(2),
    emailid: zod.email(),
    password: zod.string().min(8).refine((v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
        { message: "Enter atleast one uppercase character, number and special case Character." }),
    contactno: zod.string().max(10).min(10),
})

let usersigninSchema = zod.object({
    emailid: zod.email(),
    password: zod.string().min(8).refine((v) => /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v),
        { message: "Enter atleast one uppercase character, number and special case Character." })
})

module.exports = {
    adminsignupSchema,
    adminsigninSchema,
    usersignupSchema,
    usersigninSchema
}