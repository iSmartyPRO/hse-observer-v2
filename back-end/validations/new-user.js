const { check } = require('express-validator')
const avatarRegex = /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/i

module.exports = [
  // Проверка наличия поля name
  check('name').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.nameIsEmpty', { value, location, path })
  }),
  // Проверка наличия поля position
  check('position').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.position', { value, location, path })
  }),
  // Проверка наличия поля email
  check('email').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.emailIsEmpty', { value, location, path })
  }),
  // Проверка правильности email
  check('email').if(check('email').notEmpty()).isEmail().normalizeEmail().withMessage((value, { req, location, path }) => {
    return req.t('validation.emailIsIncorrect', { value, location, path })
  }),
  // Проверка наличия поля password
  check('password').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.passwordIsEmpty', { value, location, path })
  }),
  // Проверка длины пароля, возможно со временем добавлю проверку сложности пароля
  check('password').if(check('password').notEmpty()).isStrongPassword().withMessage((value, { req, location, path }) => {
    return req.t('validation.passwordIsNotStrong', { value, location, path })
  }),
  // Проверка наличия поля authType
  check('authType').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.authTypeIsEmpty', { value, location, path })
  }),
  // Проверка правильного выбора Типа авторизации. Допустимые значения local или ad
  check('authType')
    .if(check('authType').notEmpty())
    .isIn(['ad', 'local'])
    .withMessage((value, { req, location, path }) => {
      return req.t('validation.authTypeIsInvalid', { value, location, path })
    }),
  // Проверка наличия поля branches
  check('branches').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.branchesIsEmpty', { value, location, path })
  }),
  // Проверка наличия поля departments
  check('department').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.departmentIsEmpty', { value, location, path })
  }),
  // Проверка наличия поля roles
  check('roles').notEmpty().withMessage((value, { req, location, path }) => {
    return req.t('validation.rolesIsEmpty', { value, location, path })
  }),
  // Проверка наличия поля language
  check('language')
    .notEmpty()
    .withMessage((value, { req, location, path }) => {
      return req.t('validation.languageIsEmpty', { value, location, path })
  }),
  // Проверка правильного формата для поля avatar, может быть пустым, при этом должен содержать правильный формат base64 артинки, иначе ошибка
  check('avatar')
    .if(check('avatar').notEmpty())
    .custom(value => { return avatarRegex.test(value)})
    .withMessage((value, { req, location, path }) => {
      return req.t('validation.avatarIsInvalid', { value, location, path })
    }),
  // Проверка правильного выбора Языка. Допустимые значения ru, tr, en
  check('language')
    .if(check('language').notEmpty())
    .isIn(['ru', 'tr', 'en'])
    .withMessage((value, { req, location, path }) => {
      return req.t('validation.languageIsInvalid', { value, location, path })
    }),
]