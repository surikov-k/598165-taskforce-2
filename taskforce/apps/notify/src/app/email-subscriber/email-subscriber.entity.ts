import { Subscriber } from '@task-force/shared-types';

export class EmailSubscriberEntity implements Subscriber {
  email: string;
  id: string;
  name: string;
  userId: string;
  lastMail: Date;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(emailSubscriber: Subscriber) {
    this.id = emailSubscriber.id ?? '';
    this.email = emailSubscriber.email;
    this.name = emailSubscriber.name;
    this.userId = emailSubscriber.userId;
    this.lastMail = new Date(emailSubscriber.lastMail);
  }
}
