import { IdentityUserDto } from './identityUserDto';

export interface IdentityUserDtoPagedResultDto {
  totalCount: number;
  items: IdentityUserDto[];
}
