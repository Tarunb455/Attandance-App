import User from '../models/User.js';
import Attendance from '../models/attendanceModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';




export const userData = (req,res)=>{
  const user = req.user;
  // Fetch user data from the database using the user information
  res.status(200).json({
    name: user.name,
    email: user.email
  });
}

// Example controller function to handle user registration
export const registerUser = async (req, res) => {
  const { name,email, password } = req.body;


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create a new user instance
    const newUser = new User({name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Example improvement to handle errors more explicitly in userController.js

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
 // Password is valid, generate JWT token
 const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

 res.status(200).json({ message: 'Successfully logged in', token, user });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Function to mark attendance
export const markAttendance = async (req, res) => {
  try {
    // Get current date and time formatted as "YYYY-MM-DD hh:mm A"
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
    const markedTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    const markedDateTime = `${formattedDate} ${markedTime}`;

    const { userId, type } = req.body; // Assuming userId and type are passed in request body

    // Create a new attendance record
    const attendanceRecord = new Attendance({
      userId: userId,
      type: type,
      date: markedDateTime // Store the full date and time
    });

    // Save the attendance record
    await attendanceRecord.save();

    // Respond with success message including type, marked time, and full marked date/time
    const message = `${type} marked at ${markedTime}`;
    res.status(201).json({ message, markedDateTime });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};





// Example test API endpoint
export const testApi = async (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
};