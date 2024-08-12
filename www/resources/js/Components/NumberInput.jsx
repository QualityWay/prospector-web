import { forwardRef, useEffect, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

export default forwardRef(function NumberInput({ isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <NumericFormat
            getInputRef={input}
            {...props}
        />
    );
});
