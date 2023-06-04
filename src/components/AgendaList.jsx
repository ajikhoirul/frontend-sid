import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import "./Table.css";
import ModalHapus from "./ModalHapus";
import { Alert } from "react-bootstrap";
import { Switch } from "antd";
import { useSelector } from "react-redux";

const AgendaList = () => {
  const [agenda, setAgenda] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getAgenda();
  }, [page, keyword]);

  const getAgenda = async () => {
    const response = await axios.get(
      `http://localhost:5000/agenda?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setAgenda(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const deleteAgenda = async (agendaId) => {
    await axios.delete(`http://localhost:5000/agenda/${agendaId}`);
    setShowAlert(true);
    getAgenda();
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang anda cari, silahkan menggunakan fitur pencarian!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const aktifAgenda = async (agendaId) => {
    try {
      await axios.patch(`http://localhost:5000/agenda-aktif/${agendaId}`);
      getAgenda();
    } catch (error) {
      console.log(error);
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
                <h1 className="m-0">Agenda Desa</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Agenda</li>
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
              <div className="col-12">
                {/* /.card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Daftar Agenda Desa</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    {showAlert && (
                      <Alert
                        variant="success"
                        className="d-flex justify-content-between">
                        <span>Data berhasil dihapus!</span>
                      </Alert>
                    )}
                    <NavLink
                      to={"/agenda/add"}
                      className="btn btn-success tambah">
                      Tambah
                    </NavLink>
                    <form
                      className="form-inline float-right"
                      onSubmit={searchData}>
                      <div className="form-group mx-sm-3 mb-2 cari">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Cari Agenda..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mb-2">
                        <i className="fa-solid fa-magnifying-glass" />
                      </button>
                    </form>

                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead className="thead-dark">
                          <tr>
                            <th style={{ width: "30px" }} scope="col">
                              No
                            </th>
                            <th scope="col">Agenda</th>
                            <th className="d-none d-md-table-cell" scope="col">
                              Waktu
                            </th>
                            <th scope="col">Lokasi</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {agenda.map((agenda, index) => (
                            <tr key={agenda.id_agenda}>
                              <td>{index + 1}</td>
                              <td>{agenda.judul}</td>
                              <td className="d-none d-md-table-cell">
                                {agenda.waktu}
                              </td>
                              <td>{agenda.lokasi}</td>
                              <td>
                                <Link
                                  to={`/agenda/edit/${agenda.id_agenda}`}
                                  className="btn btn-sm btn-primary mr-1">
                                  <i className="fa-solid fa-pen-to-square" />
                                </Link>
                                <ModalHapus
                                  nama={agenda.judul}
                                  onConfirm={() =>
                                    deleteAgenda(agenda.id_agenda)
                                  }
                                />
                                {user && user.role === "admin" && (
                                  <Switch
                                    checked={agenda.aktif === 1 ? true : false}
                                    onClick={() =>
                                      aktifAgenda(agenda.id_agenda)
                                    }
                                    className="float-right"
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p>
                        Total Rows: {rows} Page: {rows ? page + 1 : 0} of{" "}
                        {pages}
                      </p>
                      <p className="text-center text-danger">{msg}</p>
                      <nav
                        className="pagination float-right"
                        key={rows}
                        role="navigation"
                        aria-label="pagination">
                        <ReactPaginate
                          previousLabel={
                            <i className="fas fa-chevron-left"></i>
                          }
                          nextLabel={<i className="fas fa-chevron-right"></i>}
                          pageCount={Math.min(5, pages)}
                          onPageChange={changePage}
                          containerClassName={"paginationBtn"}
                          pageLinkClassName={"page-link"}
                          previousLinkClassName={"page-link"}
                          nextLinkClassName={"page-link"}
                          activeClassName={"paginationActive"}
                          disabledLinkClassName={"disabled"}
                        />
                      </nav>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
            {/* /.row */}
            {/* Main row */}
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

export default AgendaList;
