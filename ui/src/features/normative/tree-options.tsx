import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Form from './form';
import { NormativeElementDto } from '../../models/normative/normative-dto-model';
import { ActionsTypesFrom } from '../../core/types';
import { deleteNormativeElement, getNormative } from '../../services/normative.element.api';
import ConfirmationDialog from '../../components/confirmation-dialog/confirmation-dialog';

const ITEM_HEIGHT = 48;

export interface ITreeElementMenuProps {
  canBeDeleted: string,
  element: NormativeElementDto
  getAndSetNormative: any
}

export default function TreeElementMenu(props: ITreeElementMenuProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentlySelectedRow, setCurrentlySelectedRow] = React.useState<NormativeElementDto>({ title: "titlu", id: 0, content: "continut", buildingTypeId: 0, parentId: props.element.id, isActive: true });
  const [openConfirmDialog, setOpenConfirmationDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [action, setAction] = React.useState("");
  const open = Boolean(anchorEl);

  const handleClickOpenDeleteConfirmationDialog = function (row: NormativeElementDto) {
    setOpenConfirmationDialog(true);
    setCurrentlySelectedRow(row);
  };

  function reloadPage(props: ITreeElementMenuProps, resetForm: any): void {
    props.getAndSetNormative();
  }

  const deleteEntity = (resetForm: any) => {
    if (currentlySelectedRow.id) {
      deleteNormativeElement(currentlySelectedRow.id).then(() => {
        reloadPage(props, resetForm);
      });
      setOpenConfirmationDialog(false);
    }
  };



  let options = [
    ActionsTypesFrom.Add,
    ActionsTypesFrom.Edit,
    'STERGE',
  ];

  if (props.canBeDeleted === 'false') {
    options.pop();
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: string) => {
    setAnchorEl(null);
    switch (option) {
      case ActionsTypesFrom.Add:
        setOpenForm(true);
        setDialogTitle("Element Normativ")
        setAction(option);
        break;
      case "STERGE":
        handleClickOpenDeleteConfirmationDialog(props.element);
        break;
      case ActionsTypesFrom.Edit:
        setOpenForm(true);
        setAction(option);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Add'} onClick={() => { handleSelect(option) }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      {openForm ? (
        <Form
          element={props.element}
          dialogTitle={dialogTitle}
          action={action}
          openForm={openForm}
          parentId={currentlySelectedRow.parentId!}
          setOpenForm={setOpenForm}
          getAndSetNormative={props.getAndSetNormative}
        />
      ) : null}

      {openConfirmDialog ? (
        <ConfirmationDialog
          elementName={currentlySelectedRow.title}
          nomenclatoreName={"Categorii de materiale de constructie"}
          onConfirmDelete={deleteEntity}
          openConfirmDialog={openConfirmDialog}
          setOpenConfirmationDialog={setOpenConfirmationDialog}
        />
      ) : null}
    </div>

  );
}