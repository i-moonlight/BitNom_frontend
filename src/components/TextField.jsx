import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useTheme,
} from '@mui/material';
import { useFormikContext } from 'formik';

export default function TextField({
    name,
    label,
    labelTop,
    placeholder,
    errorText,
    adornment,
    adornmentType,
    type,
    fullWidth,
    required,
    ...defaultProps
}) {
    const theme = useTheme();
    const { handleChange, errors, setFieldTouched, touched, values } = name
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useFormikContext()
        : {};

    return (
        <>
            {!label && labelTop && (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mt-2"
                >
                    {labelTop} {required && '*'}
                </Typography>
            )}
            <FormControl
                id="formik-input"
                fullWidth={fullWidth && true}
                variant="outlined"
                color="primary"
                style={{
                    marginTop: !label && labelTop ? 2 : 8,
                    marginBottom: 8,
                    padding: 0,
                    border: 'none !important',
                }}
                size="small"
            >
                {label && (
                    <InputLabel
                        style={{ color: errorText && '#F44336' }}
                        htmlFor="formik-input"
                    >
                        {label}
                    </InputLabel>
                )}

                <OutlinedInput
                    style={{
                        fontSize: theme.typography.body2.fontSize,
                    }}
                    value={name && values[name]}
                    fullWidth
                    label={label}
                    error={name && touched[name] && errors[name] && true}
                    placeholder={placeholder}
                    onChange={name && handleChange(name)}
                    onBlur={() => name && setFieldTouched(name)}
                    type={type}
                    startAdornment={
                        adornment && adornmentType !== 'end' ? (
                            <InputAdornment position="start">
                                {adornment}
                            </InputAdornment>
                        ) : null
                    }
                    endAdornment={
                        adornment && adornmentType === 'end' ? (
                            <InputAdornment position="end">
                                {adornment}
                            </InputAdornment>
                        ) : null
                    }
                    {...defaultProps}
                />
                {name && touched[name] && errors[name] ? (
                    <small
                        className="ml-5 mt-1 text-sm text-start"
                        style={{ color: '#F44336' }}
                    >
                        {errors[name]}
                    </small>
                ) : null}
                {errorText && (
                    <small
                        className="ml-5 mt-1 text-sm text-start "
                        style={{ color: '#F44336' }}
                    >
                        {errorText}
                    </small>
                )}
            </FormControl>
        </>
    );
}
