import * as React from 'react';
import { BuildingsInterface } from '../models/IBuilding';



export function ListBuildings(){
    const [items, setItems] = React.useState<BuildingsInterface[]>([]);
    const getItems = async () => {
    const apiUrl = "http://localhost:8080/buildings";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setItems(res.data);
        }
      });
    };
    React.useEffect(() => { getItems(); }, []); 
    return items;
}

export function GetBuilding(id: string){
    const [items, setItems] = React.useState<BuildingsInterface[]>([]);
    const getUsers = async () => {
    const apiUrl = "http://localhost:8080/building/"+id;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setItems(res.data);
        }
      });
    };
    React.useEffect(() => {   getUsers(); }, []); 
    return items;
}