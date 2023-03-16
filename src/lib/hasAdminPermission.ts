const { ALLOWED_ADMIN_IP, NODE_ENV } = process.env

export default function hasAdminPermission(requestedIpAddress: string) {
  if (NODE_ENV === 'development') {
    return true
  }
  if (requestedIpAddress !== ALLOWED_ADMIN_IP) {
    return false
  }
  return true
}
