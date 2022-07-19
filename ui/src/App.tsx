import "./App.css";
import { MainLayout } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./features/register";
import { Login } from "./features/login";
import { NomenclatorsList } from "./features/nomenclators/nomenclator-list/nomenclator-list";
import { BuildingTypes } from "./features/nomenclators/building-types";
import { MaterialsCategories } from "./features/nomenclators/building-material-category";
import { ToastContainer } from "react-toastify";
import { MaterialsSubcategory } from "./features/nomenclators/building-material-sub-category";
import { BuildingMaterials } from "./features/nomenclators/building-material-list";
import { BuildingElements } from "./features/nomenclators/building-element-type";
import "react-toastify/dist/ReactToastify.css";
import { FireResistanceTimes } from "./features/nomenclators/fire_resistance_time";
import { AccessDeniedPage } from "./features/access-denied-page";
import { AuthenticatedProtectionRoutes } from "./features/access-denied-page/authenticated-protection-routes";
import { RolesProtectionRoutes } from "./features/access-denied-page/roles-protection-routes";
import { NotAuthenticatedProtectionRoutes } from "./features/access-denied-page/not-authenticated-protection-routes";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { decode_data, getCookie, TOKEN_COOKIE } from "./utils/cookie";
import NormativeRenderer from "./features/normative/index";
import { AddOrEditProject } from "./features/projects/add-edit-form-page";
import { ViewProjectPage } from "./features/projects/view-page";
import { Projects } from "./features/projects";
import { OpenedFormProjectsProtectionRoutes } from "./features/access-denied-page/opened-form-projects-protection-routes";
import { requestInterceptor } from "./requestInterceptor";
import {Accounts} from "./features/accounts-administration/index";
function App() {
  const dispatch = useDispatch();
  const token = getCookie(TOKEN_COOKIE);
  if (token) {
    let user_data = decode_data(token);
    if (user_data.email != null) {
      dispatch(
        setUser({
          email: user_data.email,
          name: user_data.name,
          role: user_data.role,
        })
      );
    }
  }

  requestInterceptor();
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/accesulinterzis" element={<AccessDeniedPage />}></Route>

          <Route element={<NotAuthenticatedProtectionRoutes />}>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>

          <Route element={<AuthenticatedProtectionRoutes />}>
            <Route path="/" element={<MainLayout />} ></Route>
            <Route path="/proiecte" element={<Projects />}></Route>
            <Route path="/normativ" element={<NormativeRenderer />}></Route>

            <Route element={<OpenedFormProjectsProtectionRoutes />}>
              <Route path="/proiecte/formular" element={<AddOrEditProject />}></Route>
              <Route path="/proiecte/vizualizareProiect" element={<ViewProjectPage />}></Route>
            </Route>

            <Route path="/normativ" element={<NormativeRenderer />}></Route>
            <Route element={<RolesProtectionRoutes />}>
              <Route path="/nomenclatoare" element={<NomenclatorsList />}></Route>
              <Route path="/administrareConturi" element={<Accounts />}></Route>
              <Route path="/nomenclatoare/tipuricladire" element={<BuildingTypes />}></Route>
              <Route path="/nomenclatoare/categoriimateriale" element={<MaterialsCategories />}></Route>
              <Route path="/nomenclatoare/subcategoriimateriale" element={<MaterialsSubcategory />}></Route>
              <Route path="/nomenclatoare/materiale" element={<BuildingMaterials />}></Route>
              <Route path="/nomenclatoare/subcategorii" element={<NomenclatorsList />}></Route>
              <Route path="/nomenclatoare/elementeconstructie" element={<BuildingElements />}></Route>
              <Route path="/nomenclatoare/timprezistentafoc" element={<FireResistanceTimes />}></Route>
              <Route path="/nomenclatoare/gradrezistentafoc" element={<NomenclatorsList />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
