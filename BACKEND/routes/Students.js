const router = require("express").Router();
let Student = require("../models/Student");

//crud part
//create a student
//http://localhost:8070/student/add
router.route("/add").post((req,res) =>{
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender
  })

  newStudent.save().then(()=>{
    res.json("New Student Added")
  }).catch((err)=>{
    console.log(err);
  })
})

//display all students
//http://localhost:8070/student/
router.route("/").get((req,res)=>{
  Student.find().then((student)=>{
    res.json(student)
  }).catch((err)=>{
    console.log(err)
  })
})

//update a student details
//http://localhost:8070/student/updateStudent/generatedIdByMongoDB
                                          //assync await function
router.route("/updateStudent/:studentid").put(async(req,res)=>{
  let studentId = req.params.studentid;
  //const name = req.body.name; formal type
  
  const{name,age,gender} = req.body  //destructure method

  const updateStudent = {
    name,
    age,
    gender
  }

  const update = await Student.findByIdAndUpdate(studentId,updateStudent).then(()=>{
    res.status(200).send({status: "user updates"})
  }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"error with updating student data",error: err.message})
  });

  //res.status(200).send({status:"user updated"})//if update success
})

//delete a student details
//http://localhost:8070/student/deleteStudent/generatedIdByMongoDB

router.route("/deleteStudent/:studentId").delete(async(req,res)=>{
  let studentId = req.params.studentId;

  await Student.findByIdAndDelete(studentId).then((res)=>{
    res.status(200).send({status: "user deleted"});
  }).catch((err)=>{
    //console.log(err.message);
    res.status(500).send({status: "cant find user to delete",error: err.message})
  })
})

//display one student details
//http://localhost:8070/student/


router.route("/get/:studentid").get((req,res)=>{
  let studentId = req.params.studentid;
  Student.findById(studentId).then((student)=>{
    res.json(student)
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router;