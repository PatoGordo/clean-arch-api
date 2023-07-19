import { MailMessage } from "../../../application/adapters/mail";

export const inMemoryMail: {
  [address in string]: {
    inbox: MailMessage[];
    outbox: MailMessage[];
  };
} = {};
