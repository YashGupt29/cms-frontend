import { Button, TextField, Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name should have at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name should have at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
  company: z.string(),
  jobTitle: z.string(),
});

const validate = (values) => {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  return result.error.flatten().fieldErrors;
};

// eslint-disable-next-line react/prop-types
export const ContactForm = ({
  initialValues,
  onSubmit,
  editForm,
  isLoading,
}) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 600,
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 4,
        mx: 2,
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.company && formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.jobTitle && formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: isLoading ? "lightblue" : "",
            }}
          >
            {editForm ? "Edit" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
