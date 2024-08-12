import { DashboarProvider } from "@/Context/DashboarContex";
import Page from "./Page";

export default (props) => {
    return (
        <DashboarProvider>
            <Page {...props}></Page>
        </DashboarProvider>
    );
};
