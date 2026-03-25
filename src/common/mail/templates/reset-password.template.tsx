import { Hr, Text } from '@react-email/components';
import { ResetPasswordProps } from '../types';
import { EmailButton, EmailLayout } from '../components';
import { brand } from '../styles';

export const ResetPasswordTemplate = ({ firstName, resetUrl }: ResetPasswordProps) => {
  return (
    <EmailLayout preview={`Reset your password — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Reset your password 🔑
      </Text>

      <Text className="text-base mt-0 mb-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>,
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        We received a request to reset your password. Click the button below to choose a new one.
      </Text>

      <EmailButton href={resetUrl}>Reset Password</EmailButton>

      <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />

      <Text className="text-sm m-0 mb-2" style={{ color: brand.textMuted }}>
        This link expires in <strong>15 minutes</strong> for security reasons.
      </Text>
      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        If you did not request a password reset, you can safely ignore this email. Your password
        will remain unchanged.
      </Text>
    </EmailLayout>
  );
};
