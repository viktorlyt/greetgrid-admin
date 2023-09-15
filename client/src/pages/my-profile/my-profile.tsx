import { Typography } from "@mui/material";
import { useGetIdentity, useOne } from "@refinedev/core";
import { Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity<{ userid: string }>();
  const { data, isError, isLoading } = useOne({
    resource: "users",
    id: user?.userid,
  });

  const myProfile = data?.data ?? {};

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
