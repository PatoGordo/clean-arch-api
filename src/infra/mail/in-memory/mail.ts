import { MailMessage } from "../../../application/adapters/mail.adapter";

export const inMemoryMail: {
  [address in string]: {
    inbox: MailMessage[];
    outbox: MailMessage[];
  };
} = {};
