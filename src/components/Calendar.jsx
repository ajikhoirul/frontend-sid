import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import AddEventModal from "./AddEventModal";
import axios from "axios";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };
  return (
    <section>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">
        Tambah Event
      </button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, bootstrapPlugin]}
        initialView="dayGridMonth"
        themeSystem="bootstrap"
        eventColor="#007bff"
      />
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
