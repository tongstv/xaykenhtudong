
export async function createTikTok(req, env){
 const {tiktok_id,username,password,cookie}=await req.json();
 if(!tiktok_id||!cookie) return new Response("INVALID_DATA",{status:400});
 await env.DB.prepare("INSERT INTO tiktok_accounts (tiktok_id,username,password,cookie,created_at) VALUES (?,?,?,?,datetime('now'))")
  .bind(tiktok_id,username||"",password||"",cookie).run();
 return Response.json({ok:true});
}
