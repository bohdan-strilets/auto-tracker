import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db/prisma.service';
import { Prisma, Session, SessionStatus } from '@prisma/client';

import { CreateSessionInput, UpdateRefreshTokenInput } from './types';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateSessionInput): Promise<Session> {
    return this.prisma.session.create({ data: input });
  }

  async findById(id: string): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { id } });
  }

  async findActiveByTokenHash(refreshTokenHash: string): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: { refreshTokenHash, status: SessionStatus.ACTIVE },
    });
  }

  async findAllActiveByUserId(userId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { userId, status: SessionStatus.ACTIVE },
    });
  }

  async rotateRefreshToken(
    id: string,
    currentHash: string,
    input: UpdateRefreshTokenInput,
  ): Promise<boolean> {
    const now = new Date();
    const result = await this.prisma.session.updateMany({
      where: { id, refreshTokenHash: currentHash, status: SessionStatus.ACTIVE },
      data: { ...input, lastActivityAt: now },
    });
    return result.count > 0;
  }

  async updateLastActivity(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.session.update({
      where: { id },
      data: { lastActivityAt: now },
    });
  }

  async revoke(id: string): Promise<void> {
    const now = new Date();
    await this.prisma.session.update({
      where: { id },
      data: { status: SessionStatus.REVOKED, revokedAt: now },
    });
  }

  async revokeAll(userId: string, tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx || this.prisma;
    const now = new Date();

    const result = await client.session.updateMany({
      where: { userId, status: SessionStatus.ACTIVE },
      data: { status: SessionStatus.REVOKED, revokedAt: now },
    });

    return result.count;
  }

  async revokeAllExcept(userId: string, sessionId: string): Promise<void> {
    const now = new Date();
    await this.prisma.session.updateMany({
      where: {
        userId,
        status: SessionStatus.ACTIVE,
        id: { not: sessionId },
      },
      data: { status: SessionStatus.REVOKED, revokedAt: now },
    });
  }
}
