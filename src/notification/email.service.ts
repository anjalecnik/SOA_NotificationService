import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: process.env.RESEND_FROM ?? 'noreply@example.com',
        to,
        subject,
        html: body,
      });

      this.logger.log(`Email SENT to ${to} (${subject})`);
    } catch (error: any) {
      this.logger.error(
        `Failed to send email to ${to}: ${error.message}`,
        error,
      );
      throw error;
    }
  }
}
