import { Typography } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Profile } from "components";
import { useParams } from "react-router-dom";

const AgentProfile = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? {};

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
