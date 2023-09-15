import { Box, Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import { AgentCard } from "components";

const Agents = () => {
  const { data, isError, isLoading } = useList({
    resource: "users",
  });

  const allAgents = data?.data || [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" bgcolor="#fcfcfc">
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            numberOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
