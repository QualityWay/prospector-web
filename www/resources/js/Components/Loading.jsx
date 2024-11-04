import Loading from "react-fullscreen-loading";

export default (props) => {
    return (
        <Loading
            background="rgba(241, 231, 254, 0.8)"
            loaderColor="#4d3af7"
            {...props}
        />
    );
};
