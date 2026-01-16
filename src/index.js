import { login } from "./auth/login.js";
import { requireAuth } from "./auth/middleware.js";
import { changePassword } from "./auth/changePassword.js";

import { listTikTok } from "./tiktok/list.js";
import { createTikTok } from "./tiktok/create.js";
import { updateTikTok } from "./tiktok/update.js";
import { deleteTikTok } from "./tiktok/delete.js";

import { createSendMessage } from "./tasks/createSendMessage.js";
import { realtimeTasks } from "./tasks/realtime.js";
import { retryTask } from "./tasks/retry.js";

import { listHistory } from "./history/list.js";
import { getHistoryLog } from "./history/log.js";

import { createSchedule } from "./schedule/create.js";
import { handleCron } from "./cron.js";

export default {
    async fetch(req, env) {
        const url = new URL(req.url);

        /* =====================================================
         * 1️⃣ ADMIN LOGIN (STATIC – NO AUTH – NO SPA)
         * ===================================================== */
        if (url.pathname === "/admin/login.html") {
            return fetch(req);
        }

        /* =====================================================
         * 2️⃣ ADMIN STATIC FILES (CSS / JS / IMG)
         * ===================================================== */
        if (
            url.pathname.startsWith("/admin/") &&
            url.pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff2?|ttf)$/i)
        ) {
            return fetch(req);
        }

        /* =====================================================
         * 3️⃣ ADMIN SPA ROUTER
         * ===================================================== */
        if (
            url.pathname === "/admin" ||
            url.pathname === "/admin/" ||
            (
                url.pathname.startsWith("/admin/") &&
                !url.pathname.endsWith(".html")
            )
        ) {
            const rewrite = new URL(req.url);
            rewrite.pathname = "/admin/index.html";
            return fetch(new Request(rewrite, req));
        }

        /* =====================================================
         * 4️⃣ AUTH API (NO LOGIN REQUIRED)
         * ===================================================== */
        if (url.pathname === "/api/auth/login" && req.method === "POST") {
            return login(req, env);
        }

        /* =====================================================
         * 5️⃣ REQUIRE AUTH (ALL APIs BELOW)
         * ===================================================== */
        const session = await requireAuth(req, env);
        if (!session) {
            return new Response("UNAUTHORIZED", { status: 401 });
        }

        /* =====================================================
         * 6️⃣ AUTHENTICATED APIs
         * ===================================================== */
        switch (url.pathname) {
            case "/api/auth/change-password":
                return changePassword(req, env, session.admin_id);

            case "/api/tiktok/list":
                return listTikTok(req, env);
            case "/api/tiktok/create":
                return createTikTok(req, env);
            case "/api/tiktok/update":
                return updateTikTok(req, env);
            case "/api/tiktok/delete":
                return deleteTikTok(req, env);

            case "/api/tasks/send-message":
                return createSendMessage(req, env);
            case "/api/tasks/realtime":
                return realtimeTasks(req, env);
            case "/api/tasks/retry":
                return retryTask(req, env);

            case "/api/history/list":
                return listHistory(req, env);
            case "/api/history/log":
                return getHistoryLog(req, env);

            case "/api/schedule/create":
                return createSchedule(req, env);
        }

        return new Response("NOT_FOUND", { status: 404 });
    },

    async scheduled(event, env, ctx) {
        ctx.waitUntil(handleCron(env));
    }
};
