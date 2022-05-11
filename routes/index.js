const {Router} = require("express");
const {Login} = require("../controller/admin");
const {auth,requireAdminAccess} = require("../middleware/auth");
const {addEmployee,editEmployee,getEmployee,getEmployees,deleteEmployee,getMailAddresses,login,getUrls,joinTraining, getProfile} = require("../controller/employee");
const {addProfession,editProfession,getProfession,getProfessions,deleteProfession} = require("../controller/profession");
const {addTraining,editTraining,getTraining,getTrainings,deleteTraining} = require("../controller/training");
const {payEmployee,getPayrolls} = require("../controller/payroll");
const {upload} = require("../helpers");


const router = Router();

//EMPLOYEE ROUTE
router.post("/employee",auth,requireAdminAccess,upload.single("picture"),addEmployee);
router.get("/employee/:employeeId",auth,getEmployee);
router.post("/employee/:employeeId",auth,requireAdminAccess,editEmployee);
router.get("/profile",auth,getProfile);
router.get("/employees/emails",getMailAddresses);
router.post("/auth/employee/login",login);
router.get("/auth/employee/:email",getUrls);
router.post("employee/training/:trainingId",auth,joinTraining);
router.get("/employees/all",auth,requireAdminAccess,getEmployees);
router.post("/delete/employee/:employeeId",auth,requireAdminAccess,deleteEmployee);
router.get("/employees/salary",auth,requireAdminAccess,getPayrolls);


// AUTH ROUTE
router.post("/admin/login",Login);

// PROFESSION
router.post("/profession",auth,requireAdminAccess,addProfession);
router.get("/profession/:professionId",auth,requireAdminAccess,getProfession);
router.post("/profession/:professionId",auth,requireAdminAccess,editProfession);
router.get("/professions/all",auth,requireAdminAccess,getProfessions);
router.post("/delete/profession/:professionId",auth,requireAdminAccess,deleteProfession);

// TRAINING
router.post("/training",auth,requireAdminAccess,addTraining);
router.get("/training/:trainingId",auth,requireAdminAccess,getTraining);
router.get("/trainings/all",auth,getTrainings);
router.post("/training/:trainingId",auth,requireAdminAccess,editTraining);
router.post("/delete/training/:trainingId",auth,requireAdminAccess,deleteTraining);

// PAYROLL
router.post("/pay/employee",auth,requireAdminAccess,payEmployee);

module.exports = router;