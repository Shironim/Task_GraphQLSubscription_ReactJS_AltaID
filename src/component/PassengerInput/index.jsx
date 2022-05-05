import { useState } from "react"
import style from './style.module.css';

const PassengerInput = (props) => {

  // State Input
  const [state, setState] = useState({
    nama: "",
    umur: "",
    jenisKelamin: "Pria",
    editing: true,
  })
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    if (state.nama.trim() && state.umur && state.jenisKelamin) {
      const umur = state.umur
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai")
      } else {
        const newData = {
          nama: state.nama,
          umur: state.umur,
          jenisKelamin: state.jenisKelamin,
        }
        props.tambahPengunjung(newData)
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
  }

  const handleBukaInput = () => {
    setState({
      ...state,
      editing: false,
    })
  }

  const handleTutupInput = () => {
    setState({
      ...state,
      editing: true,
    })
  }
  let viewMode = {}
  let editMode = {}

  if (state.editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  return (
    <div>
      <div onSubmit={handleSubmit} style={viewMode}>
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
            <option value="Pria"> Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
        </div>
        <div className={style.form}>
          <button style={{ backgroundColor: "#568d66" }} onClick={handleSubmit}>Submit</button>
          <button onClick={handleTutupInput} style={{ marginLeft: "10px", backgroundColor: "#ff8c42" }}>
            Selesai
          </button>
        </div>
      </div>
      <button className={style.inputan} onClick={handleBukaInput} style={editMode}>
        Masukkan Data Pengunjung
      </button>
    </div>
  )
}

export default PassengerInput
