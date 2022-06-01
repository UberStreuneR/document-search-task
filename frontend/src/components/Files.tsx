import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Document } from "../redux/apiSlice";

interface AccordionProps {
  documents: any;
}

const DocumentAccordion: React.FC<AccordionProps> = props => {
  return (
    <div>
      <Typography variant="h6">Документы</Typography>
      {props.documents[0]
        ? props.documents.map((doc: Document) => (
            <Accordion key={doc.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>
                  {doc.name}, id: {doc.id}, date: {doc.date}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{doc.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        : null}
    </div>
  );
};

export default DocumentAccordion;
