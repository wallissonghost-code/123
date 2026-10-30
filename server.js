import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';
const databaseFile=process.env.DB_PATH||'data/entries.sqlite';
await fs.mkdir(path.dirname(databaseFile),{recursive:true});
const db=new DatabaseSync(databaseFile);
db.exec('CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY, text TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)');
const insert=db.prepare('INSERT INTO entries(text) VALUES (?)');
const select=db.prepare('SELECT id,text,created_at FROM entries ORDER BY id DESC LIMIT 100');
const assets={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js'};
const server=http.createServer(async(req,res)=>{
 const respond=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
 try{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/api/entries'){
   if(req.method==='GET')return respond(200,select.all());
   if(req.method!=='POST')return respond(405,{error:'Method not allowed'});
   let raw='';
   for await(const chunk of req){raw+=chunk;if(raw.length>20000)return respond(413,{error:'Too large'})}
   let value;
   try{value=JSON.parse(raw).text}catch{return respond(400,{error:'Invalid JSON'})}
   if(typeof value!=='string'||!value.trim()||value.length>10000)return respond(400,{error:'Invalid text'});
   const result=insert.run(value.trim());return respond(201,{id:Number(result.lastInsertRowid)});
  }
  if(req.method!=='GET')return respond(405,{error:'Method not allowed'});
  const file=assets[pathname];if(!file)return respond(404,{error:'Not found'});
  const body=await fs.readFile(file);
  const type=file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html';
  res.writeHead(200,{'Content-Type':type+'; charset=utf-8'});res.end(body);
 }catch(e){console.error(e);respond(500,{error:'Internal error'})}
});
server.listen(Number(process.env.PORT||3000));