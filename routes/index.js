const {Router} = require("express");
const {Login} = require("../controller/admin");
const {auth,requireAdminAccess} = require("../middleware/auth");
const {addEmployee,editEmployee,getEmployee,getEmployees,deleteEmployee} = require("../controller/employee");


const router = Router();

//EMPLOYEE ROUTE
router.post("/employee",auth,requireAdminAccess,addEmployee);
router.get("/employee/:employeeId",auth,requireAdminAccess,getEmployee);
router.post("/employee/:employeeId",auth,requireAdminAccess,editEmployee);
router.get("/employee/all",auth,requireAdminAccess,getEmployees);
router.delete("/employee/:employeeId",auth,requireAdminAccess,deleteEmployee);

// AUTH ROUTE
router.post("/admin/login",Login);

module.exports = router;