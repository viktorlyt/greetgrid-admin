import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";
import { useForm } from "@refinedev/react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newAdinSchema } from "schemas/schema";

const Form = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
}: FormProps) => {
  const {
    formState: { errors },
  } = useForm({ resolver: yupResolver(newAdinSchema) });

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} an Admin
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Name
            </FormHelperText>
            <TextField
              fullWidth
              required
              focused
              placeholder="Enter name"
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <FormHelperText error>{errors.name?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Email
            </FormHelperText>
            <TextField
              fullWidth
              required
              type="email"
              placeholder="Enter email"
              color="info"
              {...register("email", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Password
            </FormHelperText>
            <TextField
              fullWidth
              required
              placeholder="Enter password"
              id="outlined-basic"
              color="info"
              type="password"
              variant="outlined"
              // onChange={(e) => setPassword(e.target.value)}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <FormHelperText error>{errors.password?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Confirm Password
            </FormHelperText>
            <TextField
              fullWidth
              required
              placeholder="Confirm password"
              id="outlined-basic"
              color="info"
              type="password"
              variant="outlined"
              // onChange={(e) => setConfirmPassword(e.target.value)}
              {...register("confirmPassword", {
                required: true,
              })}
            />
            {errors.confirmPassword && (
              <FormHelperText error>
                {errors.confirmPassword?.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Select Admin Role
            </FormHelperText>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue="admin"
              {...register("role", {
                required: true,
              })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="superAdmin">Super Admin</MenuItem>
            </Select>
          </FormControl>
          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
