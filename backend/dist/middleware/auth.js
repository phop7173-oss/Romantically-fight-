"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
async function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required.' });
    }
    const token = header.slice('Bearer '.length);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await prisma_1.prisma.user.findUnique({ where: { id: decoded.sub } });
        if (!user) {
            return res.status(401).json({ error: 'Authentication required.' });
        }
        req.user = { id: user.id, email: user.email, coupleId: user.coupleId };
        return next();
    }
    catch {
        return res.status(401).json({ error: 'Authentication required.' });
    }
}
