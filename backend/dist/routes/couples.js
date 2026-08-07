"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAuth, async (_req, res) => {
    const couples = await prisma_1.prisma.couple.findMany({
        include: { members: true },
        orderBy: { createdAt: 'desc' },
    });
    res.json(couples);
});
router.post('/', auth_1.requireAuth, async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'A couple name is required.' });
    }
    const couple = await prisma_1.prisma.couple.create({
        data: {
            name,
        },
        include: { members: true },
    });
    return res.status(201).json(couple);
});
exports.default = router;
