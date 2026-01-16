
export async function createSchedule(req, env){
 const {tiktok_account_id,run_at,url,message}=await req.json();
 const payload=JSON.stringify({url,message});
 await env.DB.prepare("INSERT INTO schedules (tiktok_account_id,task_type,payload,run_at,status,created_at) VALUES (?,?,?,?, 'pending', datetime('now'))")
  .bind(tiktok_account_id,"send_message",payload,run_at).run();
 return Response.json({ok:true});
}
