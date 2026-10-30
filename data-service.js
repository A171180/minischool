/* ===== data-service.js — the ONLY place the UI reads/writes data. =====
   Phase 2: swap each body for fetch("/api/students") etc. Keep the signatures. */
const DataService = {
  students:{list:()=>MOCK.students,
    add(s){s.id=Math.max(1000,...MOCK.students.map(x=>x.id))+1;s.att=90;s.joined=new Date().toISOString().slice(0,10);MOCK.students.push(s)},
    update(id,v){Object.assign(MOCK.students.find(x=>x.id===id),v)},
    remove(id){MOCK.students=MOCK.students.filter(x=>x.id!==id)}},
  courses:{list:()=>MOCK.courses,add:c=>MOCK.courses.push(c),remove:code=>{MOCK.courses=MOCK.courses.filter(x=>x.code!==code)}},
  exams:{list:()=>MOCK.exams},
  departments:{list:()=>MOCK.departments}
};