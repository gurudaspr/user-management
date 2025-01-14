import { useIndexedDB } from "react-indexed-db-hook";
import bcrypt from 'bcryptjs';

const USER_STORE = "employees";

export const useEmployeeDB = () => {
  const { add, update, getAll, getByID, deleteRecord } = useIndexedDB(USER_STORE);

  const addEmployee = async (employeeData) => {
    try {
      const employees = await getAll();
      const employeeExists = employees.some(emp => emp.email === employeeData.email);
  
      if (employeeExists) {
        throw new Error("Employee with this email already exists.");
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(employeeData.password, salt);
  
      const newEmployee = { ...employeeData, password: hashedPassword };
      const id = await add(newEmployee);
  
      console.log("Employee added successfully", id);
      return id;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  };
  const loginEmployee = async (email, password) => {
    try {
      const employees = await getAll();
      console.log('Employees from DB:', employees);
      const employee = employees.find(emp => emp.email === email);
      
  
      if (!employee) {
        throw new Error("No employee found with this email.");
      }
  
      const passwordMatches = bcrypt.compareSync(password, employee.password);
  
      if (!passwordMatches) {
        throw new Error("Invalid Credentials");
      }
      
      return {
        success: true,
        employee
      };
    } catch (error) {
        throw new Error(error.message);
    }
  };

  const getAllEmployees = async () => {
    try {
      const employees = await getAll();
      return employees;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error(error.message);
    }
  };

  return {
    addEmployee,
    loginEmployee,
    getAllEmployees,
  };
};
