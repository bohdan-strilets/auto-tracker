import { Hr, Text } from '@react-email/components';
import { EmailChangeProps } from '../types';
import { EmailButton, EmailLayout } from '../components';
import { brand } from '../styles';

export const EmailChangeTemplate = ({ firstName, newEmail, confirmUrl }: EmailChangeProps) => {
  return (
    <EmailLayout preview={`Confirm your new email address — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Confirm email change ✉️
      </Text>

      <Text className="text-base mt-0 mb-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>,
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        You requested to change your email address to:
      </Text>

      <Text
        className="text-base font-semibold my-4 px-4 py-3 rounded-lg"
        style={{
          color: brand.primaryColor,
          backgroundColor: '#eff6ff',
          border: `1px solid #bfdbfe`,
        }}
      >
        {newEmail}
      </Text>

      <Text className="text-base mt-0" style={{ color: brand.textSecondary }}>
        Click the button below to confirm this change.
      </Text>

      <EmailButton href={confirmUrl}>Confirm Email Change</EmailButton>

      <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        This link expires in <strong>1 hour</strong>. If you did not request this change, please
        ignore this email — your current email address will remain unchanged.
      </Text>
    </EmailLayout>
  );
};
