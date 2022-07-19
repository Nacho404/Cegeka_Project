import {
  Box,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NomenclatorCard(props: any) {
  const { label, route, icon, numberOfItems } = props;
  const navigate = useNavigate();
  return (
    <Button
      size="large"
      variant="outlined"
      startIcon={icon}
      onClick={() => navigate(route)}
      sx={{ margin: 2 }}
    >
      <Box p={2} minHeight={50} display="flex" alignItems="center">
        {label}
        <br></br>
        {numberOfItems}
      </Box>

    </Button>
  );
}