import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String},
  date: { type: String}

});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
