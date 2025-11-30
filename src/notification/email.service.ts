import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const from = 'onboarding@resend.dev';

    const { data, error } = await this.resend.emails.send({
      from,
      to,
      subject,
      html: body,
    });

    if (error) {
      this.logger.error(
        `Failed to send email to ${to}: ${error.message ?? JSON.stringify(error)}`,
      );
      throw error;
    }

    this.logger.log(
      `Email SENT to ${to} (${subject}) – id: ${data?.id ?? 'no-id'}`,
    );
  }
}
