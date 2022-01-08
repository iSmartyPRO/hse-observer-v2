import Jwt from 'jsonwebtoken';

export function userRoles() {
  return (Jwt.decode(JSON.parse(localStorage.getItem('currentUser')).token).roles).map(item => item.toLowerCase())
}

export function isRoleExist(roles) {
  return (userRoles().find(item => roles.includes(item))) ? true : false
}