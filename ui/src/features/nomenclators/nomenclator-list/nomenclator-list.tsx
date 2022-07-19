import {
  useState,
  useEffect
} from "react";
import { Box } from "@mui/material";
import { Nomenclator } from "../../../models/nomenclators/nomenclator-model";
import { getNomenclatores } from "../../../services/nomenclators.api.service";
import { NomenclatorCard } from "./nomenclator-card";

export function NomenclatorsList() {
  const [nomenclatores, setNomenclators] = useState<Nomenclator[]>([]);
  useEffect(() => {
    getNomenclatores().then((response) => {
      setNomenclators(response);
    });
  }, []);

  return (
    <Box m={2} p={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>

      {nomenclatores.map((nomenclatoare) => (
        <NomenclatorCard
          key={nomenclatoare.id}
          label={nomenclatoare.name}
          route={nomenclatoare.route}
          icon={<span className="material-icons" style={{ fontSize: "48px" }}>{nomenclatoare.iconUrl}</span>}
          numberOfItems={nomenclatoare.numberOfItems}
        ></NomenclatorCard>
      ))}

    </Box>
  );
}
