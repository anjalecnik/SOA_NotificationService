import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // TODO: implementacija realnega emaila (SMTP, SendGrid, ...)
    this.logger.log(`Sending EMAIL to ${to} | subject: ${subject} | body: ${body}`);
  }
}
