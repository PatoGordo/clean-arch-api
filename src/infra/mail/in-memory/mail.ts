import { MailMessage } from "../../../application/adapters/mail/transporter";

export let inMemoryMail: {
  [address in string]: {
    inbox: MailMessage[];
    outbox: MailMessage[];
  };
} = {};

export const resetInMemoryMail = () => {
  inMemoryMail = {};
};
