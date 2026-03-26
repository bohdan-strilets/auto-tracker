import { Injectable } from '@nestjs/common';

import { CryptoService } from './crypto.service';

@Injectable()
export class PasswordService {
  constructor(private readonly crypto: CryptoService) {}

  hash(password: string): Promise<string> {
    return this.crypto.hashArgon2(password);
  }

  verify(hash: string, password: string): Promise<boolean> {
    return this.crypto.verifyArgon2(hash, password);
  }

  // Validation

  hasMinLength(password: string): boolean {
    return password.length >= 8;
  }

  hasMaxLength(password: string): boolean {
    return password.length <= 64;
  }

  hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasLowerCase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  hasNumber(password: string): boolean {
    return /\d/.test(password);
  }

  isStrong(password: string): boolean {
    return this.hasUpperCase(password) && this.hasLowerCase(password) && this.hasNumber(password);
  }
}
