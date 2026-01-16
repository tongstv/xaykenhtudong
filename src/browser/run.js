
import { sendMessage } from "./tasks/sendMessage.js";
export async function runBrowserTask(job, env){
 const start=new Date().toISOString();
 await env.DB.prepare("UPDATE tasks SET status='running' WHERE id=?").bind(job.taskId).run();
 let result="success", log="";
 const browser=await env.BROWSER.launch();
 const ctx=await browser.newContext(); const page=await ctx.newPage();
 try{ if(job.type==="send_message") await sendMessage(page, job); }
 catch(e){ result="fail"; log=e.stack||String(e); }
 await env.DB.prepare("INSERT INTO browser_history (task_id,result,log,started_at,finished_at) VALUES (?,?,?,?,datetime('now'))")
  .bind(job.taskId,result,log,start).run();
 await env.DB.prepare("UPDATE tasks SET status=? WHERE id=?").bind(result,job.taskId).run();
 await browser.close();
}
