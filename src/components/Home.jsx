import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import axios from "axios";
import "./style.css";

const Home = () => {
  const [countwarga, setCountWarga] = useState([]);
  const [countfasilitas, setCountFasilitas] = useState([]);
  const [countartikel, setCountArtikel] = useState([]);
  const [countagenda, setCountAgenda] = useState([]);
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [msg, setMsg] = useState("");
  const [berhasil, setBerhasil] = useState("");

  useEffect(() => {
    getCountWarga();
    getCountFasilitas();
    getCountArtikel();
    getCountAgenda();
    getEvent();
  }, []);

  const getEvent = async () => {
    await axios
      .get("http://localhost:5000/event")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountWarga = async () => {
    const response = await axios.get("http://localhost:5000/countwarga");
    setCountWarga(response.data);
  };
  const getCountFasilitas = async () => {
    const response = await axios.get("http://localhost:5000/countfasilitas");
    setCountFasilitas(response.data);
  };
  const getCountArtikel = async () => {
    const response = await axios.get("http://localhost:5000/countartikel");
    setCountArtikel(response.data);
  };
  const getCountAgenda = async () => {
    const response = await axios.get("http://localhost:5000/countagenda");
    setCountAgenda(response.data);
  };

  // const handleDateClick = (arg) => {
  //   const title = prompt("Enter a title for your event");
  //   if (title) {
  //     const newEvent = { title, start: arg.date };
  //     axios
  //       .post("http://localhost:5000/event", newEvent)
  //       .then((response) => {
  //         setEvents([...events, response.data]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const handleDateSelect = async (arg) => {
    const title = prompt("Enter a title for your event");
    if (title) {
      const start = arg.startStr;
      const end = arg.endStr;
      const newEvent = { title, start, end };
      await axios
        .post("http://localhost:5000/event", newEvent)
        .then((response) => {
          setEvents([...events, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEventClick = (arg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${arg.event.title}'`
      )
    ) {
      axios
        .delete(`http://localhost:5000/event/${arg.event.id}`)
        .then(() => {
          setEvents(events.filter((event) => event.id !== arg.event.id));
          getEvent();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/event", {
        title: title,
        start: start,
        end: end,
      });
      setBerhasil("Event berhasil ditambahkan!");
      setTitle("");
      setStart("");
      setEnd("");
      setMsg("");
      getEvent();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{countwarga}</h3>
                    <p>Warga Desa</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-stalker" />
                  </div>
                  <Link to={"/warga"} className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{countfasilitas}</h3>
                    <p>Fasilitas Desa</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-social-windows" />
                  </div>
                  <Link to={"/fasilitas"} className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{countartikel}</h3>
                    <p>Artikel</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-document-text" />
                  </div>
                  <Link to={"/artikel"} className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{countagenda}</h3>
                    <p>Agenda Desa</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-calendar" />
                  </div>
                  <Link to={"/agenda"} className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row">
              {/* Left col */}
              <div className="col-lg-4">
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Form Tambah Event</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={saveEvent} className="form-horizontal">
                    <div className="card-body">
                      {msg && (
                        <div className="alert alert-danger mt-2" role="alert">
                          <ul className="list-unstyled mb-0">
                            <li>{msg}</li>
                          </ul>
                        </div>
                      )}
                      {berhasil && (
                        <div className="alert alert-success mt-2" role="alert">
                          <ul className="list-unstyled mb-0">
                            <li>{berhasil}</li>
                          </ul>
                        </div>
                      )}
                      <p>
                        <strong>Note :</strong> Jika menggunakan{" "}
                        <strong>Form Tambah Event</strong>, tolong tambahkan 1
                        hari di form <strong>Event Selesai</strong>. Contoh :
                        <strong> 27</strong>/05/2023 menjadi <strong>28</strong>
                        /05/2023
                      </p>
                      <div className="form-group">
                        <label>Nama Event</label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama Event"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Event Mulai</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="DD/MM/YYYY"
                          value={start}
                          onChange={(e) => setStart(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Event Selesai</label>

                        <input
                          type="date"
                          className="form-control"
                          placeholder="DD/MM/YYYY"
                          value={end}
                          onChange={(e) => setEnd(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-info float-right">
                        Tambah
                      </button>
                    </div>
                    {/* /.card-footer */}
                  </form>
                </div>
              </div>
              <div className="col-lg-8">
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    bootstrapPlugin,
                  ]}
                  initialView="dayGridMonth"
                  displayEventEnd={true}
                  timeZone="Asia/Jakarta"
                  events={events}
                  // dateClick={handleDateClick}
                  eventClick={handleEventClick}
                  selectable={true}
                  select={handleDateSelect}
                  themeSystem="bootstrap"
                />
              </div>
              {/* right col */}
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
};

export default Home;
