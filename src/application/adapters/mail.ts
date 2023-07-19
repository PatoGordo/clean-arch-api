export interface MailAdapter {
  send(message: MailMessage): Promise<void>;
  inbox(email: string): Promise<MailMessage[]>;
  outbox(email: string): Promise<MailMessage[]>;
}

export interface MailMessage {
  from: string;
  to: string;
  subject: string;
  body: string;
}
