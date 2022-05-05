import { gql } from '@apollo/client';

// Subscription
export const GET_PENGUNJUNG_SUBSCRIPTION = gql`
subscription pengunjung {
  task_grapql_pengunjung {
    id
    jenis_kelamin
    nama
    umur
  }
}

`;

// Query
export const GET_PENGUNJUNG = gql`
query pengunjung {
  task_grapql_pengunjung {
    id
    jenis_kelamin
    nama
    umur
  }
}
`;

export const GET_PENGUNJUNG_BY_ID = gql`
query pengunjung($id: Int) {
  task_grapql_pengunjung(where: {id: {_eq: $id}}) {
    id
    jenis_kelamin
    nama
    umur
  }
}
`;

export const DELETE_PENGUNJUNG_BY_ID = gql`
mutation Pengunjung($id: Int) {
  delete_task_grapql_pengunjung(where: {id: {_eq: $id}}) {
    returning {
      id
      jenis_kelamin
      nama
      umur
    }
  }
}
`;

export const INSERT_PENGUNJUNG = gql`
mutation Pengunjung( 
  $jenis_kelamin: String, 
  $nama: String, 
  $umur: Int) {
  insert_task_grapql_pengunjung(
    objects: {
      jenis_kelamin: $jenis_kelamin, 
      nama: $nama, 
      umur: $umur}) {
    returning {
      id
      jenis_kelamin
      nama
      umur
    }
  }
}
`;

export const UPDATE_PENGUNJUNG_BY_ID = gql`
mutation Pengunjung(
  $id: Int,
  $jenis_kelamin: String, 
  $nama: String, 
  $umur: Int ) {
  update_task_grapql_pengunjung(
    where: {id: {_eq: $id}}, 
    _set: {
      jenis_kelamin: $jenis_kelamin, 
      nama: $nama, 
      umur: $umur}) {
    returning {
      jenis_kelamin
      nama
      umur
    }
  }
}
`;