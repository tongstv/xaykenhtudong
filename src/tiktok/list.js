
export async function listTikTok(req, env){
 const rs=await env.DB.prepare("SELECT * FROM tiktok_accounts ORDER BY id DESC").all();
 return Response.json(rs.results);
}
