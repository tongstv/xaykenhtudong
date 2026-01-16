
export async function deleteTikTok(req, env){
 const {id}=await req.json();
 await env.DB.prepare("DELETE FROM tiktok_accounts WHERE id=?").bind(id).run();
 return Response.json({ok:true});
}
