const {Router} = require("express");
const {Login} = require("../controller/admin");
const {auth,requireAdminAccess} = require("../middleware/auth");
const {addEmployee,editEmployee,getEmployee,getEmployees,deleteEmployee,getMailAddresses,login,getUrls,logout,getEmployeesSalaries} = require("../controller/employee");
const {addProfession,editProfession,getProfession,getProfessions,deleteProfession} = require("../controller/profession");
const {addSkill,editSkill,getSkill,getSkills,deleteSkill} = require("../controller/vocation");
const {getSalaries} = require("../controller/salary");
const {addTraining,editTraining,getTraining,getTrainings,deleteTraining} = require("../controller/training");
const {getSessions} = require("../controller/session");
const {joinProgram,getUserPrograms} = require("../controller/program");
const {payEmployee} = require("../controller/payroll");
const {upload} = require("../helpers");


const router = Router();

//EMPLOYEE ROUTE
router.post("/employee",auth,requireAdminAccess,upload.single("picture"),addEmployee);
router.get("/employee/:employeeId",auth,requireAdminAccess,getEmployee);
router.post("/employee/:employeeId",auth,requireAdminAccess,editEmployee);
router.get("/employees/emails",getMailAddresses);
router.post("/auth/employee/login",login);
router.get("/auth/employee/logout",auth,logout);
router.get("/auth/employee/:email",getUrls);
router.get("/employees/all",auth,requireAdminAccess,getEmployees);
router.delete("/employee/:employeeId",auth,requireAdminAccess,deleteEmployee);
router.get("/employees/salary",auth,requireAdminAccess,getEmployeesSalaries);


// AUTH ROUTE
router.post("/admin/login",Login);

// PROFESSION
router.post("/profession",auth,requireAdminAccess,addProfession);
router.get("/profession/:professionId",auth,requireAdminAccess,getProfession);
router.post("/profession/:professionId",auth,requireAdminAccess,editProfession);
router.get("/professions/all",auth,requireAdminAccess,getProfessions);
router.delete("/profession/:professionId",auth,requireAdminAccess,deleteProfession);

// VOCATION
router.post("/skill",auth,requireAdminAccess,addSkill);
router.get("/skill/:skillId",auth,requireAdminAccess,getSkill);
router.post("/skill/:skillId",auth,requireAdminAccess,editSkill);
router.get("/skills/all",auth,requireAdminAccess,getSkills);
router.delete("/skill/:skillId",auth,requireAdminAccess,deleteSkill);

// SALARY
router.get("/salaries/all",auth,requireAdminAccess,getSalaries);

// TRAINING
router.post("/training",auth,requireAdminAccess,addTraining);
router.get("/training/:trainingId",auth,requireAdminAccess,getTraining);
router.get("/trainings/all",auth,requireAdminAccess,getTrainings);
router.post("/training/:trainingId",auth,requireAdminAccess,editTraining);
router.delete("/training/:trainingId",auth,requireAdminAccess,deleteTraining);

// PROGRAM
router.post("/program",auth,joinProgram);
router.get("/program",auth,getUserPrograms);

// SESSION
router.get("/sessions",auth,requireAdminAccess,getSessions);

// PAYROLL
router.post("/pay/employee",auth,requireAdminAccess,payEmployee);

module.exports = router;