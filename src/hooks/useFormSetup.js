import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useFormSetup = ({ schema, defaultValues }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  return {
    handleSubmit,
    control,
    errors,
    isValid,
    setValue,
    watch,
    getValues,
    reset,
  };
};

export default useFormSetup;

/* <>
<Stack height="100%" maxHeight="100%" width="100%">
  <Box
    height={`${subNavigationHeight}%`}
    maxHeight={`${subNavigationHeight}%`}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    bgcolor={theme.palette.secondary.main}
    color={theme.palette.secondary.main}
    px={2}
    mx={1}
    mt={1}
  >
    <Typography sx={{ textDecoration: "bold", color: "white" }}>
      User Accounts
    </Typography>
    <Stack
      width="auto"
      flexDirection="row"
      sx={{ ...defaultButtonStyle }}
    >
      <Button
        sx={{ marginRight: 1 }}
        size="small"
        className={`addRowButtons`}
      >
        Add
      </Button>
      <SearchField />
    </Stack>
  </Box>
  <Box
    p={2}
    m={1}
    height="95%"
    maxHeight="95%"
    bgcolor={theme.palette.primary.main}
  >
    Content
  </Box>
</Stack>
</> */
