import { useState, useEffect } from 'react';
import { userStore } from '../store/userStore';
import toast from 'react-hot-toast';
import { apointmentStore } from '../store/apointmentStore';

export default function ProfessorDashboard() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const user = userStore(state => state.user);
  const { 
    createAvailability, 
    getAllAppointment, 
    cancelAppointment,
    apointment
  } = apointmentStore();

  useEffect(() => {
    getAllAppointment();
  }, []);

  const handleCreateAvailability = async (e) => {
    e.preventDefault();
    try {
      await createAvailability(startTime, endTime);
      toast.success('Availability created successfully!');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create availability');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  console.log("appointment data from professor dashboard: ", apointment); 

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Create Availability</h2>
        <form onSubmit={handleCreateAvailability} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="datetime-local"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="datetime-local"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            Create Availability
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <div className="space-y-4">
  {Array.isArray(apointment) && apointment.length > 0 ? (
    apointment.map((appointment) => (
      <div 
        key={appointment._id} 
        className="flex justify-between items-center p-4 border rounded-lg"
      >
        <div>
          <p className="font-medium">
            Student: {appointment.studentId.name}
          </p>
          <p className="text-sm text-gray-500">
            Time: {new Date(appointment.availabilityId.startTime).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Status: {appointment.status}
          </p>
        </div>
        {appointment.status === 'scheduled' && (
          <button
            onClick={() => handleCancelAppointment(appointment._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Cancel Appointment
          </button>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500">No appointments available</p>
  )}
</div>

      </div>
    </div>
  );
}