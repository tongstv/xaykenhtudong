
export async function updateTikTok(req, env){
 const {id,password,cookie,status}=await req.json();
 await env.DB.prepare("UPDATE tiktok_accounts SET password=?,cookie=?,status=? WHERE id=?")
  .bind(password||"",cookie||"",status||"idle",id).run();
 return Response.json({ok:true});
}
