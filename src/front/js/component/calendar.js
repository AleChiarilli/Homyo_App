import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachWeekOfInterval, isSameMonth, startOfWeek, endOfWeek, eachDayOfInterval, getDay } from "date-fns";
import { es } from "date-fns/locale"; // Importar la configuración local en español

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reservations, setReservations] = useState([]);

  const months = [
    { value: 0, label: "Enero" },
    { value: 1, label: "Febrero" },
    { value: 2, label: "Marzo" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Mayo" },
    { value: 5, label: "Junio" },
    { value: 6, label: "Julio" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Septiembre" },
    { value: 9, label: "Octubre" },
    { value: 10, label: "Noviembre" },
    { value: 11, label: "Diciembre" },
  ];

  const previousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const weeksOfMonth = eachWeekOfInterval(
    {
      start: startOfCurrentMonth,
      end: endOfCurrentMonth,
    },
    { weekStartsOn: 0 } // Comenzar la semana en domingo
  );

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]; // Domingo como primer día

  const addReservation = () => {
    const newReservation = {
      day: selectedDay,
      month: selectedMonth,
      startTime: startTime,
      endTime: endTime,
    };
    setReservations([...reservations, newReservation]);
    setShowModal(false);
    setSelectedDay(1);
    setSelectedMonth(0);
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="flex flex-col w-full pl-0 md:space-y-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-3">
          <div className=" sm:w-4/5 shadow-lg">
            <div className="p-5 dark:bg-gray-800 bg-white rounded-t">
              <div className="px-4 flex items-center justify-between">
                <h1 className="text-xl font-bold dark:text-gray-100 text-gray-800">
                  {format(currentDate, "MMMM yyyy", { locale: es })} {/* Usar configuración local en español */}
                </h1>
                <div className="flex items-center text-gray-800 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={previousMonth}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler ml-3 icon-tabler-chevron-right"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={nextMonth}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between pt-12">
                <table className="w-full">
                  <thead>
                    <tr>
                      {weekDays.map((weekDay) => (
                        <th key={weekDay}>
                          <div className="w-full flex justify-center">
                            <p className="text-2xl font-medium text-center text-gray-800 dark:text-gray-100">
                              {weekDay}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeksOfMonth.map((week) => (
                      <tr key={week.toISOString()}>
                        {eachDayOfInterval({
                          start: startOfWeek(week),
                          end: endOfWeek(week),
                        }).map((day) => (
                          <td
                            key={day.toISOString()}
                            onClick={() => {
                              setShowModal(true);
                              setSelectedDay(day.getDate());
                              setSelectedMonth(day.getMonth());
                            }}
                          >
                            <div
                              className={`px-4 py-4 cursor-pointer flex w-full justify-center ${
                                isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-200"
                              }`}
                            >
                              <p className={`text-2xl ${isSameMonth(day, currentDate) ? "text-gray-800" : "text-gray-500"
                                } dark:text-gray-100`}>
                                {format(day, "d")}
                              </p>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
              <div className="px-4">
                {reservations.length > 0 ? (
                  reservations.map((reservation, index) => (
                    <div
                      key={index}
                      className="border-b pb-4 border-gray-400 border-dashed"
                    >
                      <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">
                        {reservation.startTime}
                      </p>
                      <p className="text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 pt-2">
                        Reserva
                      </p>
                      <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">
                        {format(new Date(currentDate.getFullYear(), reservation.month, reservation.day), "dd MMMM yyyy", { locale: es })}
                        {" "}
                        de {reservation.startTime} a {reservation.endTime}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-medium text-gray-600">No hay reservas.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Añadir Reserva
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-900 opacity-50" />
          <div className="bg-white w-1/2 p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Añadir Reserva</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fecha:</label>
              <div className="flex items-center">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="mr-2 block w-1/2 mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="block w-1/2 mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {[...Array(31)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hora de inicio:</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {[...Array(24)].map((_, index) => (
                  <option key={index} value={index.toString().padStart(2, "0")}>
                    {index.toString().padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hora de fin:</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {[...Array(24)].map((_, index) => (
                  <option key={index} value={index.toString().padStart(2, "0")}>
                    {index.toString().padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={addReservation}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Añadir Reserva
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-3"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
