import { useState } from "react";
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { RichContentEditor, MultipleTagSelecter } from "../../../components";
import { FieldWrapper } from "./FieldWrapper";
import { TagOption } from "../../../../../global/types";
import {
  TobeAccordion,
  TobeAccordionDetails,
  TobeAccordionSummary,
} from "./TobeAccordion";

export interface ArticleEditMainSectionProps {
  title: string;
  setTitle: (value: string) => void;
  subTitle: string;
  setSubTitle: (value: string) => void;
  contentProtected: boolean;
  setContentProtected: (value: boolean) => void;
  tagValues: TagOption[];
  setTagValues: (value: TagOption[]) => void;
  htmlValue: string;
  setHtmlValue: (value: string) => void;
  textValue: string;
  setTextValue: (value: string) => void;
  onClickPrimaryBtn: () => void;
}

export default function ArticleEditMainSection(
  props: ArticleEditMainSectionProps
) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Grid container sx={{ py: 2 }}>
      <Grid
        item
        xs={12}
        component={Paper}
        variant="outlined"
        sx={{ width: "100%", py: 2, px: 2 }}
      >
        <Grid container item xs={12}>
          <FieldWrapper
            label={t("article-creation-page.fields.title")}
            labelPosition="left"
            children={
              <TextField
                fullWidth
                variant="standard"
                value={props.title}
                onChange={(v) => props.setTitle(v.target.value)}
                error={props.title.length >= 128}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <TobeAccordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          variant="outlined"
        >
          <TobeAccordionSummary>
            <Typography
              color={"text.secondary"}
              variant={"body2"}
              sx={{ textAlign: "end", flexGrow: 0 }}
            >
              {t("article-creation-page.expand-label")}
            </Typography>
          </TobeAccordionSummary>
          <TobeAccordionDetails>
            <Grid container sx={{ py: 0 }}>
              <FieldWrapper
                label={t("article-creation-page.fields.sub-title")}
                labelPosition="left"
                children={
                  <TextField
                    fullWidth
                    variant="standard"
                    value={props.subTitle}
                    onChange={(v) => props.setSubTitle(v.target.value)}
                    error={props.subTitle.length >= 1000}
                  />
                }
              />
              <FieldWrapper
                label={t("article-creation-page.fields.tag")}
                labelPosition="left"
                children={
                  <MultipleTagSelecter
                    value={props.tagValues}
                    setValue={props.setTagValues}
                  />
                }
              />
              <FieldWrapper
                label={t("article-creation-page.fields.content-protected")}
                labelPosition="right"
                children={
                  <Checkbox
                    size="small"
                    checked={props.contentProtected}
                    onChange={(e) =>
                      props.setContentProtected(e.target.checked)
                    }
                  />
                }
              />
            </Grid>
          </TobeAccordionDetails>
        </TobeAccordion>
      </Grid>
      <Grid item xs={12} sx={{ my: 1 }}>
        <Grid
          container
          sx={{ px: 2, py: 1 }}
          component={Paper}
          variant="outlined"
        >
          <RichContentEditor
            htmlValue={props.htmlValue}
            textValue={props.textValue}
            setHtmlValue={props.setHtmlValue}
            setTextValue={props.setTextValue}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} sx={{ my: 1, justifyContent: "flex-end" }}>
        <Button onClick={() => window.history.back()}>
          {t("article-creation-page.back-btn")}
        </Button>
        <Button
          color="primary"
          onClick={props.onClickPrimaryBtn}
          variant="contained"
        >
          {t("article-creation-page.submit-btn")}
        </Button>
      </Grid>
    </Grid>
  );
}
