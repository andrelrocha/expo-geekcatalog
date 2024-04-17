const EMAIL_REGEX = new RegExp(
    `^([a-zA-Z0-9_.+]{3,})@` +
    `((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|` +
    `(([a-zA-Z0-9_]+\\.)+[a-zA-Z]{2,}))$`
)

export const isEmail = (str: string, opts: { trim?: boolean } = {}) => {
const trim = opts.trim ?? true
const _str = trim ? str.trim() : str

return EMAIL_REGEX.test(_str)
}