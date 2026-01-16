
import { sha256 } from "../utils/crypto.js";
export async function changePassword(req, env, adminId){
 const {oldPassword,newPassword}=await req.json();
 const oh=await sha256(oldPassword);
 const a=await env.DB.prepare("SELECT * FROM admin_users WHERE id=? AND password_hash=?").bind(adminId,oh).first();
 if(!a) return new Response("WRONG_PASSWORD",{status:400});
 const nh=await sha256(newPassword);
 await env.DB.prepare("UPDATE admin_users SET password_hash=? WHERE id=?").bind(nh,adminId).run();
 return Response.json({ok:true});
}
