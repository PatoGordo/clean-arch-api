import { MailMessage } from "../../../application/adapters/mail/transporter";

export const inMemoryMail: {
  [address in string]: {
    inbox: MailMessage[];
    outbox: MailMessage[];
  };
} = {};
