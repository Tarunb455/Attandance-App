import Attendance from '../models/attendanceModel.js'
import User from '../models/User.js';

export const getEmps = async (req, res) => {
    try {
      // Fetch all Emps from the database
      const emps = await User.find();
  
      res.status(200).send({ emps });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Error in fetching Emps", error });
    }
  };
  
  export const attands = async (req, res) => {
    try {
      const { userId } = req.params; // Assuming you pass userId in the URL parameters
      // Fetch attendance records by userId from the database
      const attand = await Attendance.find({ userId });
  
      if (!attand || attand.length === 0) {
        return res.status(404).send({ success: false, message: "Attendance not found" });
      }
  
      res.status(200).send({ attand });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Error in fetching Employee Attendance", error });
    }
  };
  

  // export const getContact = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     // Find the contact by ID and return it
  //     const user = await Contact.findById(id);
  
  //     if (!user) {
  //       return res.status(404).send({ success: false, message: "User not found" });
  //     }
  
  //     res.status(200).send({ success: true, user });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({ success: false, message: "Error in fetching user", error });
  //   }
  // };