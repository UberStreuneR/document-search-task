import React, { useEffect, useState, useRef } from "react";
import { Container, Box } from "@mui/material";
import Form from "./components/Form";
import Files from "./components/Files";
import {
  useGetDocumentsQuery,
  selectGetDocumentsResultData,
} from "./redux/apiSlice";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { Document } from "./redux/apiSlice";

export interface filteringFields {
  id?: number;
  name?: string;
  before?: string;
  after?: string;
  sortBy: string;
  ascending: boolean;
}

function compareByDate(a: Document, b: Document) {
  if (Date.parse(a.date) < Date.parse(b.date)) {
    return -1;
  }
  if (Date.parse(a.date) > Date.parse(b.date)) {
    return 1;
  }
  return 0;
}

function compareByName(a: Document, b: Document) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
function compareById(a: Document, b: Document) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

export default function App() {
  const [result, setResult] = useState<Document[]>([]);
  const [filter, setFilter] = useState<filteringFields>({
    sortBy: "Создан",
    ascending: true,
  });
  useGetDocumentsQuery();
  let data = useSelector((state: RootState) =>
    selectGetDocumentsResultData(state)
  );

  useEffect(() => {
    if (data) {
      if (filter) {
        if (filter.id > 0) {
          let newArr = [...data];
          setResult([newArr.find(item => item.id == filter.id)]);
        } else {
          if (filter.id == -1) {
            setResult([]);
            return;
          }
          let dataToShow = [...data];
          if (filter.name) {
            dataToShow = dataToShow.filter(item =>
              item.name.includes(filter.name)
            );
          }
          if (filter.before) {
            dataToShow = dataToShow.filter(
              item => Date.parse(filter.before) >= Date.parse(item.date)
            );
          }
          if (filter.after) {
            dataToShow = dataToShow.filter(
              item => Date.parse(filter.after) <= Date.parse(item.date)
            );
          }
          if (filter.sortBy == "Создан") {
            dataToShow = dataToShow.sort(compareByDate);
          } else if (filter.sortBy == "Id") {
            dataToShow = dataToShow.sort(compareById);
          } else {
            dataToShow = dataToShow.sort(compareByName);
          }
          if (filter.ascending) {
            dataToShow = dataToShow.reverse();
          }
          setResult(dataToShow);
        }
      } else {
        setResult(data);
      }
    }
  }, [filter, data]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container sx={{ display: "flex" }}>
        <Form filter={filter} setFilter={setFilter} />
        {result ? <Files documents={result} /> : null}
      </Container>
    </Box>
  );
}
