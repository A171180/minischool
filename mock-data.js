/* ===== mock-data.js — SAMPLE ONLY. Phase 2 replaces this file with Node + MySQL. ===== */
const MOCK = {
  departments:["Computer Science","Mathematics","Physics","Biology","Arts"],
  students:[
    {id:1001,name:"Aarav Sharma",email:"aarav.sharma@mineschool.edu",dept:"Computer Science",year:2,gpa:3.7,att:94,joined:"2026-09-04"},
    {id:1002,name:"Simran Kaur",email:"simran.kaur@mineschool.edu",dept:"Mathematics",year:3,gpa:3.9,att:97,joined:"2026-09-06"},
    {id:1003,name:"Rohan Mehta",email:"rohan.mehta@mineschool.edu",dept:"Physics",year:1,gpa:3.2,att:88,joined:"2026-09-12"},
    {id:1004,name:"Priya Nair",email:"priya.nair@mineschool.edu",dept:"Biology",year:4,gpa:3.5,att:91,joined:"2026-09-15"},
    {id:1005,name:"Kabir Singh",email:"kabir.singh@mineschool.edu",dept:"Computer Science",year:1,gpa:2.9,att:82,joined:"2026-09-21"},
    {id:1006,name:"Meera Iyer",email:"meera.iyer@mineschool.edu",dept:"Arts",year:2,gpa:3.6,att:95,joined:"2026-10-02"},
    {id:1007,name:"Arjun Verma",email:"arjun.verma@mineschool.edu",dept:"Mathematics",year:1,gpa:3.1,att:86,joined:"2026-10-11"},
    {id:1008,name:"Tanvi Gill",email:"tanvi.gill@mineschool.edu",dept:"Biology",year:3,gpa:3.8,att:96,joined:"2026-10-24"}],
  courses:[
    {code:"CS101",title:"Intro to Programming",dept:"Computer Science",credits:4,enrolled:62},
    {code:"CS240",title:"Databases and SQL",dept:"Computer Science",credits:3,enrolled:48},
    {code:"MA120",title:"Linear Algebra",dept:"Mathematics",credits:4,enrolled:55},
    {code:"PH110",title:"Mechanics",dept:"Physics",credits:3,enrolled:40},
    {code:"BI130",title:"Cell Biology",dept:"Biology",credits:3,enrolled:44},
    {code:"AR105",title:"Digital Illustration",dept:"Arts",credits:2,enrolled:30}],
  exams:[
    {date:"2026-11-09",course:"CS101 Intro to Programming",dept:"Computer Science",room:"Hall A",mins:120},
    {date:"2026-11-11",course:"MA120 Linear Algebra",dept:"Mathematics",room:"Hall B",mins:150},
    {date:"2026-11-14",course:"PH110 Mechanics",dept:"Physics",room:"Hall A",mins:120},
    {date:"2026-11-17",course:"BI130 Cell Biology",dept:"Biology",room:"Hall C",mins:90},
    {date:"2026-11-20",course:"CS240 Databases and SQL",dept:"Computer Science",room:"Hall B",mins:120},
    {date:"2026-11-24",course:"AR105 Digital Illustration",dept:"Arts",room:"Studio 2",mins:180}]
};