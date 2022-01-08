const express = require("express")
const router = express.Router()

// CONTROLLERS
const controller = require("../controllers/api")
const controllerObserver = require("../controllers/observer")
const controllerUser = require("../controllers/user")
const controllerProfile = require("../controllers/profile")
const controllerDepartment = require("../controllers/department")
const controllerBranch = require("../controllers/branch")
const controllerAuth = require("../controllers/auth")
const controllerRole = require("../controllers/role")
const controllerSearch = require("../controllers/search")
const controllerTest = require("../controllers/test")

// HELPERS
const { authCheck, grantAccess } = require('../helpers/auth')

// Validations
const validateNewUser = require('../validations/new-user')

// ========================================================

// PUBLIC AREA
router.get('/', controller.index)

// Auth Routes
router.post('/auth/login', controllerAuth.login)
router.post('/auth/signup', controllerAuth.signup)
router.get('/auth/logout', authCheck, controllerAuth.logout)


// PRIVATE AREA
// Observer Routes
router.get('/observer/', authCheck, grantAccess(['admin', 'observer', 'manager']), controllerObserver.getAll)
router.post('/observer/', authCheck, grantAccess(['admin', 'observer']), controllerObserver.save)
router.get('/observer/:id', authCheck, grantAccess(['admin', 'observer'], 'manager'), controllerObserver.get)
router.delete('/observer/:id', authCheck, grantAccess(['admin', 'observer']), controllerObserver.delete)
router.patch('/observer/:id', authCheck, grantAccess(['admin', 'observer']), controllerObserver.update)

// Profile Routes
router.get('/profile/', authCheck, controllerProfile.get)
router.patch('/profile/', authCheck, controllerProfile.update)

// User Routes
router.get('/user/', authCheck, grantAccess(['admin', 'manager']), controllerUser.getAll)
router.post('/user/', authCheck, grantAccess(['admin']), validateNewUser, controllerUser.save )
router.get('/user/:id', authCheck, grantAccess(['admin', 'manager']), controllerUser.get)
router.delete('/user/:id', authCheck, grantAccess(['admin']), controllerUser.delete)
router.patch('/user/:id', authCheck, grantAccess(['admin']), controllerUser.update)

// Branch Routes
router.get('/branch/', authCheck, grantAccess(['admin', 'manager']), controllerBranch.getAll)
router.post('/branch/', authCheck, grantAccess(['admin']), controllerBranch.save)
router.get('/branch/:id', authCheck, grantAccess(['admin', 'manager']), controllerBranch.get)
router.delete('/branch/:id', authCheck, grantAccess(['admin']), controllerBranch.delete)
router.patch('/branch/:id', authCheck, grantAccess(['admin']), controllerBranch.update)

// Role Routes
router.get('/role/', authCheck, grantAccess(['admin', 'manager']), controllerRole.getAll)
router.post('/role/', authCheck, grantAccess(['admin']), controllerRole.save)
router.get('/role/:id', authCheck, grantAccess(['admin', 'manager']), controllerRole.get)
router.delete('/role/:id', authCheck, grantAccess(['admin']), controllerRole.delete)
router.patch('/role/:id', authCheck, grantAccess(['admin']), controllerRole.update)

// Department Routes
router.get('/department/', authCheck, grantAccess(['admin', 'manager']), controllerDepartment.getAll)
router.post('/department/', authCheck, grantAccess(['admin']), controllerDepartment.save)
router.get('/department/:id', authCheck, grantAccess(['admin'], 'manager'), controllerDepartment.get)
router.delete('/department/:id', authCheck, grantAccess(['admin']), controllerDepartment.delete)
router.patch('/department/:id', authCheck, grantAccess(['admin']), controllerDepartment.update)

// Search router
router.get('/search/user/:s', authCheck, controllerSearch.user)

// Test Route
router.get('/test/', controllerTest.getAll)

module.exports = router