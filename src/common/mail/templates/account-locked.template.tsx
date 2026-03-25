import { Hr, Text } from '@react-email/components';
import { AccountLockedProps } from '../types';
import { EmailButton, EmailLayout } from '../components';
import { brand } from '../styles';

export const AccountLockedTemplate = ({ firstName, lockedUntil, resetUrl }: AccountLockedProps) => {
  return (
    <EmailLayout preview={`Your account has been locked — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Account locked 🔐
      </Text>

      <Text className="text-base mt-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>,
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        Your account has been temporarily locked due to multiple failed login attempts.
      </Text>

      <Text
        className="text-sm px-4 py-3 rounded-lg mt-4"
        style={{
          color: '#991b1b',
          backgroundColor: '#fef2f2',
          border: '1px solid #fca5a5',
        }}
      >
        🔒 Your account will be automatically unlocked on <strong>{lockedUntil}</strong>.
      </Text>

      <Text className="text-base mt-4" style={{ color: brand.textSecondary }}>
        If this was not you, reset your password immediately to secure your account.
      </Text>

      <EmailButton href={resetUrl}>Reset Password</EmailButton>

      <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        If you need help, contact us at{' '}
        <a href="mailto:support@autotracker.app" style={{ color: brand.primaryColor }}>
          support@autotracker.app
        </a>
      </Text>
    </EmailLayout>
  );
};
