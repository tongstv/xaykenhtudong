
import { runBrowserTask } from "./src/browser/run.js";
export default { async queue(batch, env){ for(const m of batch.messages){ try{ await runBrowserTask(m.body, env); m.ack(); }catch(e){ console.error(e);} } } };
