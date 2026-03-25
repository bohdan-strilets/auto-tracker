import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { EmailLayoutProps } from '../types';
import { brand } from '../styles';

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans py-8">
          <Container
            className="max-w-[600px] mx-auto"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            <Section
              className="bg-white rounded-t-xl px-8 pt-8 pb-6 text-center"
              style={{ borderBottom: `1px solid ${brand.border}` }}
            >
              <Text
                className="text-2xl font-bold m-0"
                style={{ color: brand.primaryColor, letterSpacing: '-0.5px' }}
              >
                {brand.name}
              </Text>
            </Section>

            <Section
              className="bg-white px-8 py-8"
              style={{
                borderLeft: `1px solid ${brand.border}`,
                borderRight: `1px solid ${brand.border}`,
              }}
            >
              {children}
            </Section>

            <Section
              className="bg-white rounded-b-xl px-8 pt-6 pb-8 text-center"
              style={{ borderTop: `1px solid ${brand.border}` }}
            >
              <Text className="text-xs m-0 mb-1" style={{ color: brand.textMuted }}>
                © {new Date().getFullYear()} {brand.name}. All rights reserved.
              </Text>
              <Text className="text-xs m-0" style={{ color: brand.textMuted }}>
                If you have any questions, contact us at{' '}
                <a href="mailto:support@autotracker.app" style={{ color: brand.primaryColor }}>
                  support@autotracker.app
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
