import * as React from 'react';
import { Button, Section } from '@react-email/components';

import { EmailButtonProps } from '../types';
import { brand } from '../styles';

export function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Section className="text-center my-8">
      <Button
        href={href}
        style={{
          backgroundColor: brand.primaryColor,
          color: '#ffffff',
          padding: '14px 32px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          textDecoration: 'none',
          display: 'inline-block',
          letterSpacing: '0.01em',
        }}
      >
        {children}
      </Button>
    </Section>
  );
}
