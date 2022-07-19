import { TreeItem, TreeView } from '@mui/lab';
import { Button, Drawer } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NormativeElement } from '../../models/normative/normative-model';
import * as React from 'react';
import Form from './form';
import { ActionsTypesFrom } from '../../core/types';
import { NormativeElementDto } from '../../models/normative/normative-dto-model';
import { useDispatch } from 'react-redux';
import { setCurrentParent } from '../../store/normative-slice';
import store from '../../store/store';

export interface INormativeTreeProps {
  normativeElements: NormativeElement[];
  onChange: Function;
  getAndSetNormative: any;
}

export const NormativeTree = (props: INormativeTreeProps) => {
  const drawerWidth = 240;

  const [openForm, setOpenForm] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("Element Normativ");
  const [emptyElement, setEmptyElement] = React.useState<NormativeElementDto>({ title: "titlu", id: 0, content: "continut", buildingTypeId: 0, parentId: 0, isActive: true });

  function itemTreeSelected(id: number) {
    props.onChange(id);
  }

  const dispach = useDispatch() 

  const renderTree = (node: NormativeElement) => {
    return (
      <TreeItem onClick={() => {itemTreeSelected(node.id), dispach(setCurrentParent({parentId:node.id}));}} key={node.id} nodeId={node.id.toString()} label={
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          {node.title}
        </div>
      }>
        {Array.isArray(node.children)
          ? node.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          paddingTop: "100px"
        },
      }}
      variant="permanent"
      anchor="left"
    >

      <Button
        variant="outlined"
        onClick={() => setOpenForm(true)}
        style={{ color: "green", borderColor: "green", margin:"0em 3em 2em 3em" }}
      >
        Adauga
      </Button>

      <hr
        style={{width:"100%", margin:"0 10px 0 10px"}}
      />

      {openForm ? (
        <Form
          element={emptyElement}
          dialogTitle={dialogTitle}
          action={ActionsTypesFrom.Add}
          openForm={openForm}
          parentId={0}
          setOpenForm={setOpenForm}
          getAndSetNormative={props.getAndSetNormative}
           />
      ) : null}

      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {props.normativeElements.map((n) => renderTree(n))}
      </TreeView>
    </Drawer>
  );
}