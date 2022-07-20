export interface Profile {
  firstName?: string;
  lastName?: string;
  gender: string;
}

export interface Permission {
  id: string;
  name: string;
}

export interface SystemRoles {
  id: string;
  name: string;
  readonly: boolean;
  permissions?: Permission[];
  users?: User[];
}

export class User {
  id: string;
  email: string;
  password?: string;
  accessToken?: string;
  permissions?: string[];
  needPasswordChange?: boolean;
  lastLogin?: Date;
  loginCount?: number;
  failedLogins?: number;
  systemRoles?: SystemRoles[];
  confirmed?: boolean;
  lastSeen?: Date;
  avatarHash?: string;
  roles?: string[];
  profile: Profile;
}
