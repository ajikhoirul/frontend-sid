import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

import Warga from "./pages/Warga";
import AddWarga from "./pages/AddWarga";
import EditWarga from "./pages/EditWarga";

import Artikel from "./pages/Artikel";
import AddArtikel from "./pages/AddArtikel";
import EditArtikel from "./pages/EditArtikel";

import Pengumuman from "./pages/Pengumuman";
import AddPengumuman from "./pages/AddPengumuman";
import EditPengumuman from "./pages/EditPengumuman";

import Fasilitas from "./pages/Fasilitas";
import AddFasilitas from "./pages/AddFasilitas";
import EditFasilitas from "./pages/EditFasilitas";

import Pertanyaan from "./pages/Pertanyaan";
import AddPertanyaan from "./pages/AddPertanyaan";
import EditPertanyaan from "./pages/EditPertanyaan";

import Agenda from "./pages/Agenda";
import AddAgenda from "./pages/AddAgenda";
import EditAgenda from "./pages/EditAgenda";

import Galeri from "./pages/Galeri";
import AddGaleri from "./pages/AddGaleri";
import EditGaleri from "./pages/EditGaleri";

import Files from "./pages/Files";
import AddFile from "./pages/AddFile";
import EditFile from "./pages/EditFile";

import Permohonan from "./pages/Permohonan";
import SuratTidakMampu from "./pages/SuratTidakMampu";
import SuratTidakMampuD from "./pages/SuratTidakMampuD.jsx";

import TentangDesa from "./pages/TentangDesa";
import EditTentangDesa from "./pages/EditTentangDesa";

import Video from "./pages/Video";
import EditVideo from "./pages/EditVideo";

import ProfilDesa from "./pages/ProfilDesa";
import EditProfilDesa from "./pages/EditProfilDesa";

import Struktur from "./pages/Struktur";
import EditStruktur from "./pages/EditStruktur";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />}></Route>
          <Route path="/users/edit/:id" element={<EditUser />}></Route>

          <Route path="/warga" element={<Warga />} />
          <Route path="/warga/add" element={<AddWarga />} />
          <Route path="/warga/edit/:id" element={<EditWarga />}></Route>

          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/add" element={<AddArtikel />} />
          <Route path="/artikel/edit/:id" element={<EditArtikel />} />

          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route path="/pengumuman/add" element={<AddPengumuman />} />
          <Route path="/pengumuman/edit/:id" element={<EditPengumuman />} />

          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/fasilitas/add" element={<AddFasilitas />} />
          <Route path="/fasilitas/edit/:id" element={<EditFasilitas />} />

          <Route path="/pertanyaan" element={<Pertanyaan />} />
          <Route path="/pertanyaan/add" element={<AddPertanyaan />} />
          <Route path="/pertanyaan/edit/:id" element={<EditPertanyaan />} />

          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/add" element={<AddAgenda />} />
          <Route path="/agenda/edit/:id" element={<EditAgenda />} />

          <Route path="/galeri" element={<Galeri />} />
          <Route path="/galeri/add" element={<AddGaleri />} />
          <Route path="/galeri/edit/:id" element={<EditGaleri />} />

          <Route path="/files" element={<Files />} />
          <Route path="/file/add" element={<AddFile />} />
          <Route path="/file/edit/:id" element={<EditFile />} />

          <Route path="/permohonan" element={<Permohonan />} />

          <Route path="/surat-tidak-mampu" element={<SuratTidakMampu />} />
          <Route path="/surat-tidak-mampu/:id" element={<SuratTidakMampuD />} />

          <Route path="/tentang-desa" element={<TentangDesa />} />
          <Route path="/tentang-desa/edit/:id" element={<EditTentangDesa />} />

          <Route path="/video" element={<Video />} />
          <Route path="/video/edit/:id" element={<EditVideo />} />

          <Route path="/profil-desa" element={<ProfilDesa />} />
          <Route path="/profil-desa/edit/:id" element={<EditProfilDesa />} />

          <Route path="/struktur-desa" element={<Struktur />} />
          <Route path="/struktur-desa/edit/:id" element={<EditStruktur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
