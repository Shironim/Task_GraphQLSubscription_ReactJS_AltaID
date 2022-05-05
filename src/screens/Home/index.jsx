// Component
import PassengerInput from '../../component/PassengerInput';
import ListPassenger from '../../component/ListPassenger';
import Header from '../../component/Header';
import Loading from "../../component/Loading";
// Apollo Client
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
// Query
import { GET_PENGUNJUNG_SUBSCRIPTION, GET_PENGUNJUNG_BY_ID, DELETE_PENGUNJUNG_BY_ID, INSERT_PENGUNJUNG } from '../../GrapQL/Pengunjung/queries';
// Router
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    // const { data, loading, error, refetch } = useQuery(GET_PENGUNJUNG);
    const { data, loading, error } = useSubscription(GET_PENGUNJUNG_SUBSCRIPTION);

    const [getDataById, { loading: loadingID }] = useLazyQuery(GET_PENGUNJUNG_BY_ID, {
        onCompleted: (data) => {
            navigate("/detail", { state: { data } });
        },
        onError: (error) => {
            console.log('Terjadi error di getDataByID lazyQuery', { error });
        }
    });
    const [getDataUpdate, { loading: loadingIdUpdate }] = useLazyQuery(GET_PENGUNJUNG_BY_ID, {
        onCompleted: (data) => {
            navigate("/edit", { state: { data } });

        },
        onError: (error) => {
            console.log('Terjadi error di getDataUpdate lazyQuery', { error });
        }
    });

    const [deletePengunjung, { loading: loadingDelete }] = useMutation(DELETE_PENGUNJUNG_BY_ID, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            console.log('Terjadi error di mutasi delete', { error });
        }
    });
    const [insertPengunjung, { loading: loadingInsert }] = useMutation(INSERT_PENGUNJUNG, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            console.log('Terjadi error di mutasi insert', { error });
        }
    });


    if (error) {
        console.log(error);
    }

    const viewPengunjung = (id) => {
        getDataById({
            variables: {
                id: id
            }
        });

    }
    const hapusPengunjung = (id) => {
        deletePengunjung({
            variables: {
                id: id
            }
        })
    }
    const tambahPengunjung = (state) => {
        insertPengunjung({
            variables: {
                jenis_kelamin: state.jenisKelamin,
                nama: state.nama,
                umur: state.umur,
            }
        })
    }
    const getDataByIDPengunjung = (id) => {
        getDataUpdate({
            variables: {
                id: id
            }
        });
    }

    return (
        loading || loadingID || loadingDelete || loadingInsert || loadingIdUpdate && data ? <Loading /> :
            <div>
                <Header />
                <ListPassenger
                    state={data.task_grapql_pengunjung}
                    viewPengunjung={viewPengunjung}
                    hapusPengunjung={hapusPengunjung}
                    getDataByIDPengunjung={getDataByIDPengunjung}
                />
                <PassengerInput
                    tambahPengunjung={tambahPengunjung}
                />
            </div>
    )
}

export default Home;