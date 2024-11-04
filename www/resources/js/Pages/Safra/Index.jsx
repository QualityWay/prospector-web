import { SafraProvider } from "@/Context/SafraContex";
import Page from "./Page";

export default (props) => {
    return (
        <SafraProvider>
            <Page {...props}></Page>
        </SafraProvider>
    );
};
