import style from "./style.module.css"
import React, { useState } from 'react'
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Component Loading
import Loading from "../../component/Loading";
// GrapQL
import { UPDATE_PENGUNJUNG_BY_ID } from '../../GrapQL/Pengunjung/queries';
import { useMutation } from '@apollo/client';

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id, nama, jenis_kelamin, umur } = location.state.data.task_grapql_pengunjung[0];

  const [state, setState] = useState({
    nama: nama,
    umur: umur,
    jenisKelamin: jenis_kelamin,
  });

  // mutasi perbarui data
  const [perbaruiPengunjung, { loading }] = useMutation(UPDATE_PENGUNJUNG_BY_ID, {
    onCompleted: (data) => {
      // jika sudah ada, kirim ke halaman awal
      navigate("/Task_GraphQLSubscription_ReactJS_AltaID/");
    },
    onError: (error) => {
      console.log('Terjadi error di mutasi update', { error });
    }
  });

  const handleSubmit = () => {
    if (state.nama.trim() && state.umur && state.jenisKelamin) {
      const umur = state.umur
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai")
      } else {
        updatePengunjung(state)
        setState({
          ...state,
          nama: "",
          umur: "",
          jenisKelamin: "Pria",
        })
      }
    } else {
      alert("Data masih ada yang kosong")
    }
  };

  const updatePengunjung = (state) => {
    perbaruiPengunjung({
      variables: {
        id: id,
        nama: state.nama,
        umur: state.umur,
        jenis_kelamin: state.jenisKelamin,
      }
    })
  }

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  // console.log('ini state', state);
  return (
    loading ? <Loading /> :
      <div onSubmit={handleSubmit}>
        <h1 style={{ margin: "24px 0" }}>Update Data Pengunjung</h1>
        <div className={style.form}>
          <p>Masukkan Nama Anda</p>
          <input type="text" className="input-text" placeholder="Nama anda ..." value={state.nama} name="nama" onChange={onChange} />
        </div>
        <div className={style.form}>
          <p>Masukkan Umur Anda</p>
          <input type="number" className="input-text" placeholder="Umur anda ..." value={state.umur} name="umur" onChange={onChange} />
        </div>
        <div className={style.form}>
          <p>Masukkan Jenis Kelamin Anda</p>
          <select value={state.jenisKelamin} onChange={onChange} name="jenisKelamin">
            {
              state.jenisKelamin === "Pria" ?
                <>
                  <option value="Pria"> Pria</option>
                  <option value="Wanita">Wanita</option>
                </>
                :
                <>
                  <option value="Wanita">Wanita</option>
                  <option value="Pria"> Pria</option>
                </>
            }
          </select>
        </div>
        <div className={style.form}>
          <button style={{ backgroundColor: "#568d66" }} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  )
}

export default Edit;