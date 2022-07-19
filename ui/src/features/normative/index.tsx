import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { NormativeElement } from '../../models/normative/normative-model';
import { useState } from 'react';
import { getAllNormativeElements } from '../../services/normative.element.api';
import { useEffect } from 'react';
import { NormativeTree } from './normative-tree';
import { NormativeDetails } from './normative-details';
import { getNormative } from '../../services/normative.element.api';
import { Container } from '@mui/material';
import store from '../../store/store';
import { useGridApiEventHandler } from '@mui/x-data-grid';

const normativesCache = new Map<number, NormativeElement>();

export default function NormativeRenderer() {
  const theme = useTheme();

  const [rootNormatives, setRootNormatives] = useState<NormativeElement[]>([]);
  const [displayedNormative, setDisplayedNormative] =
    useState<NormativeElement>({
      id: 0,
      title: "",
      content: "",
      hierarchyId: "",
      level: 0,
      isActive: false,
      order: 0,
      buildingTypeId: 0
    });


  const getNormativeData = async (id: number): Promise<NormativeElement> => {
    const normative = await getNormative(id);
    return normative;
  }

  useEffect(() => {
    getNormativeData(1).then((ne) => {
      setDisplayedNormative(ne);
      console.log(ne);
    });
  }, [])

  const addToCache = (normative: NormativeElement): void => {
    if (!normativesCache.has(normative.id)) {
      normativesCache.set(normative.id, normative);
    }
    normative.children?.forEach(element => {
      addToCache(element);
    });
  }

  function treeItemSelected(id: number) {
    getNormativeData(id).then((ne) => {
      setDisplayedNormative(ne);
      console.log(ne);
    });
  }

  useEffect(() => {
    getAllNormativeElements().then((ne) => {
      setRootNormatives(ne);
    });
  }, []);

  function getAndSetNormatives() {
    getNormativeData(store.getState().currentlySelectedParent.parentId).then((ne) => {
      setDisplayedNormative(ne);
    });
    getAllNormativeElements().then((ne) => {
      setRootNormatives(ne);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>
      <NormativeTree onChange={treeItemSelected} normativeElements={rootNormatives} getAndSetNormative={getAndSetNormatives}></NormativeTree>
      <Container sx={{ mt: 1, ml: 0, paddingLeft: 0 }} maxWidth="md">
        <NormativeDetails normativeElement={displayedNormative} getAndSetNormative={getAndSetNormatives}></NormativeDetails>
      </Container>
    </Box>
  );
}
