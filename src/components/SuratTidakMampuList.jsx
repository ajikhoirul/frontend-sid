import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import "./Table.css";
import ModalHapus from "./ModalHapus";
import { Alert } from "react-bootstrap";
import { Switch } from "antd";

const SuratTidakMampuList = () => {
  const [suratdk, setSuratTdk] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getSuratTdk();
  }, [page, keyword]);

  const getSuratTdk = async () => {
    const response = await axios.get(
      `http://13.229.115.11:5000/surat-tidak-mampu?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setSuratTdk(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const deleteSuratTdk = async (suratdkId) => {
    await axios.delete(
      `http://13.229.115.11:5000/surat-tidak-mampu/${suratdkId}`
    );
    setShowAlert(true);
    getSuratTdk();
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

  const aktfiSuratTdk = async (suratdkId) => {
    try {
      await axios.patch(
        `http://13.229.115.11:5000/surat-tidak-mampu-aktif/${suratdkId}`
      );
      getSuratTdk();
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
                <h1 className="m-0">Permohonan Surat Tidak Mampu</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to={"/dashboard"}>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Surat Tidak Mampu</li>
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
                    <h3 className="card-title">Daftar Surat Tidak Mampu</h3>
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
                    <form
                      className="form-inline float-right"
                      onSubmit={searchData}>
                      <div className="form-group mx-sm-3 mb-2 cari">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Cari Surat Tidak Mampu..."
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
                            <th scope="col">Pemohon</th>
                            <th scope="col">Bapak</th>
                            <th scope="col">Ibu</th>
                            <th className="col-lg-2" scope="col">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {suratdk.map((suratdk, index) => (
                            <tr key={suratdk.id_surat_tidak_mampu}>
                              <td>{index + 1}</td>
                              <td>{suratdk.pemohon}</td>
                              <td>{suratdk.n_bapak}</td>
                              <td>{suratdk.n_ibu}</td>
                              <td>
                                <Link
                                  to={`/surat-tidak-mampu/${suratdk.id_surat_tidak_mampu}`}
                                  className="btn btn-sm btn-success mr-2">
                                  <i class="far fa-eye"></i>
                                </Link>
                                <ModalHapus
                                  onConfirm={() =>
                                    deleteSuratTdk(suratdk.id_surat_tidak_mampu)
                                  }
                                />
                                <Switch
                                  checked={suratdk.aktif === 1 ? true : false}
                                  onClick={() =>
                                    aktfiSuratTdk(suratdk.id_surat_tidak_mampu)
                                  }
                                  className="ml-2"
                                />
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

export default SuratTidakMampuList;
