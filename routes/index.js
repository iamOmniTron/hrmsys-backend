const {Router} = require("express");
const {Login} = require("../controller/admin");
const {auth,requireAdminAccess} = require("../middleware/auth");
const {addEmployee,editEmployee,getEmployee,getEmployees,deleteEmployee} = require("../controller/employee");
const {addProfession,editProfession,getProfession,getProfessions,deleteProfession} = require("../controller/profession");
const {addSkill,editSkill,getSkill,getSkills,deleteSkill} = require("../controller/vocation");
const {getSalaries} = require("../controller/salary");


const router = Router();

//EMPLOYEE ROUTE
router.post("/employee",auth,requireAdminAccess,addEmployee);
router.get("/employee/:employeeId",auth,requireAdminAccess,getEmployee);
router.post("/employee/:employeeId",auth,requireAdminAccess,editEmployee);
router.get("/employees/all",auth,requireAdminAccess,getEmployees);
router.delete("/employee/:employeeId",auth,requireAdminAccess,deleteEmployee);

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

module.exports = router;