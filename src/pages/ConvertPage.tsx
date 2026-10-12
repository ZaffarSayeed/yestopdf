import { useRef, useState } from 'react';

interface Props { toolId: string; onNavigate: (page: string) => void }

type Meta = { title:string; subtitle:string; accept:string; multiple?:boolean; output:string; fields?: 'password'|'split'|'sign'|'rotate' };
const meta: Record<string,Meta> = {
 'pdf-to-word': {title:'PDF to Word',subtitle:'Convert PDFs into editable Word documents while preserving text and embedded images where possible.',accept:'.pdf',output:'DOCX'},
 'word-to-pdf': {title:'Word to PDF',subtitle:'Convert Word documents to PDF using Microsoft Word or LibreOffice on the server for faithful rendering.',accept:'.doc,.docx',output:'PDF'},
 'pdf-to-jpg': {title:'PDF to JPG',subtitle:'Render every PDF page as a high-quality JPG and download the pages as a ZIP.',accept:'.pdf',output:'JPG ZIP'},
 'pdf-to-png': {title:'PDF to PNG',subtitle:'Render every PDF page as a high-quality PNG and download the pages as a ZIP.',accept:'.pdf',output:'PNG ZIP'},
 'jpg-to-pdf': {title:'JPG to PDF',subtitle:'Combine JPG, PNG or TIFF images into a PDF in the order you select them.',accept:'.jpg,.jpeg,.png,.tif,.tiff',multiple:true,output:'PDF'},
 'pdf-to-excel': {title:'PDF to Excel',subtitle:'Extract tables and text into editable Excel worksheets. Scanned PDFs require OCR for best results.',accept:'.pdf',output:'XLSX'},
 'pdf-to-ppt': {title:'PDF to PowerPoint',subtitle:'Rebuild PDF text as editable PowerPoint text boxes and preserve embedded visual content where possible.',accept:'.pdf',output:'PPTX'},
 'rotate': {title:'Rotate PDF',subtitle:'Rotate every page by the selected angle and save a new PDF.',accept:'.pdf',output:'PDF',fields:'rotate'},
 'protect': {title:'Protect PDF',subtitle:'Encrypt a PDF with an AES-256 password on the server.',accept:'.pdf',output:'PDF',fields:'password'},
 'unlock': {title:'Unlock PDF',subtitle:'Remove password protection when you provide the correct password.',accept:'.pdf',output:'PDF',fields:'password'},
 'sign': {title:'Sign PDF',subtitle:'Add a simple typed signature to the last page of your PDF.',accept:'.pdf',output:'PDF',fields:'sign'},
 'compress': {title:'Compress PDF',subtitle:'Reduce PDF size using safe cleanup and stream/image compression.',accept:'.pdf',output:'PDF'},
 'merge': {title:'Merge PDF',subtitle:'Combine multiple PDF files into a single document in the order selected.',accept:'.pdf',multiple:true,output:'PDF'},
 'split': {title:'Split PDF',subtitle:'Extract a page range from a PDF into a new document.',accept:'.pdf',output:'PDF',fields:'split'},
};

export default function ConvertPage({toolId}: Props) {
 const m = meta[toolId] ?? meta['pdf-to-word'];
 const inputRef = useRef<HTMLInputElement>(null);
 const [files,setFiles]=useState<File[]>([]); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 const [password,setPassword]=useState(''); const [signature,setSignature]=useState(''); const [angle,setAngle]=useState('90'); const [start,setStart]=useState('1'); const [end,setEnd]=useState('1');
 const choose=(list:FileList|null)=>{ if(!list)return; setError(''); setFiles(Array.from(list)); };
 const run=async()=>{
   if(!files.length){setError('Please select a file first.');return}
   setBusy(true); setError('');
   try{
     const fd=new FormData(); files.forEach(f=>fd.append('files',f));
     if(m.fields==='password') fd.append('password',password);
     if(m.fields==='sign') fd.append('signature',signature);
     if(m.fields==='rotate') fd.append('angle',angle);
     if(m.fields==='split'){fd.append('start_page',start);fd.append('end_page',end)}
     const base=(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').trim().replace(/\/$/, '');
     let res: Response;
     try {
       res=await fetch(`${base}/api/process/${toolId}`,{method:'POST',body:fd});
     } catch (networkError) {
       throw new Error(`Cannot connect to the YesToPDF backend at ${base}. Confirm the backend is running, then check VITE_API_URL and CORS_ORIGINS. If the website is deployed, VITE_API_URL must be your deployed backend URL, not localhost.`);
     }
     if(!res.ok){let msg='Processing failed'; try{const j=await res.json();msg=j.detail||msg}catch{} throw new Error(msg)}
     const blob=await res.blob(); const cd=res.headers.get('content-disposition')||''; const match=cd.match(/filename="([^"]+)"/); const name=match?.[1] || `yestopdf-${toolId}.${m.output.toLowerCase().replace(' ','-')}`;
     const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
   }catch(e){setError(e instanceof Error?e.message:'Processing failed. Please try again.')}finally{setBusy(false)}
 };
 return <div className="min-h-screen bg-slate-50"><section className="bg-white border-b border-slate-100 py-12 px-4"><div className="max-w-3xl mx-auto text-center"><div className="inline-flex rounded-full bg-indigo-50 text-indigo-700 px-4 py-1.5 text-sm font-semibold mb-4">{m.output} TOOL</div><h1 className="text-4xl font-extrabold text-slate-900 mb-3">{m.title} Online</h1><p className="text-slate-500 text-lg">{m.subtitle}</p></div></section>
 <div className="max-w-2xl mx-auto px-4 py-12"><div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
  <input ref={inputRef} type="file" accept={m.accept} multiple={!!m.multiple} className="hidden" onChange={e=>choose(e.target.files)}/>
  {!files.length ? <button onClick={()=>inputRef.current?.click()} className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-12 hover:border-indigo-300 transition text-center"><div className="text-4xl mb-4">📄</div><div className="text-xl font-bold text-slate-800">Choose {m.multiple?'files':'a file'}</div><div className="text-slate-500 mt-2">Drag-and-drop can be added at deployment; file picker is fully functional now.</div><div className="mt-5 inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">Select file{m.multiple?'s':''}</div><div className="mt-4 text-xs text-slate-400">Maximum {import.meta.env.VITE_MAX_UPLOAD_MB || 100} MB per file</div></button> : <>
   <div className="rounded-2xl bg-slate-50 p-4 space-y-2">{files.map((f,i)=><div key={i} className="flex items-center justify-between gap-4"><span className="truncate font-medium text-slate-700">{f.name}</span><span className="text-xs text-slate-400">{(f.size/1024/1024).toFixed(2)} MB</span></div>)}</div>
   {(m.fields==='password')&&<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="PDF password" className="mt-5 w-full border border-slate-200 rounded-xl px-4 py-3"/>}
   {(m.fields==='sign')&&<input value={signature} onChange={e=>setSignature(e.target.value)} placeholder="Type your signature" className="mt-5 w-full border border-slate-200 rounded-xl px-4 py-3"/>}
   {(m.fields==='rotate')&&<select value={angle} onChange={e=>setAngle(e.target.value)} className="mt-5 w-full border border-slate-200 rounded-xl px-4 py-3"><option value="90">Rotate 90°</option><option value="180">Rotate 180°</option><option value="270">Rotate 270°</option></select>}
   {(m.fields==='split')&&<div className="mt-5 grid grid-cols-2 gap-3"><input type="number" min="1" value={start} onChange={e=>setStart(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-3" placeholder="Start page"/><input type="number" min="1" value={end} onChange={e=>setEnd(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-3" placeholder="End page"/></div>}
   {error&&<div className="mt-5 bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
   <div className="mt-6 flex gap-3"><button onClick={()=>inputRef.current?.click()} disabled={busy} className="flex-1 border border-slate-200 rounded-xl py-3 font-semibold">Change file</button><button onClick={run} disabled={busy} className="flex-1 bg-indigo-600 text-white rounded-xl py-3 font-semibold disabled:opacity-60">{busy?'Processing…':`Convert to ${m.output}`}</button></div>
   <p className="text-center text-xs text-slate-400 mt-5">Files are processed in an isolated temporary job directory and removed after the response.</p>
  </>}
 </div></div></div>
}
