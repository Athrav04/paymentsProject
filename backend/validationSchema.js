const zod = require('zod');

const signUpSchema = zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string(),
    password:zod.string()
})

const signInSchema = zod.object({
    username:zod.string(),
    email:zod.string(),
    password:zod.string()
})

const updateInfoSchema = zod.object({
    username: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

module.exports = {
    signInSchema,
    signUpSchema,
    updateInfoSchema
}
