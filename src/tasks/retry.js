
export async function retryTask(req, env){
 const {history_id}=await req.json();
 const row=await env.DB.prepare(`SELECT t.tiktok_account_id,t.task_type,t.payload FROM browser_history h JOIN tasks t ON t.id=h.task_id WHERE h.id=?`)
  .bind(history_id).first();
 if(!row) return new Response("NOT_FOUND",{status:404});
 const rs=await env.DB.prepare("INSERT INTO tasks (tiktok_account_id,task_type,payload,status,created_at) VALUES (?,?,?,?,datetime('now'))")
  .bind(row.tiktok_account_id,row.task_type,row.payload,"pending").run();
 const acc=await env.DB.prepare("SELECT * FROM tiktok_accounts WHERE id=?").bind(row.tiktok_account_id).first();
 await env.QUEUE.send({taskId:rs.meta.last_row_id,type:row.task_type,tiktok:{id:acc.id,username:acc.username,cookie:acc.cookie},data:JSON.parse(row.payload)});
 return Response.json({ok:true,newTaskId:rs.meta.last_row_id});
}
