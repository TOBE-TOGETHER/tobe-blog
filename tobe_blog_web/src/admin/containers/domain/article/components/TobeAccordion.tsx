import { Accordion, AccordionDetails } from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";

export const TobeAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowRightIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(248, 248, 248, .05)" : "#fff",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1) + "!important",
  },
}));

export const TobeAccordion = Accordion;

export const TobeAccordionDetails = AccordionDetails;
