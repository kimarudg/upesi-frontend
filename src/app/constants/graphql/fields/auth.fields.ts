export const authFields = `
id
email
needPasswordChange
lastLogin
permissions {
  resource
  action
}
confirmed
lastSeen
avatarHash
phone
accessToken
systemRoles {
  name
}
profile {
  firstName
  lastName
  dateOfBirth
}
`;
