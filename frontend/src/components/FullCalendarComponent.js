import React, { useState } from "react";
import moment from "moment";
import "../theme/css/custom_calendar.scss";

const FullCalendarComponent = ({events}) => {
    // State for the current date
    const [currentDate, setCurrentDate] = useState(moment());

    // Function to go to the previous month
    const goToPreviousMonth = () => {
        setCurrentDate(moment(currentDate).subtract(1, "month"));
    };

    // Function to go to the next month
    const goToNextMonth = () => {
        setCurrentDate(moment(currentDate).add(1, "month"));
    };

    // Function to render the calendar grid
    const renderCalendar = () => {
        const startOfMonth = moment(currentDate).startOf("month");
        const endOfMonth = moment(currentDate).endOf("month");
        const startDate = moment(startOfMonth).startOf("week");
        const endDate = moment(endOfMonth).endOf("week");

        const calendar = [];
        let currentDay = moment(startDate);

        while (currentDay.isSameOrBefore(endDate)) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                const day = moment(currentDay);
                const isCurrentMonth = day.isSame(currentDate, "month");
                const dayKey = day.format("YYYY-MM-DD");
                const dayEvents = events[dayKey] || [];

                week.push(
                    <td
                        key={day.format("YYYY-MM-DD")}
                        className={`day ${isCurrentMonth ? "" : "other-month"}`}
                    >
                        <div className="day-number">{day.format("D")}</div>
                        {dayEvents.map((event, index) => (
                            <div key={index} className="event">
                                <p>Time: {event.time}</p>
                                <p>Subject: {event.subject}</p>
                                <p>Instructor: {event.instructor}</p>
                            </div>
                        ))}
                    </td>
                );
                currentDay.add(1, "day");
            }
            calendar.push(<tr key={currentDay.format("YYYY-MM-DD")}>{week}</tr>);
        }

        return calendar;
    };

    return (
        <div className="calendar-container full_calender_container">
            <div className="calendar-header">
                <button onClick={goToPreviousMonth}>Previous</button>
                <h2>{currentDate.format("MMMM YYYY")}</h2>
                <button onClick={goToNextMonth}>Next</button>
            </div>
            <div className="calendar-inner-scroll">
            <table className="calendar">
                <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
            </table>
            </div>
        </div>
    );
};

export default FullCalendarComponent;