import React, { useEffect, useState } from 'react';
import { apointmentStore } from '../store/apointmentStore';

const StudentDashboard = ({ professorId }) => {
  const {
    availableSlotes,
    loading,
    apointment,
    getAvailableSlotes,
    createAppointment,
    getAllAppointment
  } = apointmentStore();

  useEffect(() => {
    const getData = async () => {
      await getAvailableSlotes();
      await getAllAppointment();
    };
    getData();
  }, [professorId]);

  const handleBookAppointment = async (availabilityId) => {
    console.log("availability ki id : ", availabilityId);
    try {
      await createAppointment(availabilityId, professorId);
      await getAvailableSlotes(professorId);
      await getAllAppointment();
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-20 text-lg font-semibold text-gray-600">no available slotes</div>;
  }

  return (
    <div className="p-6 space-y-12 bg-gray-100">
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Available Slots</h2>
        {availableSlotes && availableSlotes.length === 0 ? (
          <p className="text-gray-500">No available slots found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(availableSlotes) && availableSlotes.map((slot) => (
              <div
                key={slot._id}
                className="p-6 bg-white border rounded-lg shadow hover:shadow-lg"
              >
                <p className="font-medium text-gray-800">Start: {formatDateTime(slot.startTime)}</p>
                <p className="font-medium text-gray-800">End: {formatDateTime(slot.endTime)}</p>
                <p className="font-medium text-gray-800">{slot.professorId.name}</p>
                <button
                  className="w-full px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={() => handleBookAppointment(slot._id)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Your Appointments</h2>
        {apointment.length === 0 ? (
          <p className="text-gray-500">No appointments found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {apointment.map((apt) => (
              <div
                key={apt._id}
                className="p-6 bg-white border rounded-lg shadow hover:shadow-lg"
              >
                <p className="font-medium text-gray-800">Status: {apt.status}</p>
                <p className="font-medium text-gray-800">
                  Date: {formatDateTime(apt.availabilityId.startTime)}
                </p>
                <p className="text-sm text-gray-500">Professor: {apt.professorId.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
