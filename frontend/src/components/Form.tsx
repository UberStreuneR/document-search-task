import React, { useState, FC } from "react";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { filteringFields } from "../App";

interface formProps {
  filter: filteringFields;

  setFilter: React.Dispatch<React.SetStateAction<filteringFields>>;
}

const Form: FC<formProps> = ({ filter, setFilter }) => {
  const [sort, setSort] = useState<string>("Создан");
  const [by, setBy] = useState<string>("По убыванию");
  const [id, setId] = useState<number>();
  const [after, setAfter] = useState<string>();
  const [before, setBefore] = useState<string>();
  const [name, setName] = useState<string>();
  const handleChangeId = (e: any): void => {
    setId(e.target.value);
    if (e.target.value == "") {
      setFilter({ ...filter, id: 0 });
      return;
    }
    if (isNaN(parseInt(e.target.value))) {
      setFilter({ ...filter, id: -1 });
    } else {
      setFilter({ ...filter, id: parseInt(e.target.value) });
    }
  };

  const handleChangeSort = (e: any): void => {
    setSort(e.target.value);
    setFilter({ ...filter, sortBy: e.target.value });
  };
  const handleChangeBy = (e: any): void => {
    setBy(e.target.value);
    setFilter({ ...filter, ascending: by === "По возрастанию" });
  };
  const handleChangeBefore = (e: any): void => {
    setBefore(e.target.value);
    setFilter({ ...filter, before: e.target.value });
  };
  const handleChangeAfter = (e: any): void => {
    setAfter(e.target.value);
    setFilter({ ...filter, after: e.target.value });
  };
  const handleChangeName = (e: any): void => {
    setName(e.target.value);
    setFilter({ ...filter, name: e.target.value });
  };
  return (
    <Box sx={{ mr: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">ID документа</Typography>
        <TextField
          variant="outlined"
          size="small"
          helperText="Если заполнено поле ID документа, все остальные поля будут проигнорированы"
          onChange={handleChangeId}
        />
        <Typography variant="h6">Создан</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            variant="outlined"
            placeholder="От YYYY-MM-DD"
            size="small"
            onChange={handleChangeAfter}
            sx={{ mr: 2 }}
          />
          <TextField
            variant="outlined"
            placeholder="До YYYY-MM-DD"
            onChange={handleChangeBefore}
            size="small"
          />
        </Box>
        <Typography variant="h6">Название документа</Typography>
        <TextField
          variant="outlined"
          size="small"
          onChange={handleChangeName}
          sx={{ flexGrow: 1 }}
        />
        <Typography variant="h6">Сортировка</Typography>
        <Box sx={{ display: "flex" }}>
          <Select
            value={sort}
            label="Сортировка"
            onChange={handleChangeSort}
            sx={{ mr: 2, flexGrow: 1 }}>
            <MenuItem value={"Создан"}>Создан</MenuItem>
            <MenuItem value={"Название"}>Название</MenuItem>
            <MenuItem value={"Id"}>Id</MenuItem>
          </Select>
          <Select value={by} onChange={handleChangeBy} sx={{ flexGrow: 1 }}>
            <MenuItem value={"По убыванию"}>По убыванию</MenuItem>
            <MenuItem value={"По возрастанию"}>По возрастанию</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
