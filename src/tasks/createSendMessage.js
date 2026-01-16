
export async function createSendMessage(req, env){
 const {tiktok_account_id,url,message}=await req.json();
 if(!tiktok_account_id||!url||!message) return new Response("INVALID_DATA",{status:400});
 const payload=JSON.stringify({url,message});
 const rs=await env.DB.prepare("INSERT INTO tasks (tiktok_account_id,task_type,payload,status,created_at) VALUES (?,?,?,?,datetime('now'))")
  .bind(tiktok_account_id,"send_message",payload,"pending").run();
 const acc=await env.DB.prepare("SELECT * FROM tiktok_accounts WHERE id=?").bind(tiktok_account_id).first();
 await env.QUEUE.send({taskId:rs.meta.last_row_id,type:"send_message",tiktok:{id:acc.id,username:acc.username,cookie:acc.cookie},data:{url,message}});
 return Response.json({ok:true,taskId:rs.meta.last_row_id});
}
