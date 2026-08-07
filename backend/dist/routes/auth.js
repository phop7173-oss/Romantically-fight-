"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../validation/auth");
const auth_2 = require("../services/auth");
const auth_3 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const parsed = auth_1.registerSchema.parse(req.body);
        const result = await (0, auth_2.registerUser)(parsed);
        return res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Invalid registration payload.' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const parsed = auth_1.loginSchema.parse(req.body);
        const result = await (0, auth_2.loginUser)(parsed);
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ error: error.message });
        }
        return res.status(401).json({ error: 'Invalid login payload.' });
    }
});
router.post('/invites', auth_3.requireAuth, async (req, res) => {
    try {
        const parsed = auth_1.inviteSchema.parse(req.body);
        const result = await (0, auth_2.createInvitation)(req.user.id, parsed.email);
        return res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Invalid invite payload.' });
    }
});
router.post('/invites/accept', auth_3.requireAuth, async (req, res) => {
    try {
        const parsed = auth_1.acceptInvitationSchema.parse(req.body);
        const result = await (0, auth_2.acceptInvitation)({ token: parsed.token, userId: req.user.id });
        return res.json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Invalid invite acceptance payload.' });
    }
});
router.get('/me', auth_3.requireAuth, async (req, res) => {
    return res.json({ user: req.user });
});
exports.default = router;
