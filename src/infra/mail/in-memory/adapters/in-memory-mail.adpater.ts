import {
  MailAdapter,
  MailMessage,
} from "../../../../application/adapters/mail.adapter";
import { inMemoryMail } from "../mail";

export class InMemoryMailer implements MailAdapter {
  async send(message: MailMessage): Promise<void> {
    if (!inMemoryMail[message.to]?.inbox) {
      inMemoryMail[message.to] = {
        inbox: [message],
        outbox: [],
      };
    } else {
      inMemoryMail[message.to].inbox.push(message);
    }

    if (!inMemoryMail[message.from]?.outbox) {
      inMemoryMail[message.from] = {
        inbox: [],
        outbox: [message],
      };
    } else {
      inMemoryMail[message.from]?.outbox.push(message);
    }

    return;
  }

  async inbox(email: string): Promise<MailMessage[]> {
    const mails = inMemoryMail[email];

    return mails.inbox;
  }

  async outbox(email: string): Promise<MailMessage[]> {
    const mails = inMemoryMail[email];

    return mails.outbox;
  }
}
