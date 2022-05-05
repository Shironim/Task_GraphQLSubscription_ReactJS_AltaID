import React from 'react'
import { useLocation } from 'react-router-dom';

import ListPassenger from '../../component/ListPassenger';
const Detail = () => {
  const location = useLocation();

  // console.log(location)
  return (
    <div>
      <h1>Get List By ID</h1>
      <ListPassenger
        // panjang poll bestie
        state={location.state.data.task_grapql_pengunjung} />
    </div>
  )
}

export default Detail;
