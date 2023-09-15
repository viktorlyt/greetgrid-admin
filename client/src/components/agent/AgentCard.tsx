import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { AgentCardProp, InfoBarProps } from "interfaces/agent";
import { Link } from "react-router-dom";

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);
const AgentCard = ({
  id,
  name,
  email,
  avatar,
  numberOfProperties,
}: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity<{ email: string }>();

  const generateLink = () => {
    if (currentUser?.email === email) {
      return "../my-profile";
    } else {
      return `/agents/show/${id}`;
    }
  };

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { sx: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <img
        src={avatar}
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack direction="row" gap={2} flexWrap="wrap" alignItems="center">
          <Typography fontSize={22} fontWeight={600} color="#11142d">
            {name}
          </Typography>
          <Typography fontSize={14} color="#808191">
            Real-Estate Agent
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: "#808191" }} />}
            name={email}
          />
          <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="Calgary" />
          <InfoBar
            icon={<Phone sx={{ color: "#808191" }} />}
            name="+1-676-767-6767"
          />
          <InfoBar
            icon={<LocationCity sx={{ color: "#808191" }} />}
            name={`${numberOfProperties} Properties`}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;
