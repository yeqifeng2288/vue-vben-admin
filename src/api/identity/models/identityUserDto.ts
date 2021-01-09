export interface IdentityUserDto {
  tenantId?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  concurrencyStamp?: string;
  isDeleted: boolean;
  deleterId?: string;
  deletionTime?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;
}
