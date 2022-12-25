import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, memo, useState, useLayoutEffect } from "react";

import "./AutoCompleBox.scss";
import axios from "axios";
import API_PATHS from "configs/api";

interface IProps {
  searchWith: { name: string; value: string } | undefined;
}

const AutoCompleBox = ({
  searchWith = { name: "", value: "name" },
}: IProps) => {
  const [productSort, setProductSort] = useState([]);
  const getAllProductName = async () => {
    const res: any = await axios.get(API_PATHS.getProductSort);
    setProductSort(res.data);
  };
  useEffect(() => {
    getAllProductName();
  }, []);
  // convert Set and check undefined
  const setArr: Set<string | number[]> = new Set(
    productSort.map((item: any) => item[searchWith?.value])
  );
  const optionList = setArr.size > 1 ? [...setArr] : ["đéo có gì !!"];
  return (
    <Autocomplete
      className="salesman-header-search-auto"
      freeSolo
      disablePortal
      id="combo-box-demo"
      options={optionList.map((item: any) => item)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
export default memo(AutoCompleBox);
