import { chromium } from "/home/user/collabz/node_modules/playwright/index.mjs";
import fs from "fs";
const dir=process.env.FRAMES||("/tmp/claude-0/" + process.env.NAME); fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir);
const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const p=await b.newPage({viewport:{width:1080,height:1920}});
if(process.env.TIMES_T) await p.addInitScript(`window.T=${process.env.TIMES_T}`);
await p.goto("file://"+(process.env.HTML||new URL("./" + process.env.NAME + ".html", import.meta.url).pathname),{waitUntil:"load"}); await p.evaluate(()=>document.fonts.ready);
const dur=await p.evaluate(()=>window.DUR); const fps=30;
const only=process.argv[2];
const times= only? only.split(",").map(Number) : Array.from({length:Math.ceil(fps*dur)},(_,i)=>i/fps);
let i=0; for(const t of times){ await p.evaluate(t=>render(t),t); await p.screenshot({path:`${dir}/f${String(i++).padStart(4,"0")}.jpg`,type:"jpeg",quality:92}); }
console.log("frames",i,"dur",dur);
await b.close();
