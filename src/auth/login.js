
import { sha256 } from "../utils/crypto.js";
export async function login(req, env){
 const {username,password}=await req.json();
 const h=await sha256(password);
 const u=await env.DB.prepare("SELECT * FROM admin_users WHERE username=? AND password_hash=?")
   .bind(username,h).first();
 if(!u) return new Response("UNAUTHORIZED",{status:401});
 const token=crypto.randomUUID();
 await env.DB.prepare("INSERT INTO admin_sessions (admin_id, token, expired_at) VALUES (?,?,datetime('now','+1 day'))")
   .bind(u.id,token).run();
 return new Response(JSON.stringify({ok:true}),{headers:{"Set-Cookie":`admin_token=${token}; Path=/; HttpOnly`}});
}
