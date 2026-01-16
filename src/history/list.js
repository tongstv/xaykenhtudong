
export async function listHistory(req, env){
 const rs=await env.DB.prepare(`
 SELECT h.id,h.task_id,h.result,h.started_at,h.finished_at,t.task_type,t.status,a.username AS tiktok_username
 FROM browser_history h JOIN tasks t ON t.id=h.task_id LEFT JOIN tiktok_accounts a ON a.id=t.tiktok_account_id
 ORDER BY h.id DESC LIMIT 200`).all();
 return Response.json(rs.results);
}
