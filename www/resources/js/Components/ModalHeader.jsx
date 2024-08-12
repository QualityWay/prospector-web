import styled from "styled-components";

const ModalHeader = styled.h2`
    color: #0c0c0c;
`;

export default ({ children }) => {
    return (
        <ModalHeader className="p-3 mb-4 text-base text-center overflow-hidden font-bold">
            {children}
        </ModalHeader>
    );
};
