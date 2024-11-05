import { useEffect, useState } from "react";

import axios from "../api/axios";

export const useFetch = (url) => {
    let [data, setData] = useState();
  const [isLoading, setLoading] = useState(false); // loading state

  useEffect(() =>{
    fetch(url)
       // this is the first argument
    .then((response) =>{
      setLoading(true)
      return response.json()
    })
    .then((json) =>{
      setLoading(false);
      setData(json);
    })
    .catch(err => {
      setLoading(true);
      console.log(err) // catch errors
    });
  }, [url]);


  return {
    data,
    isLoading
  };
}
