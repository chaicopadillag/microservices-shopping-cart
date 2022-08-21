export interface IAuditoriaDb {
  dateCreate: Date;
  dateUpdate?: Date;
  userCreate: UserAudit;
  userUpdate?: UserAudit;
  activeRecord: boolean;
}

type UserAudit = {
  idUser: string;
  email: string;
};
