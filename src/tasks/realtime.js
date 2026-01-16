
export async function realtimeTasks(req, env){
 const rs=await env.DB.prepare(`
 SELECT t.id AS task_id,t.status,t.task_type,a.username AS tiktok_username,
 h.id AS history_id,h.result,h.started_at,h.finished_at
 FROM tasks t
 LEFT JOIN browser_history h ON h.task_id=t.id
 LEFT JOIN tiktok_accounts a ON a.id=t.tiktok_account_id
 ORDER BY t.id DESC LIMIT 50`).all();
 return Response.json(rs.results);
}
