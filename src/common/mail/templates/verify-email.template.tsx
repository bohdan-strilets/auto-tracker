import { Hr, Text } from '@react-email/components';
import { EmailButton, EmailLayout } from '../components';
import { VerifyEmailProps } from '../types';
import { brand } from '../styles';

export const VerifyEmailTemplate = ({ firstName, verificationUrl }: VerifyEmailProps) => {
  return (
    <EmailLayout preview={`Verify your email address — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Verify your email 📧
      </Text>

      <Text className="text-base mt-0 mb-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>, welcome to{' '}
        {brand.name}!
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        To get started, please verify your email address by clicking the button below.
      </Text>

      <EmailButton href={verificationUrl}>Verify Email Address</EmailButton>

      <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        This link expires in <strong>1 hour</strong>. If you did not create an account, you can
        safely ignore this email.
      </Text>
    </EmailLayout>
  );
};
