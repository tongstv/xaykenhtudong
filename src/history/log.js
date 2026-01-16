
export async function getHistoryLog(req, env){
 const id=new URL(req.url).searchParams.get("id");
 const r=await env.DB.prepare("SELECT log FROM browser_history WHERE id=?").bind(id).first();
 return Response.json(r||{log:""});
}
