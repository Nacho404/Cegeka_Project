import { Box, styled, Typography } from "@mui/material";
import { NormativeElement } from "../../models/normative/normative-model";
import DOMPurify from "dompurify";
import TreeElementMenu from "./tree-options";
import { ReactChild, ReactFragment, ReactPortal } from "react";

export interface INormativeDetailsProps {
  normativeElement: NormativeElement;
  getAndSetNormative: any;
}
const Hover = styled(Box)`
  &:hover {
    background-color: rgb(248, 248, 248);
    border-radius: 8px;
  }
`;

const ContentBox = styled(Box)`
  div p{
    margin-top:0;
    margin-bottom:0;
  }
`;

const HoverBox = (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => {
  return <Hover p={1} pb={0}>{props.children}</Hover>;
};

export const NormativeDetails = (props: INormativeDetailsProps) => {
  const renderInDepth = (node: NormativeElement) => {

    return (
      <Box ml={node.level + 1} style={{ textAlign: "left" }} key={node.id}>
        <HoverBox>
          <Typography style={{ fontWeight: "bold" }}>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              {node.title}
              {Array.isArray(node.children) && node.children.length >= 1 ? (
                <TreeElementMenu element={node} canBeDeleted="false" getAndSetNormative={props.getAndSetNormative} />
              ) : (
                <TreeElementMenu element={node} canBeDeleted="true" getAndSetNormative={props.getAndSetNormative} />
              )}
            </div>
          </Typography>
          {!!node.content?.trim() && (           
            <ContentBox ml={1}>              
              <Typography variant="body1">
                <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.content, { FORCE_BODY: true }) }} />
              </Typography>
            </ContentBox>
          )}
        </HoverBox>
        <Box ml={2}>{Array.isArray(node.children) ? node.children.map((node) => renderInDepth(node)) : null}</Box>
      </Box>
    );
  };
  return <div>{renderInDepth(props.normativeElement)}</div>;
};
