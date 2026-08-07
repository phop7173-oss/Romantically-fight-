"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.createInvitation = createInvitation;
exports.acceptInvitation = acceptInvitation;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const TOKEN_TTL = '7d';
async function registerUser(input) {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
    if (existing) {
        throw new Error('Email already registered.');
    }
    const passwordHash = await bcryptjs_1.default.hash(input.password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            name: input.name,
            email: input.email.toLowerCase(),
            passwordHash,
        },
    });
    const token = signToken(user.id);
    return { user: sanitizeUser(user), token };
}
async function loginUser(input) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    const isValid = await bcryptjs_1.default.compare(input.password, user.passwordHash);
    if (!isValid) {
        throw new Error('Invalid email or password.');
    }
    const token = signToken(user.id);
    return { user: sanitizeUser(user), token };
}
async function createInvitation(actorId, email) {
    const target = await prisma_1.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!target) {
        throw new Error('Invitee must already have an account.');
    }
    const actor = await prisma_1.prisma.user.findUnique({ where: { id: actorId } });
    if (!actor) {
        throw new Error('Actor not found.');
    }
    if (actor.coupleId) {
        throw new Error('You already have an active couple.');
    }
    if (target.coupleId) {
        throw new Error('Invitee already belongs to a couple.');
    }
    const token = crypto_1.default.randomBytes(24).toString('hex');
    const invitation = await prisma_1.prisma.invitation.create({
        data: {
            token,
            inviterId: actorId,
            inviteeId: target.id,
            status: 'PENDING',
        },
    });
    return { invitation };
}
async function acceptInvitation(input) {
    const invitation = await prisma_1.prisma.invitation.findUnique({ where: { token: input.token } });
    if (!invitation) {
        throw new Error('Invitation not found.');
    }
    if (invitation.status !== 'PENDING') {
        throw new Error('Invitation is no longer valid.');
    }
    const user = await prisma_1.prisma.user.findUnique({ where: { id: input.userId } });
    if (!user) {
        throw new Error('User not found.');
    }
    if (user.coupleId) {
        throw new Error('You already have an active couple.');
    }
    const inviter = await prisma_1.prisma.user.findUnique({ where: { id: invitation.inviterId } });
    if (!inviter) {
        throw new Error('Inviter not found.');
    }
    if (inviter.coupleId) {
        throw new Error('Inviter already belongs to a couple.');
    }
    const couple = await prisma_1.prisma.couple.create({
        data: {
            name: `${inviter.name} & ${user.name}`,
            members: {
                connect: [{ id: inviter.id }, { id: user.id }],
            },
        },
    });
    await prisma_1.prisma.user.updateMany({
        where: { id: { in: [inviter.id, user.id] } },
        data: { coupleId: couple.id },
    });
    await prisma_1.prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'ACCEPTED' },
    });
    return { couple };
}
function signToken(userId) {
    return jsonwebtoken_1.default.sign({ sub: userId }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}
function sanitizeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        coupleId: user.coupleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
