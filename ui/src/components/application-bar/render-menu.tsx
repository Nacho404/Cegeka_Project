import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../core/types";
import { Box, Button } from "@mui/material";

export default function RenderMenuOptions(user: any) {
    interface Page {
        label: string;
        route: string;
    }

    const accountsAdministration: Page[] = [{ label: "Administrare Conturi", route: "/administrareConturi" }];
    const projects: Page[] = [{ label: "Proiecte", route: "/proiecte" }];
    const normative: Page[] = [{ label: "Normativ", route: "/normativ" }];
    const nomenclatures: Page[] = [{ label: "Nomenclatoare", route: "/nomenclatoare" }];
    const register: Page[] = [{ label: "Inregistrare", route: "/register" }];
    const login: Page[] = [{ label: "Autentificare", route: "/login" }];

    const navigate = useNavigate();
    function onClickPage(page: Page) {
        navigate(page.route);
    }

    if (user.email != null) {
        switch (user.role) {
            case UserRoles.Administrator:
                return (
                    <>
                        <Box sx={{ flexGrow: 0, display: "flex" }}>
                            {projects.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => onClickPage(page)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>


                        <Box sx={{ flexGrow: 0, display: "flex" }}>
                            {normative.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => onClickPage(page)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0, display: "flex" }}>
                            {nomenclatures.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => onClickPage(page)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 1, display: "flex" }}>
                            {accountsAdministration.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => onClickPage(page)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>
                    </>
                )
            case UserRoles.Architect:
                return (
                    <>
                        <Box sx={{ flexGrow: 0, display: "flex" }}>
                            {projects.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => onClickPage(page)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>


                        <Box sx={{ flexGrow: 0, display: "flex" }}>
                            {normative.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => onClickPage(page)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>
                    </>
                )
        }
    }

    if (user.email == null) {
        if (document.URL.split('/').at(-1) == 'login') {
            return (
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
                    {
                        register.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => onClickPage(page)}
                                sx={{ my: 2, color: "white", display: "flex", mr: 5 }}
                            >
                                {page.label}
                            </Button>
                        ))

                    }
                </Box>
            )

        } else if (document.URL.split('/').at(-1) == 'register') {
            return (
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
                    {
                        login.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => onClickPage(page)}
                                sx={{ my: 2, color: "white", display: "flex", mr: 5 }}
                            >
                                {page.label}
                            </Button>
                        ))

                    }
                </Box>
            )

        }

    }
}