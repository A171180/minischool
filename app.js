/* ===== app.js ===== */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const initials=n=>n.split(" ").map(w=>w[0]).slice(0,2).join("");
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2200)}
const opts=(a,all)=>(all?'<option value="">All departments</option>':"")+a.map(d=>`<option>${esc(d)}</option>`).join("");

const PAGES=[
 {id:"dashboard",name:"Main Building",sub:"Dashboard",roof:"#b8392b",wall:"#d9d2c3",main:1},
 {id:"students",name:"Student Office",sub:"Students",roof:"#8b5a2b",wall:"#c98f56"},
 {id:"courses",name:"Library",sub:"Courses",roof:"#3f6fb0",wall:"#8aa7c9"},
 {id:"exams",name:"Examination Hall",sub:"Exams",roof:"#5b6068",wall:"#a9aeb6"},
 {id:"attendance",name:"Attendance Centre",sub:"Attendance",roof:"#3f7a27",wall:"#9ccc7a"},
 {id:"sql",name:"Database Laboratory",sub:"SQL Explorer",roof:"#6a4aa0",wall:"#b3a2d6"}];
const ORDER=["courses","dashboard","exams","students","attendance","sql"];

$("#nav").innerHTML='<a href="#campus">Campus</a>'+PAGES.map(p=>`<a href="#${p.id}">${p.sub}</a>`).join("");
$("#buildings").innerHTML=ORDER.map(id=>PAGES.find(p=>p.id===id)).map(p=>{
  const w=Array.from({length:p.main?6:4},()=>"<i></i>").join("");
  return `<a class="bld${p.main?" main":""}" href="#${p.id}" style="--roof:${p.roof};--wall:${p.wall}" aria-label="${p.name}: ${p.sub}"><span class="roof"></span><span class="wall">${w}<b></b></span><span class="sign">${p.name}</span><small>${p.sub}</small></a>`}).join("");

/* theme */
const root=document.documentElement;
$("#theme").onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;root.dataset.theme=dark?"light":"dark";$("#theme").textContent=dark?"Night":"Day"};

/* dashboard */
function renderDash(){
  const S=DataService.students.list(),C=DataService.courses.list(),D=DataService.departments.list();
  const avg=S.length?Math.round(S.reduce((a,s)=>a+s.att,0)/S.length):0;
  $("#stats").innerHTML=[[S.length,"Total students"],[C.length,"Total courses"],[D.length,"Departments"],[avg+"%","Average attendance"]].map(([n,l])=>`<div class="pix stat"><strong>${n}</strong><span>${l}</span></div>`).join("");
  const g=D.map(d=>{const m=S.filter(s=>s.dept===d);return m.length?m.reduce((a,s)=>a+s.gpa,0)/m.length:0});
  $("#bars").innerHTML=g.map(v=>`<div class="bar">${v.toFixed(1)}<div style="height:${v/4*85}%"></div></div>`).join("");
  $("#lbls").innerHTML=D.map(d=>`<span>${esc(d.split(" ")[0])}</span>`).join("");
  $("#recent").innerHTML=[...S].sort((a,b)=>b.joined.localeCompare(a.joined)).slice(0,5).map(s=>`<li><span>${esc(s.name)}<br><small style="color:var(--mute)">${esc(s.dept)}</small></span><span class="chip">${esc(s.joined)}</span></li>`).join("")||"<li>No registrations yet.</li>";
}

/* students */
function renderStudents(){
  const q=$("#ssearch").value.trim().toLowerCase();
  const rows=DataService.students.list().filter(s=>(s.name+s.email+s.dept).toLowerCase().includes(q));
  $("#stbody").innerHTML=rows.map(s=>`<tr><td>${s.id}</td><td>${esc(s.name)}</td><td>${esc(s.dept)}</td><td>${s.year}</td><td>${s.gpa.toFixed(1)}</td><td><div class="acts"><button class="btn sm st" data-a="view" data-id="${s.id}">Profile</button><button class="btn sm" data-a="edit" data-id="${s.id}">Edit</button><button class="btn sm dn" data-a="del" data-id="${s.id}">Delete</button></div></td></tr>`).join("")||`<tr><td colspan="6">No students match “${esc(q)}”. Clear the search or register a new student above.</td></tr>`;
}
function resetForm(){$("#sform").reset();$("#sid").value="";$("#formTitle").textContent="Register a student";$("#ssave").textContent="Register student";$("#scancel").hidden=true}
$("#sform").onsubmit=e=>{e.preventDefault();
  const v={name:$("#sname").value.trim(),email:$("#semail").value.trim(),dept:$("#sdept").value,year:+$("#syear").value,gpa:+$("#sgpa").value};
  if($("#sid").value){DataService.students.update(+$("#sid").value,v);toast("Student updated")}else{DataService.students.add(v);toast("Student registered")}
  resetForm();renderStudents()};
$("#scancel").onclick=resetForm;
$("#ssearch").oninput=renderStudents;
$("#stbody").onclick=e=>{const b=e.target.closest("button");if(!b)return;const id=+b.dataset.id,s=DataService.students.list().find(x=>x.id===id);
  if(b.dataset.a==="edit"){$("#sid").value=id;$("#sname").value=s.name;$("#semail").value=s.email;$("#sdept").value=s.dept;$("#syear").value=s.year;$("#sgpa").value=s.gpa;$("#formTitle").textContent="Edit "+s.name;$("#ssave").textContent="Save changes";$("#scancel").hidden=false;scrollTo({top:0,behavior:"smooth"});$("#sname").focus()}
  if(b.dataset.a==="del"&&confirm(`Delete ${s.name}? (sample data only)`)){DataService.students.remove(id);renderStudents();toast("Student deleted")}
  if(b.dataset.a==="view"){$("#prof").innerHTML=`<div style="display:flex;gap:14px;align-items:center"><div class="avatar">${esc(initials(s.name))}</div><div><h3>${esc(s.name)}</h3><span class="chip">ID ${s.id}</span></div></div><ul class="clean" style="margin:14px 0"><li><span>Email</span><span>${esc(s.email)}</span></li><li><span>Department</span><span>${esc(s.dept)}</span></li><li><span>Year</span><span>${s.year}</span></li><li><span>GPA</span><span>${s.gpa.toFixed(1)}</span></li><li><span>Attendance</span><span>${s.att}%</span></li><li><span>Joined</span><span>${esc(s.joined)}</span></li></ul><button class="btn" onclick="this.closest('dialog').close()">Close profile</button>`;$("#prof").showModal()}};

/* courses */
function renderCourses(){
  $("#clist").innerHTML=DataService.courses.list().map(c=>`<div class="pix card"><span class="chip">${esc(c.code)}</span><h3 style="margin:8px 0 4px">${esc(c.title)}</h3><p style="margin:0;color:var(--mute)">${esc(c.dept)} · ${c.credits} credits${c.enrolled!=null?" · "+c.enrolled+" enrolled":""}</p><button class="btn sm dn" style="margin-top:10px" data-code="${esc(c.code)}">Remove</button></div>`).join("")||'<p>No courses yet. Add one above.</p>'}
$("#cform").onsubmit=e=>{e.preventDefault();DataService.courses.add({code:$("#ccode").value.trim().toUpperCase(),title:$("#ctitle").value.trim(),dept:$("#cdept").value,credits:+$("#ccred").value,enrolled:0});e.target.reset();renderCourses();toast("Course added")};
$("#clist").onclick=e=>{const b=e.target.closest("button[data-code]");if(b){DataService.courses.remove(b.dataset.code);renderCourses();toast("Course removed")}};

/* exams */
function renderExams(){const f=$("#efilter").value;
  $("#etbody").innerHTML=DataService.exams.list().filter(x=>!f||x.dept===f).sort((a,b)=>a.date.localeCompare(b.date)).map(x=>`<tr><td>${esc(x.date)}</td><td>${esc(x.course)}</td><td>${esc(x.room)}</td><td>${x.mins} min</td><td><span class="chip">Upcoming</span></td></tr>`).join("")||'<tr><td colspan="5">No exams for this department.</td></tr>'}
$("#efilter").onchange=renderExams;

/* attendance (today's marks live only in memory) */
const today={};
function renderAtt(){const S=DataService.students.list();
  $("#atbody").innerHTML=S.map(s=>`<tr><td>${esc(s.name)}</td><td>${s.att}%</td><td><button class="btn sm ${today[s.id]?"":"dn"}" data-id="${s.id}" aria-pressed="${!!today[s.id]}">${today[s.id]?"Present":"Absent"}</button></td></tr>`).join("");
  const n=S.filter(s=>today[s.id]).length;$("#acnt").textContent=n;$("#apct").textContent=(S.length?Math.round(n/S.length*100):0)+"%"}
$("#atbody").onclick=e=>{const b=e.target.closest("button");if(b){today[b.dataset.id]=!today[b.dataset.id];renderAtt()}};
$("#allp").onclick=()=>{DataService.students.list().forEach(s=>today[s.id]=true);renderAtt()};
$("#alla").onclick=()=>{DataService.students.list().forEach(s=>today[s.id]=false);renderAtt()};

/* sql explorer */
const QUERIES=[
 {t:"Read every student",sql:"<em>SELECT</em> * <em>FROM</em> students;",say:"Asks the database for every column of every row in the students table. Use it to fill the student list.",run:()=>{const s=DataService.students.list();return table(["id","name","dept","year","gpa"],s.map(x=>[x.id,x.name,x.dept,x.year,x.gpa]))}},
 {t:"Find top performers",sql:"<em>SELECT</em> name, gpa <em>FROM</em> students\n<em>WHERE</em> gpa >= 3.7 <em>ORDER BY</em> gpa <em>DESC</em>;",say:"Keeps only students with a GPA of 3.7 or higher and sorts the best first. WHERE filters rows, ORDER BY sorts them.",run:()=>table(["name","gpa"],DataService.students.list().filter(x=>x.gpa>=3.7).sort((a,b)=>b.gpa-a.gpa).map(x=>[x.name,x.gpa]))},
 {t:"Register a student",sql:"<em>INSERT INTO</em> students (name, email, dept, year, gpa)\n<em>VALUES</em> ('Nisha Rao', 'nisha.rao@mineschool.edu',\n        'Physics', 1, 3.4);",say:"Adds one new row. The values list must line up with the column list. This runs when you press “Register student”.",run:()=>"1 row would be added. Sample data was not changed."},
 {t:"Update a student",sql:"<em>UPDATE</em> students <em>SET</em> gpa = 3.8, year = 3\n<em>WHERE</em> id = 1001;",say:"Changes the listed columns on the matching row only. Without WHERE, every student would change, so always include it.",run:()=>"1 row would be updated (id 1001). Sample data was not changed."},
 {t:"Delete a student",sql:"<em>DELETE FROM</em> students <em>WHERE</em> id = 1005;",say:"Removes the matching row for good. Like UPDATE, a missing WHERE would wipe the whole table.",run:()=>"1 row would be deleted (id 1005). Sample data was not changed."},
 {t:"Average GPA per department",sql:"<em>SELECT</em> dept, <em>AVG</em>(gpa) <em>AS</em> avg_gpa\n<em>FROM</em> students <em>GROUP BY</em> dept;",say:"Groups students by department, then averages each group. This feeds the chart on the dashboard.",run:()=>{const S=DataService.students.list();return table(["dept","avg_gpa"],DataService.departments.list().filter(d=>S.some(s=>s.dept===d)).map(d=>{const m=S.filter(s=>s.dept===d);return[d,(m.reduce((a,s)=>a+s.gpa,0)/m.length).toFixed(2)]}))}}];
function table(h,r){return `<div class="tw" style="margin:0"><table style="min-width:0"><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
$("#qlist").innerHTML=QUERIES.map((q,i)=>`<div class="pix card" style="margin-bottom:18px"><h3>${q.t}</h3><pre class="code">${q.sql}</pre><p style="margin:0 0 10px">${q.say}</p><button class="btn sm" data-q="${i}">Run on sample data</button><div class="res" id="r${i}" aria-live="polite"></div></div>`).join("");
$("#qlist").onclick=e=>{const b=e.target.closest("button[data-q]");if(b)$("#r"+b.dataset.q).innerHTML=QUERIES[b.dataset.q].run()};

/* router (plain #name hashes) */
const VIEWS={dashboard:renderDash,students:renderStudents,courses:renderCourses,exams:renderExams,attendance:renderAtt};
function route(){const id=(location.hash||"#campus").slice(1);const pg=document.getElementById(id)&&document.getElementById(id).classList.contains("page")?id:"campus";
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("on",p.id===pg));
  document.querySelectorAll("#nav a").forEach(a=>a.getAttribute("href")==="#"+pg?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
  if(VIEWS[pg])VIEWS[pg]();scrollTo(0,0)}
["#sdept","#cdept"].forEach(s=>$(s).innerHTML=opts(DataService.departments.list()));
$("#efilter").innerHTML=opts(DataService.departments.list(),true);
addEventListener("hashchange",route);route();