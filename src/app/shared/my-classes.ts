export class ResetPassword {
  constructor(reset_token: string, password: string, confirmPassword?: string) {
    this.reset_token = reset_token;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
  reset_token: string;
  password: string;
  confirmPassword?: string;
}

export class SignIn {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  username: string;
  password: string;
}

export class SearchUsers {
  constructor(
    searchText: string,
    searchGroupText: string,
    active: string,
    lockout_enabled: string,
    created_by: string,
    dateFrom: string,
    dateTo: string,
    pageSize: number,
    pageNumber: number,
    orderby: string,
    orderbyDirection: string
  ) {
    this.searchText = searchText;
    this.searchGroupText = searchGroupText;
    this.active = active;
    this.lockout_enabled = lockout_enabled;
    this.created_by = created_by;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.orderby = orderby;
    this.orderbyDirection = orderbyDirection;
  }
  searchText: string;
  searchGroupText: string;
  active: string;
  lockout_enabled: string;
  created_by: string;
  dateFrom: string;
  dateTo: string;
  pageSize: number;
  pageNumber: number;
  orderby: string;
  orderbyDirection: string;
}

export class SearchRoles {
  constructor(
    pageSize: number,
    pageNumber: number,
    orderby: string,
    orderbyDirection: string
  ) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.orderby = orderby;
    this.orderbyDirection = orderbyDirection;
  }
  pageSize: number;
  pageNumber: number;
  orderby: string;
  orderbyDirection: string;
}

export class ChangePassword {
  constructor(
    password: string,
    new_password: string,
    confirmPassword?: string
  ) {
    this.password = password;
    this.new_password = new_password;
    this.confirmPassword = confirmPassword;
  }
  password: string;
  new_password: string;
  confirmPassword?: string;
}

export class CreateUpdateUser {
  constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
  username: string;
  firstname: string;
  lastname: string;
  email?: string;
  password?: string;
}

export class Email {
  from: string;
  preheader: string;
  title: string;
  subject: string;
  body: string;
  senderName?: string;
  cc?: string | Array<string | any>;
  bcc?: string | Array<string | any>;
  attachments?: any[];
  /**
   *
   */
  constructor(from: string,
    preheader: string,
    title: string,
    subject: string,
    body: string,
    senderName?: string,
    cc?: string | Array<string | any>,
    bcc?: string | Array<string | any>,
    attachments?: any[]) {
      this.from = from;
      this.preheader = preheader;
      this.title = title;
      this.subject = subject;
      this.body = body;
      this.senderName = senderName;
      this.cc = cc;
      this.bcc = bcc;
      this.attachments = attachments;
  }
}
