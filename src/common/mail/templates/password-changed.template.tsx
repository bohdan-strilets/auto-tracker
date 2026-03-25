import { Hr, Text } from '@react-email/components';
import { PasswordChangedProps } from '../types';
import { EmailButton, EmailLayout } from '../components';
import { brand } from '../styles';

export const PasswordChangedTemplate = ({
  firstName,
  changedAt,
  resetUrl,
}: PasswordChangedProps) => {
  return (
    <EmailLayout preview={`Your password was changed — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Password changed 🔒
      </Text>

      <Text className="text-base mt-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>,
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        Your password was successfully changed on{' '}
        <strong style={{ color: brand.textPrimary }}>{changedAt}</strong>.
      </Text>

      <Text
        className="text-sm px-4 py-3 rounded-lg mt-4"
        style={{
          color: '#92400e',
          backgroundColor: '#fffbeb',
          border: '1px solid #fcd34d',
        }}
      >
        ⚠️ If you did not make this change, your account may be compromised. Reset your password
        immediately.
      </Text>

      <EmailButton href={resetUrl}>Reset Password</EmailButton>

      <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        If this was you, no further action is needed. If you have concerns, contact us at{' '}
        <a href="mailto:support@autotracker.app" style={{ color: brand.primaryColor }}>
          support@autotracker.app
        </a>
      </Text>
    </EmailLayout>
  );
};
