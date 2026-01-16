
export async function handleCron(env){
 const rs=await env.DB.prepare("SELECT * FROM schedules WHERE status='pending' AND run_at<=datetime('now') LIMIT 20").all();
 for(const s of rs.results){
  const t=await env.DB.prepare("INSERT INTO tasks (tiktok_account_id,task_type,payload,status,created_at) VALUES (?,?,?,?,datetime('now'))")
   .bind(s.tiktok_account_id,s.task_type,s.payload,"pending").run();
  const acc=await env.DB.prepare("SELECT * FROM tiktok_accounts WHERE id=?").bind(s.tiktok_account_id).first();
  await env.QUEUE.send({taskId:t.meta.last_row_id,type:s.task_type,tiktok:{id:acc.id,username:acc.username,cookie:acc.cookie},data:JSON.parse(s.payload)});
  await env.DB.prepare("UPDATE schedules SET status='done' WHERE id=?").bind(s.id).run();
 }
}
