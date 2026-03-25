import { Hr, Text } from '@react-email/components';
import { WelcomeProps } from '../types';
import { brand } from '../styles';
import { EmailButton, EmailLayout } from '../components';

export const WelcomeTemplate = ({ firstName, appUrl }: WelcomeProps) => {
  return (
    <EmailLayout preview={`Welcome to ${brand.name} 🚗`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Welcome to {brand.name} 🚗
      </Text>

      <Text className="text-base mt-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>, your email has been
        verified and your account is ready to use!
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        Start tracking your vehicles, fuel costs, service history, and more — all in one place.
      </Text>

      <EmailButton href={appUrl}>Get Started</EmailButton>

      <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        If you have any questions, feel free to reach out to us at{' '}
        <a href="mailto:support@autotracker.app" style={{ color: brand.primaryColor }}>
          support@autotracker.app
        </a>
      </Text>
    </EmailLayout>
  );
};
