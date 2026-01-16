
export async function requireAuth(req, env){
 const c=req.headers.get("Cookie")||"";
 const t=c.match(/admin_token=([^;]+)/)?.[1];
 if(!t) return null;
 return await env.DB.prepare("SELECT * FROM admin_sessions WHERE token=? AND expired_at>datetime('now')")
   .bind(t).first();
}
