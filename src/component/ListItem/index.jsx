import style from './style.module.css'
import { Link } from 'react-router-dom';
const ListItem = (props) => {
    const { id, nama, umur, jenis_kelamin } = props.data;
    // console.log("ini dari listItem", props);
    const handleUpdate = (id) => {
        props.getDataByIDPengunjung(id)
    }
    return (
        <tr>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenis_kelamin}</td>
            {
                props.viewPengunjung
                    ?
                    <>
                        <td onClick={() => props.viewPengunjung(id)}>
                            <button className={style.btnView}>View</button>
                        </td>
                        <td onClick={() => handleUpdate(id)}>
                            <button className={style.btnUpdate}>Update</button>
                        </td>
                        <td onClick={() => props.hapusPengunjung(id)}>
                            <button className={style.btnDelete}>Delete</button>
                        </td>
                    </>
                    :
                    <>
                        <td> <Link to="/">Back to Home</Link> </td>
                    </>
            }

        </tr >
    )
}

export default ListItem;